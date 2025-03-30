import { defineStore } from 'pinia';
import { ref } from 'vue';
import { account, db, DATABASE_ID, COLLECTION_ID, ID, Query } from '@/lib/appwrite';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const tempUserData = ref(null);
  const isAuthenticated = ref(false);
  const error = ref(null);

  const generateCardNumber = () => {
    const digits = '0123456789';
    const letters = 'ABCDEF';
    let result = '';

    const numDigits = Math.floor(Math.random() * 2) + 4;
    for (let i = 0; i < numDigits; i++) {
        result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    const numLetters = 9 - numDigits;
    for (let i = 0; i < numLetters; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    result = result.split('').sort(() => Math.random() - 0.5).join('');
    return result;
  };

  const generateUserBonus = () => {
    const numbers = '1234567890';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return result;
  };

  const register = async ({ firstName, lastName, email, password }) => {
    try {
      await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

      await account.createEmailPasswordSession(email, password);  
      const libraryCardNumber = generateCardNumber();
      const bonuses = generateUserBonus();
      const visits = 1;

      const response = await db.createDocument(
        DATABASE_ID, 
        COLLECTION_ID, 
        ID.unique(), 
        {
          userEmail: email,
          userFirstName: firstName,
          userLastName: lastName,
          visits,
          libraryCardNumber,
          bonuses,
          bankCardNumber: null,
          cardHolder: null,
          cvcCode: null,
          expirationCodeMonth: null,
          expirationCodeYear: null,
          cityTown: null,
          postalCode: null,
          ownedBooks: [],
        }
      );

      
      const userData = await account.get();
      user.value = { ...userData, libraryCardNumber, bonuses, visits, documentId: response.$id };
      isAuthenticated.value = true;
      error.value = null;

      return true;
    } catch (err) {
      error.value = err.message;
      console.error('Registration error:', err);
      return false;
    }
  };

  const login = async ({ email, password }) => {
    try {
      if (isAuthenticated.value) return true;
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      const userDoc = await db.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('userEmail', email)]
      );
      
      if (userDoc.documents.length > 0) {
        const doc = userDoc.documents[0];
        const updatedVisits = (doc.visits || 0) + 1;
        await db.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          doc.$id,
          { visits: updatedVisits }
        );
        user.value = { ...userData, ...doc, visits: updatedVisits, documentId: doc.$id }; 
        isAuthenticated.value = true;
        error.value = null;
        return true;
      } else {
        throw new Error('User data not found in database');
      }
    } catch (err) {
      error.value = err.message;
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting to delete session...');
      await account.deleteSession('current');
      console.log('Session deleted successfully');
      user.value = null;
      isAuthenticated.value = false;
      tempUserData.value = null;
      error.value = null;
      console.log('Logged out successfully');
      return true; 
    } catch (err) {
      error.value = err.message;
      console.error('Logout error:', err);
      
      if (err.message.includes('session is active')) {
        error.value = 'Failed to log out: session still active';
      }
      return false;
    }
  };

  
  const init = async () => {
    if (isAuthenticated.value) return;
    try {
      console.log('Initializing auth store...');
      const userData = await account.get();
      const userDoc = await db.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('userEmail', userData.email)]
      );
      
      if (userDoc.documents.length > 0) {
        user.value = { ...userData, ...userDoc.documents[0], documentId: userDoc.documents[0].$id }; 
        isAuthenticated.value = true;
        console.log('Auth is true');
      }
    } catch (err) { // eslint-disable-line no-unused-vars
      user.value = null;
      isAuthenticated.value = false;
      console.log('No active session');
    }
  };


  const setTempUserData = async (firstName, libraryCardNumber) => {
    console.log('setTempUserData called with:', { firstName, libraryCardNumber });
    try {
      const userDoc = await db.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal('userFirstName', firstName),
          Query.equal('libraryCardNumber', libraryCardNumber),
        ]
      );
  
      if (userDoc.documents.length > 0) {
        const doc = userDoc.documents[0];
        tempUserData.value = {
          firstName: doc.userFirstName,
          libraryCardNumber: doc.libraryCardNumber,
          visits: doc.visits || 0,
          bonuses: doc.bonuses || 0,
          books: doc.ownedBooks || [],
          
        };
        console.log('Temp user data set:', tempUserData.value);
      } else {
        tempUserData.value = {
          firstName: 'Not found',
          libraryCardNumber: 'Not found',
          visits: 0,
          bonuses: 0,
          books: [],
        };
        console.log('User not found, tempUserData set to:', tempUserData.value);
      }

      setTimeout(() => {
        tempUserData.value = null;
      }, 10000);
    } catch (err) {
   
      error.value = err.message;
      tempUserData.value = {
        firstName: 'Error',
        libraryCardNumber: 'Error',
        visits: 0,
        bonuses: 0,
        books: [],
      };
      console.error('Error setting temp user data:', err);
  
      setTimeout(() => {
        tempUserData.value = null;
      }, 10000);
    }
  };

  const updateUserData = async (updatedData) => {
    try {
      if (!isAuthenticated.value || !user.value.documentId) {
        throw new Error('User not authenticated or document ID missing');
      }
      await db.updateDocument(DATABASE_ID, COLLECTION_ID, user.value.documentId, updatedData);
      user.value = { ...user.value, ...updatedData, books: updatedData.books || user.value.books || [] };
    } catch (err) {
      error.value = err.message;
      console.error('Error updating user data:', err);
    }
  };

  return {
    user,
    isAuthenticated,
    error,
    register,
    login,
    logout,
    init,
    setTempUserData,
    updateUserData,
    tempUserData,
  };
});
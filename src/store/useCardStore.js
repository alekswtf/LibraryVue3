import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db, DATABASE_ID, COLLECTION_ID } from '@/lib/appwrite';
import { useAuthStore } from '@/store/auth';

export const useCardStore = defineStore('card', () => {
  const bankCardNumber = ref('');
  const expirationCodeMonth = ref('');
  const expirationCodeYear = ref('');
  const cvcCode = ref('');
  const cardHolder = ref('');
  const postalCode = ref('');
  const cityTown = ref('');
  const error = ref(null);

  const authStore = useAuthStore();


  const saveCardDetailsAndBuy = async (book) => {
    try {


      if (!authStore.isAuthenticated || !authStore.user?.documentId) {
        throw new Error('User must be authenticated to save card details');
      }
      
      const bookEntry = JSON.stringify({ title: book.title, author: book.author });

      const cardData = {
        bankCardNumber: bankCardNumber.value,
        expirationCodeMonth: expirationCodeMonth.value,
        expirationCodeYear: expirationCodeYear.value,
        cvcCode: cvcCode.value,
        cardHolder: cardHolder.value,
        postalCode: postalCode.value,
        cityTown: cityTown.value,
        ownedBooks: authStore.user.ownedBooks
          ? [...authStore.user.ownedBooks, bookEntry]
          : [bookEntry],
      };

      await db.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        authStore.user.documentId,
        cardData
      );


      authStore.user = { ...authStore.user, ...cardData };
      resetForm();

      return true;
    } catch (err) {
      error.value = err.message;
      console.error('Error saving card details and buying book:', err);
      return false;
    }
  };


  const saveCardDetails = async () => {
    try {
      if (!authStore.isAuthenticated || !authStore.user?.documentId) {
        throw new Error('User must be authenticated to save card details');
      }

      const cardData = {
        bankCardNumber: bankCardNumber.value,
        expirationCodeMonth: expirationCodeMonth.value,
        expirationCodeYear: expirationCodeYear.value,
        cvcCode: cvcCode.value,
        cardHolder: cardHolder.value,
        postalCode: postalCode.value,
        cityTown: cityTown.value,
      };

      await db.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        authStore.user.documentId,
        cardData
      );

      authStore.user = { ...authStore.user, ...cardData };
      resetForm();

      return true;
    } catch (err) {
      error.value = err.message;
      console.error('Error saving card details:', err);
      return false;
    }
  };

  const resetForm = () => {
    bankCardNumber.value = '';
    expirationCodeMonth.value = '';
    expirationCodeYear.value = '';
    cvcCode.value = '';
    cardHolder.value = '';
    postalCode.value = '';
    cityTown.value = '';
    error.value = null;
  };

 
  const loadCardDetails = () => {
    if (authStore.user) {
      bankCardNumber.value = authStore.user.bankCardNumber || '';
      expirationCodeMonth.value = authStore.user.expirationCodeMonth || '';
      expirationCodeYear.value = authStore.user.expirationCodeYear || '';
      cvcCode.value = authStore.user.cvcCode || '';
      cardHolder.value = authStore.user.cardHolder || '';
      postalCode.value = authStore.user.postalCode || '';
      cityTown.value = authStore.user.cityTown || '';
    }
  };

  return {
    bankCardNumber,
    expirationCodeMonth,
    expirationCodeYear,
    cvcCode,
    cardHolder,
    postalCode,
    cityTown,
    error,
    saveCardDetails,
    saveCardDetailsAndBuy, 
    resetForm,
    loadCardDetails,
  };
});
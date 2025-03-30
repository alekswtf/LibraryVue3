<template>
  <div>
    <div class="find-card">
      <h3>Find your library card</h3>
      <form @submit.prevent="handleSubmit" class="card-form">
        <div class="card-form-wrapper">
          <p>Brooklyn Public Library</p>
          <div class="card-input">
            <input
              class="card-input-field"
              type="text"
              v-model="firstName"
              name="firstName"
              id="firstName-name"
              placeholder="Reader's name"
              required
              :disabled="isAuthenticated || isLocked"
            />
            <input
              class="card-input-field"
              type="text"
              v-model="libraryCardNumber"
              name="libraryCardNumber"
              id="library-card-number"
              placeholder="Card number"
              required
              :disabled="isAuthenticated || isLocked"
            />
          </div>
        </div>

        <button
          v-if="!isAuthenticated && !tempUserData"
          class="card-submit-button"
          type="submit"
        >
          Check the card
        </button>

        <!-- Данные аутентифицированного пользователя -->
        <div v-if="isAuthenticated && userData" class="user-info">
          <div class="myProfile-visits">
            <h4>Visits</h4>
            <img src="../../assets/icons/Union.svg" alt="union" />
            <span class="visitsCounter">{{ userData.visits }}</span>
          </div>
          <div class="myProfile-bonuses">
            <h4>Bonuses</h4>
            <img src="../../assets/icons/Star 1.svg" alt="star" />
            <span class="bonusesCounter">{{ userData.bonuses }}</span>
          </div>
          <div class="myProfile-books">
            <h4>Books</h4>
            <img src="../../assets/icons/book.svg" alt="booksIcon" />
            <span class="booksCounter">{{ userBooksCount }}</span>
          </div>
        </div>

        <!-- Временные данные для неаутентифицированного пользователя -->
        <div v-if="!isAuthenticated && tempUserData" >
          <div v-if="tempUserData.firstName === 'Not found'" class="not-found">
            <p>User not found</p>
          </div>
          <div v-else-if="tempUserData.firstName === 'Error'" class="error">
            <p>Error fetching data: {{ authStore.error }}</p>
          </div>
          <div v-else class="user-info">
            <div class="myProfile-visits">
              <h4>Visits</h4>
              <img src="../../assets/icons/Union.svg" alt="union" />
              <span class="visitsCounter">{{ tempUserData.visits }}</span>
            </div>
            <div class="myProfile-bonuses">
              <h4>Bonuses</h4>
              <img src="../../assets/icons/Star 1.svg" alt="star" />
              <span class="bonusesCounter">{{ tempUserData.bonuses }}</span>
            </div>
            <div class="myProfile-books">
              <h4>Books</h4>
              <img src="../../assets/icons/book.svg" alt="booksIcon" />
              <span class="booksCounter">{{ tempBooksCount }}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/store/auth';

const firstName = ref('');
const libraryCardNumber = ref('');
const authStore = useAuthStore();
const isLocked = ref(false);

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

const userData = computed(() => {
  return authStore.user;
});

const tempUserData = computed(() => {
  return authStore.tempUserData;
});
const userBooksCount = computed(() => {
  return authStore.user?.ownedBooks?.length || 0;
});

// Подсчёт книг для неаутентифицированного пользователя
const tempBooksCount = computed(() => {
  return authStore.tempUserData?.books?.length || 0;
});

onMounted(async () => {
  await authStore.init();
  if (isAuthenticated.value && userData.value) {
    firstName.value = userData.value.userFirstName || '';
    libraryCardNumber.value = userData.value.libraryCardNumber || '';
  }
});


watch(
  () => [authStore.isAuthenticated, authStore.tempUserData],
  ([newIsAuthenticated, newTempUserData]) => {
    if (newIsAuthenticated && authStore.user) {
      firstName.value = authStore.user.userFirstName || '';
      libraryCardNumber.value = authStore.user.libraryCardNumber || '';
      /* useAuthStore.books.value = authStore.user.books.length || ''; */
    } else if (!newIsAuthenticated && newTempUserData) {
      if (newTempUserData.firstName !== 'Not found' && newTempUserData.firstName !== 'Error') {
        firstName.value = newTempUserData.firstName;
        libraryCardNumber.value = newTempUserData.libraryCardNumber;
      }
    } else if (!newIsAuthenticated && !newTempUserData) {
      firstName.value = '';
      libraryCardNumber.value = '';
    }
  },
  { deep: true }
);

const handleSubmit = async () => {
  if (isAuthenticated.value) {
    await authStore.updateUserData({
      userFirstName: firstName.value,
      libraryCardNumber: libraryCardNumber.value,
    });
  } else {
    await authStore.setTempUserData(firstName.value, libraryCardNumber.value);
    
    if (tempUserData.value.firstName !== 'Not found' && tempUserData.value.firstName !== 'Error') {
      isLocked.value = true;
      setTimeout(() => {
        isLocked.value = false;
      }, 10000);
    }
  }
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.find-card {
  h3 {
    font-family: $inter;
    font-size: 30px;
    color: $black-color;
    letter-spacing: 0.02em;
  }
}

.card-form {
  width: 600px;
  height: 386px;
  border: 3px solid $brown-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 30px;
  padding: 20px;

  .card-form-wrapper {
    background-color: $brown-color;
    display: flex;
    flex-direction: column;
    padding: 0px 0px 22px;
    font-family: $forum;
    font-size: 30px;
    line-height: 167%;
    letter-spacing: 0.02em;
    color: $black-color;
    p {
      text-align: left;
      padding: 25px;
    }
  }

  .card-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 560px;
  }

  .card-input-field {
    border-radius: 10px;
    border: none;
    width: 520px;
    height: 66px;
    padding: 20px;
    font-family: $forum;
    color: $brown-color;
    font-size: 30px;
    line-height: 167%;
    letter-spacing: 0.02em;
    background-color: $white-color;
    &::placeholder {
      color: #999;
      opacity: 1;
    }
    &:not(:placeholder-shown) {
      color: $brown-color; 
    }
  }

  .card-submit-button {
    border: 1px solid $main-color;
    border-radius: 2px;
    padding: 10px 40px;
    width: 242px;
    height: 44px;
    cursor: pointer;
    letter-spacing: 0.05em;
    font-weight: bold;
    font-family: $inter;
    color: $main-color;
  }

  .user-info {
    display: flex;
    gap: 20px;
    font-family: $inter;
    line-height: 100%;
    letter-spacing: 0.01em;
    text-transform: capitalize;
    text-align: center;
    color: $black-color;
  }
  .user-info-content {
    display: flex;
  }
  .myProfile-visits,
  .myProfile-bonuses,
  .myProfile-books {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    font-family: $inter;
    font-size: 10px;
    line-height: 100%;
    letter-spacing: 0.01em;
    text-transform: capitalize;
    text-align: center;
    color: $black-color;
    span {
      font-size: 10px;
    }
  }
}

.not-found,
.error {
  text-align: center;
  color: $brown-color;
  font-family: $inter;
  font-size: 16px;
  padding: 10px;
}

.error {
  color: red; // Для визуального отличия ошибки
}
</style>
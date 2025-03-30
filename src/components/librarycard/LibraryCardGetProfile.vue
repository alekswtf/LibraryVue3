<template>
    <div class="get-card">
        <h4 class="get-title">
          {{ libraryLog.title }}
        </h4>

        <h5 class="get-text">
            {{ libraryLog.h5 }}
        </h5>

        <div class="get-buttons" v-if="authStore.isAuthenticated">
            <button class="MyProfile" @click="openProfileModal">
                {{ libraryUser.button }}
            </button>
        </div>
        <div v-else class="get-buttons" >
                <button class="signup" @click="openRegisterModal">
                    {{ libraryLog.buttons.signUp }}</button>
              <button class="login"  @click="openLoginModal">
                {{ libraryLog.buttons.login }}
              </button>
        </div>

      </div>
</template>

<script setup>
import { defineEmits, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const emit = defineEmits(['close', 'openLoginModal', 'openRegisterModal', 'openProfileModal']);

onMounted(() => {
  authStore.init();
});

const openLoginModal = () => {
  emit('openLoginModal');
  emit('close');
};

const openRegisterModal = () => {
  emit('openRegisterModal');
  emit('close');
};

const openProfileModal = () => {
    emit('openProfileModal');
    emit('close');
  };

const libraryLog = {
  title: 'Get a reader card',
  h5: 'You will be able to see a reader card after logging into account or you can register a new account',
  buttons: {
    signUp: 'Sign Up',
    login: 'Log In'
  }
};

const libraryUser = {
  title: 'Visit your profile',
  h5: 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.',
  button: 'Profile'
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;
.get-card {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 40px;
  
    .get-title {
      font-family: $forum;
      font-size: 35px;
      letter-spacing: 0.02em;
      color: $black-color;
    }
    .get-text {
      width: 456px;
      font-family: $inter;
      font-size: 20px;
      letter-spacing: 0.02em;
      color: $black-color;
      text-align: right;
      line-height: 200%;
    }
  }
  
  .get-buttons {
    display: flex;
    gap: 30px;
    button {
      font-family: $inter;
      font-size: 10px;
      font-weight: bold;
      letter-spacing: 0.1em;
      color: #0C0C0E;
      border: 1px solid #0C0C0E;
      border-radius: 2px;
      width: 75px;
      height: 30px;
      cursor: pointer;
      &:hover {
        background-color: $brown-color;
        border: none;
      }
    }
   
  }

  @include desktop {
    .get-card {
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      .get-text {
        text-align: center;
        width: 600px;
      }
    }
  }
  @include tablet {
    .get-card {
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      .get-text {
        text-align: center;
        width: 600px;
      }
    }
  }  
</style>
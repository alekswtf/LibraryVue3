<template>
    <div>
      <div class="profile-menu-wrapper">
        <div v-if="authStore.isAuthenticated" class="profile-menu-Auth">
          <span>{{ authStore.user?.libraryCardNumber }}</span>
          <hr>
          <div class="log-Links">
            <div class="profile-myProfile" @click="openProfileModal">My profile</div>
            <div class="profile-logOut" @click.stop="logout">Log Out</div>
          </div>
          <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
        </div>
        <div v-else class="profile-menu-noAuth">
          <span>Profile</span>
          <hr>
          <div class="log-Links">
            <div class="profile-logIn" @click.stop="openLoginModal">Log In</div>
            <div class="profile-reg" @click.stop="openRegisterModal">Register</div>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script setup>
  import { defineEmits } from 'vue';
  import { useAuthStore } from '@/store/auth'; 
  
  const emit = defineEmits(['close', 'openLoginModal', 'openRegisterModal', 'openProfileModal']);
  const authStore = useAuthStore();
  
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
  
  const logout = async () => {
  const success = await authStore.logout();
  if (success) {
    emit('close'); // Закрываем меню только при успешном выходе
  } else {
    console.error('Logout failed:', authStore.error);
    // Ошибка отобразится в шаблоне через authStore.error
  }
};
  </script>
  
  <style lang="scss" scoped>
  @use '@/assets/styles/main.scss' as *;
  
  .profile-menu-wrapper {
    position: relative;
  }
  
  .profile-menu-noAuth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 80px;
    height: 115px;
    background-color: $white-color;
    z-index: 4;
    top: 30px;
    right: -25px;
    font: {
      family: $inter;
      size: 15px;
      weight: 400;
    }
    hr {
      width: 40px;
      border: 1px solid $brown-color;
    }
    span {
      font-weight: 700;
    }
  }
  
  .profile-menu-Auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 80px;
    height: 115px;
    background-color: $white-color;
    z-index: 4;
    top: 30px;
    right: -25px;
    font: {
      family: $inter;
      size: 15px;
      weight: 400;
    }
    hr {
      width: 40px;
      border: 1px solid $brown-color;
    }
    span {
      font-weight: 700;
      font-size: 12px;
    }
  }
  
  .log-Links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
    .profile-myProfile,
    .profile-logOut,
    .profile-logIn,
    .profile-reg {
      &:hover {
        cursor: pointer;
        color: $brown-color;
      }
    }
  }
  </style>
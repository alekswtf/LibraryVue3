<template>
  <div class="user-profile-badge-wrapper" v-click-outside="closeDropMenu">
      <div v-if="authStore.isAuthenticated" class="user-initials" @click="toggleDropMenu">
        {{ userInitials }}
      </div>
      
      <div v-else class="user-profile-badge">
        <button @click="toggleDropMenu"></button>
        <img src="../../assets/icons/icon_profile.svg" alt="iconProfile">
      </div>

      <transition name="fade-slide">
        <DropMenu v-if="isMenuOpen" 
          @close="closeDropMenu" 
          @openLoginModal="openLoginModal" 
          @openRegisterModal="openRegisterModal" 
          @openProfileModal="openProfileModal"
        />
      </transition>
    </div>

    <Teleport to="body" >
      <transition name="modal-slide">
      <LoginModal v-if="showLoginModal" 
        @close="closeLoginModal" 
        @switchToRegister="handleSwitchToRegister"
      />
      </transition>

      <transition name="modal-slide">
        <RegisterModal v-if="showRegisterModal" 
          @close="closeRegisterModal" 
          @switchToLogin="handleSwitchToLogin"
        />
      </transition>

      <transition name="modal-slide">
        <ProfileModal v-if="showProfileModal" 
          @close="closeProfileModal"
         />
      </transition>
      
      <OverlayModal v-bind:isOpen="showLoginModal || showRegisterModal || showProfileModal" @close="closeAllModals" />
    </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useModal } from '@/store/useModal';
import { useAuthStore } from '@/store/auth';
import DropMenu from './DropMenu.vue'; 
import LoginModal from '../modals/LoginModal.vue';
import RegisterModal from '../modals/RegisterModal.vue';
import OverlayModal from '../modals/OverlayModal.vue';
import ProfileModal from '../modals/ProfileModal.vue';

const isMenuOpen = ref(false);

const authStore = useAuthStore();
const userInitials = computed(() => {
  return (authStore.user?.userFirstName?.[0] || '') + (authStore.user?.userLastName?.[0] || '');
});

const toggleDropMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeDropMenu = () => {
  isMenuOpen.value = false;
};

const {
  showLoginModal,
  showRegisterModal,
  showProfileModal,
  openLoginModal,
  closeLoginModal,
  openRegisterModal,
  closeRegisterModal,
  handleSwitchToRegister,
  handleSwitchToLogin,
  openProfileModal,
  closeProfileModal,
  closeAllModals,
} = useModal();


</script>


<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.user-profile-badge-wrapper {
    z-index: 4;
    position: relative;
    margin-right: -30px;
}
.user-initials {
  width: 28px;
  height: 28px;
  border-radius: 100%;
  background-color: $white-color;
  color: $brown-color;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $inter;
  font-size: 14px;
  line-height: 133%;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: $brown-color;
    color: $white-color;
  }
}

.user-profile-badge {
    cursor: pointer;
    border-radius: 100%;
    width: 28px;
    height: 28px;

    &:hover {
        cursor: pointer;
        background-color: $brown-color;
    }
}

button {
    background-color: transparent;
    border-color: transparent;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    position: absolute;
    &:hover {
        cursor: pointer;
        
    }
}


.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-140px);
  opacity: 0;
}

.modal-slide-enter-active, .modal-slide-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.modal-slide-enter-from, .modal-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
@include tablet {
  .user-profile-badge-wrapper {
    margin-right: 0;
  }
}
  
</style>
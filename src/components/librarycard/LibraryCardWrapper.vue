<template>
    <div class="library-wrapper">
        <LibraryCardSearch 

        />
        <LibraryCardGetProfile 
              @openLoginModal="openLoginModal" 
              @openRegisterModal="openRegisterModal" 
              @openProfileModal="openProfileModal"
        />
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
import { useModal } from '@/store/useModal';
import LibraryCardSearch from './LibraryCardSearch.vue';
import LibraryCardGetProfile from './LibraryCardGetProfile.vue';
import LoginModal from '../modals/LoginModal.vue';
import RegisterModal from '../modals/RegisterModal.vue';
import OverlayModal from '../modals/OverlayModal.vue';
import ProfileModal from '../modals/ProfileModal.vue';

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

.library-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }


.modal-slide-enter-active, .modal-slide-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.modal-slide-enter-from, .modal-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

@include desktop {
    .library-wrapper {
        flex-direction: column;
        align-items: center;
    }
}

@include tablet {
    .library-wrapper {
        flex-direction: column;
        align-items: center;
    }
}
</style>
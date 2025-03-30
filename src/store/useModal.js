
import { ref, onMounted, onUnmounted } from 'vue';

export function useModal() {

  const showLoginModal = ref(false);
  const showRegisterModal = ref(false);
  const showProfileModal = ref(false);
  const showBuyLibraryCardModal = ref(false);

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleEscape);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
  });

  const openLoginModal = () => {
    showLoginModal.value = true;
  };

  const closeLoginModal = () => {
    showLoginModal.value = false;
  };

  const openRegisterModal = () => {
    showRegisterModal.value = true;
  };

  const closeRegisterModal = () => {
    showRegisterModal.value = false;
  };

  const handleSwitchToRegister = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const handleSwitchToLogin = () => {
    closeRegisterModal();
    openLoginModal();
  };

  const openProfileModal = () => {
    showProfileModal.value = true;
  };
  const closeProfileModal = () => {
    showProfileModal.value = false;
  };

  const openBuyLibraryCardModal = () => { 
    showBuyLibraryCardModal.value = true; 
  };
  const closeBuyLibraryCardModal = () => { 
    showBuyLibraryCardModal.value = false; 
  };

  const closeAllModals = () => {
    showLoginModal.value = false;
    showRegisterModal.value = false;
    showProfileModal.value = false;
    showBuyLibraryCardModal.value = false; 
  };

  return {
    showLoginModal,
    showRegisterModal,
    showProfileModal,
    showBuyLibraryCardModal,
    openLoginModal,
    closeLoginModal,
    openRegisterModal,
    closeRegisterModal,
    handleSwitchToRegister,
    handleSwitchToLogin,
    openProfileModal,
    closeProfileModal,
    openBuyLibraryCardModal,
    closeBuyLibraryCardModal,
    closeAllModals,
  };
}
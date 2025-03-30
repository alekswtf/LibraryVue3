<template>
    <div class="book-card-container">
        <div class="card">
            <div class="card-info">
                <h3>{{ staff }}</h3>
                <hr>
                <h4>{{ title }}</h4>
                <h5>By {{ author }}</h5>
                <p>{{ description }}</p>
                <button v-if="!isOwned" class="card-button" @click="handleBuyClick">Buy</button> 
			    <button v-else @click="handleOwnClick" class="card-button-own">Own</button>
            </div>
            <img :src="image" :alt="title">
        </div>

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
        <BuyLibraryCard v-if="showBuyLibraryCardModal"
            :book="{ title, author }"
            @close="closeBuyLibraryCardModalOverride" />
      </transition>
      
      <OverlayModal v-bind:isOpen="showLoginModal || showRegisterModal || showBuyLibraryCardModal" @close="closeAllModals" />
    </Teleport>
</template>

<script setup>
import BuyLibraryCard from '@/components/modals/BuyLibraryCard.vue';
import LoginModal from '@/components/modals/LoginModal.vue';
import RegisterModal from '@/components/modals/RegisterModal.vue';
import OverlayModal from '@/components/modals/OverlayModal.vue'; 
import { useAuthStore } from '@/store/auth';
import { useCardStore } from '@/store/useCardStore';
import { ref, onMounted, watch } from 'vue';
import { defineProps } from 'vue';
import { useModal } from '@/store/useModal';

const {
  showLoginModal,
  showRegisterModal,
  showBuyLibraryCardModal,
  openLoginModal,
  closeLoginModal,
  closeRegisterModal,
  handleSwitchToRegister,
  handleSwitchToLogin,
  openBuyLibraryCardModal,
  closeBuyLibraryCardModal,
  closeAllModals,
} = useModal();

const props = defineProps({
  staff: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const authStore = useAuthStore();
const cardStore = useCardStore();

const isOwned = ref(
  authStore.user?.ownedBooks?.some(book => JSON.parse(book).title === props.title) || false
);

const handleBuyClick = async () => {
  if (!authStore.isAuthenticated) {
    openLoginModal();
  } else {
    cardStore.loadCardDetails();
    if (!cardStore.bankCardNumber) {
      openBuyLibraryCardModal();
    } else {
      await buyBook();
    }
  }
};


const buyBook = async () => {
  try {
    const bookEntry = JSON.stringify({ title: props.title, author: props.author });
    const updatedBooks = authStore.user.ownedBooks
      ? [...authStore.user.ownedBooks, bookEntry]
      : [bookEntry];

    await authStore.updateUserData({ ownedBooks: updatedBooks });
    isOwned.value = true;
    console.log(`Book "${props.title}" by "${props.author}" purchased and added to ownedBooks.`);
  } catch (err) {
    console.error('Error purchasing book:', err);
  }
};

// Обработка клика по кнопке "Own" (опционально)
const handleOwnClick = () => {
  console.log(`You already own "${props.title}".`);
};



const closeBuyLibraryCardModalOverride = () => {
  closeBuyLibraryCardModal();
  if (cardStore.bankCardNumber && !isOwned.value) { // Проверяем, не куплена ли книга уже
    buyBook();
  }
};


onMounted(() => {
  if (authStore.isAuthenticated) {
    isOwned.value = authStore.user?.ownedBooks?.some(book => JSON.parse(book).title === props.title) || false;
  }
});

watch(
  () => authStore.user?.ownedBooks,
  (newOwnedBooks) => {
    if (authStore.isAuthenticated && newOwnedBooks) {
      isOwned.value = newOwnedBooks.some(book => JSON.parse(book).title === props.title);
    }
  },
  { deep: true }
);
</script>


<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.card {
	width: 550px;
	height: 555px;
	border: solid 1px $black-color;
	padding: 15px;
	pointer-events: auto;

	img {
		width: 200px;
		height: 300px;
		position: relative;
		left: 214px;
    	bottom: 283px;
	  }
}


.card-info {
	display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;

	h3 {
		font-family: $forum;
		font-size: 20px;
		line-height: 200%;
		letter-spacing: 0.1em;
		text-transform: capitalize;
		color: $black-color;
		text-align: left;
	}

	h4 {
		text-transform: uppercase;
        font-family: $inter;    
        font-size: 15px;
        font-weight: bold;
		line-height: 267%;
		letter-spacing: 0.13em;
		text-align: left;
		color: $black-color;
		margin-top: 15px;
	}
	h5 {
		text-transform: capitalize;
		font-family: $inter;    
        font-size: 15px;
        font-weight: bold;
		line-height: 267%;
		letter-spacing: 0.13em;
		text-align: left;
		color: $black-color;
	}

	p {
		font-family: $inter;
        font-size: 15px;
		line-height: 267%;
		letter-spacing: 0.13em;
		text-transform: capitalize;
		text-align: left;
		color: $black-color;
		height: 320px;
		width: 355px;
		margin-top: 15px;
	}

	hr {
		width: 60px;
		border: 1px solid $brown-color; 
		position: relative;
		margin: 0px;
	}
}
.card-button {
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
	margin-top: 20px;
}

.modal-slide-enter-active, .modal-slide-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.modal-slide-enter-from, .modal-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.card-button-own {
	@include button-styles-own;
	margin-top: 20px;
}
</style>
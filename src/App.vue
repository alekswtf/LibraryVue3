<template>
  <header>
    <HeaderContainer />
  </header>
  <WelcomeContainer />
  
  <main>
    <AboutContainer id="AboutContainer"/>
    <FavoritesContainer id="FavoritesContainer"/>
    <CoffeeShopContainer id="CoffeeShopContainer"/>
    <ContactsContainer id="ContactsContainer"/>
    <LibraryCardContainer id="LibraryCardContainer"/>
  </main>
  <footer>
    <FooterContainer />
  </footer>
</template>

<script setup>
  import HeaderContainer from './components/header/HeaderContainer.vue';
  import WelcomeContainer from './components/welcome/WelcomeContainer.vue';
  import AboutContainer from './components/about/AboutContainer.vue';
  import FavoritesContainer from './components/favorites/FavoritesContainer.vue';
  import CoffeeShopContainer from './components/coffeeshop/CoffeeShopContainer.vue';
  import ContactsContainer from './components/contacts/ContactsContainer.vue';
  import LibraryCardContainer from './components/librarycard/LibraryCardContainer.vue';
  import FooterContainer from './components/footer/FooterContainer.vue';

import { onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

onMounted(() => {
  authStore.init();
});

</script>

<style scoped>

</style>

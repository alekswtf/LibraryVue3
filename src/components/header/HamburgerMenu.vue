<template>
    <div>
      <div
        class="hamburger"
        @click="toggleMenu"
        :class="{ 'active': isMenuOpen }"
        v-click-outside="closeMenu"
      >
        <span class="menu-line"></span>
        <span class="menu-line"></span>
        <span class="menu-line"></span>
      </div>
      <div
        class="mobile-menu"
        :class="{ 'active': isMenuOpen }"
        @click.stop
      >
        <ul class="link-container-mobile">
          <li
            class="menu-item"
            v-for="(item, index) in navItems"
            :key="index"
          >
            <a
              :href="`#${item.href}`"
              class="menu-link"
              @click="closeMenu"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isMenuOpen = ref(false);

  const navItems = ref([
    { label: 'About', href: 'AboutContainer' },
    { label: 'Favorites', href: 'FavoritesContainer' },
    { label: 'Coffee shop', href: 'CoffeeShopContainer' },
    { label: 'Contacts', href: 'ContactsContainer' },
    { label: 'Library Card', href: 'LibraryCardContainer' },
  ]);
  

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const closeMenu = () => {
    isMenuOpen.value = false;
  };
  

  </script>
  
  <style lang="scss" scoped>
  @use '@/assets/styles/main.scss' as *;

  .hamburger {
    display: none;
  }
  .mobile-menu {
    display: none;
  }
  
  @include tablet {
    .hamburger {
      display: block;
      position: relative;
      z-index: 5;
      width: 45px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
  
      .menu-line {
        display: block;
        background-color: $white-color;
        width: 100%;
        height: 2px;
        transition: all 0.5s ease-in-out;
      }
  
      &.active .menu-line:nth-child(1) {
        transform: translateX(3px) translateY(11px) rotate(45deg);
      }
      &.active .menu-line:nth-child(2) {
        transform: translateX(100px);
        opacity: 0;
      }
      &.active .menu-line:nth-child(3) {
        transform: translateX(2px) translateY(-13px) rotate(-45deg);
      }
    }
  
    .mobile-menu {
      display: flex;
      justify-content: center;
      position: fixed;
      top: -100%;
      right: 0;
      width: 332px;
      height: 570px;
      background-color: $black-color;
      transition: all 0.5s ease-in-out;
      z-index: 3;
      font: {
        family: $inter;
        size: 20px;
        weight: 300;
      }
      line-height: 350%;
  
      &.active {
        top: 0;
      }
    }
  
    .link-container-mobile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  
  .menu-link {
    text-decoration: none;
    color: $white-color;
    &:hover {
      color: $brown-color;
    }
  }
  </style>
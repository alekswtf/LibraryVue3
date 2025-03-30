<template>
    <div class="radio">
      <div class="radio-container">
        <fieldset class="radio-box">
          <legend>Pick favorites of season</legend>
          <div v-for="(season, index) in seasons" :key="index">
            <input
              type="radio"
              :id="season"
              name="season"
              :value="season"
              v-model="selectedSeason"
            />
            <label :for="season">{{ season }}</label>
          </div>
        </fieldset>
      </div>
      <transition name="fade" mode="out-in">
        <component :is="selectedComponent" :ownedBooks="ownedBooks" />
      </transition>
    </div>
</template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import WinterBooks from '@/components/favorites/books/WinterBooks.vue';
  import SpringBooks from '@/components/favorites/books/SpringBooks.vue';
  import SummerBooks from '@/components/favorites/books/SummerBooks.vue';
  import AutumnBooks from '@/components/favorites/books/AutumnBooks.vue';

 
      const selectedSeason = ref('Winter');
      const seasons = ref(['Winter', 'Spring', 'Summer', 'Autumn']);
      const ownedBooks = ref([]);
  
      const selectedComponent = computed(() => {
        switch (selectedSeason.value) {
          case 'Winter':
            return WinterBooks;
          case 'Spring':
            return SpringBooks;
          case 'Summer':
            return SummerBooks;
          case 'Autumn':
            return AutumnBooks;
          default:
            return WinterBooks;
        }
      });
  
      const checkOwnership = () => {
        try {
          const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
          ownedBooks.value = loggedInUser.ownedBooks || [];
        } catch (error) {
          console.error('Error parsing loggedInUser:', error);
          ownedBooks.value = [];
        }
      };
  
      onMounted(() => {
        checkOwnership();
      });
  
  </script>
  
  <style lang="scss" scoped>
  @use '@/assets/styles/main.scss' as *;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .radio-container {
    top: 0;
    background-color: $white-color;
    z-index: 2;
    width: 100%;
    font: {
      family: $inter;
      size: 20px;
    }
    text-align: start;
    color: $black-color;
  }
  
  input[type="radio"] {
    &:checked + label {
      font-weight: bold;
    }
    margin-right: 20px;
    appearance: none;
    border: 2px solid $black-color;
    border-radius: 50%;
    width: 17px;
    height: 17px;
    cursor: pointer;
    position: relative;
  
    &:checked::before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: 50%;
      background-color: $black-color;
      border-radius: 50%;
    }

  }
  
  .radio-box {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    gap: 100px;
    height: 100px;
    legend {
      margin-bottom: 40px;
      font-weight: bold;
    }
    label {
      cursor: pointer;
    }
  }
  
  @include tablet {
    .radio-container {
      position: sticky;
    }
    .radio-box {
      gap: 90px;
    }
  }
  </style>

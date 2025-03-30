<template>
    <div class="about-arrows-buttons">
      <button :class="leftArrow" @click="prevPage"></button>
      <button :class="rightArrow" @click="nextPage"></button>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';

  defineProps({
    prevPage: {
      type: Function,
      required: true,
    },
    nextPage: {
      type: Function,
      required: true,
    },
  });

  const leftArrow = ref('arrow-left');
  const rightArrow = ref('arrow-right');
</script>
  
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;


  .about-arrows-buttons {
    display: none;
  }
  
    @include tablet {
    .about-arrows-buttons {
      display: flex;
      gap: 600px;
      position: relative;
      top: 300px;
    }
    .arrow-left {
      background: url('@/assets/icons/Carret_Left.png') no-repeat;
      cursor: pointer;
      height: 24px;
      width: 24px;
      border: none;
    }
    .arrow-right {
      background: url('@/assets/icons/Carret_Right.png') no-repeat;
      cursor: pointer;
      height: 24px;
      width: 24px;
      border: none;
    }
  }
  </style>

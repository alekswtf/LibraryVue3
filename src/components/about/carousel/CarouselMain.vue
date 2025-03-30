<template>
    <div class="about-carousel">
      <Slide
        v-for="item in carousel_data"
        :key="item.id"
        :item_data="item"
      />
    </div>
</template>
  
  <script setup>
import Slide from '@/components/about/carousel/SlideMain.vue';

defineProps({
  carousel_data: {
    type: Array,
    default: () => [],
  },
});
</script>
  
<style lang="scss" scoped>
  @use '@/assets/styles/main.scss' as *;
  
.about-carousel {
    display: flex;
    width: 100%;
    gap: 25px;
    transition: transform 0.5s ease-in-out;
  }
  </style>
  
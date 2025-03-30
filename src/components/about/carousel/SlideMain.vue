<template>
    <div class="about-slide">
      <img :src="imageSrc" :alt="item_data.name">
    </div>
</template>
  
<script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
      item_data: {
        type: Object,
        required: true,
      },
    });
      const imageSrc = computed(() => {
        return new URL(`../../../assets/img/carousel/${props.item_data.img}`, import.meta.url).href;
      });
  
</script>
  
<style lang="scss" scoped>
  @use '@/assets/styles/main.scss' as *;
  
  .about-slide {
    width: 450px;
    display: inline-block;
  }
</style>
  
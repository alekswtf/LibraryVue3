<template>
    <div class="about-carousel-wrapper">
      <ArrowsBtns :prevPage="prevPage" :nextPage="nextPage" />
      <div class="slides-inner">
        <Carousel
          :carousel_data="sliderItems"
          :style="{ transform: `translateX(${-slideWidth * currentPage}%)` }"
        />
      </div>
      <div class="carousel-controls">
        <DotsBtns
          :currentPage="currentPage"
          :prevPage="prevPage"
          :nextPage="nextPage"
          :totalPages="totalPages"
          @update:currentPage="currentPage = $event"
        />
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import Carousel from './carousel/CarouselMain.vue';
  import ArrowsBtns from './carousel/ArrowsBtns.vue';
  import DotsBtns from './carousel/DotsBtns.vue';
  
      const sliderItems = ref([
        { id: 1, name: 'img1', img: 'image_1.png' },
        { id: 2, name: 'img2', img: 'image_2.png' },
        { id: 3, name: 'img3', img: 'image_3.png' },
        { id: 4, name: 'img4', img: 'image_4.png' },
        { id: 5, name: 'img5', img: 'image_5.png' },
      ]);
  
      const currentPage = ref(0);
      const slidesPerPage = ref(3);
  
      const totalPages = computed(() => {
        return Math.ceil(sliderItems.value.length / slidesPerPage.value);
      });
  
      const slideWidth = computed(() => {
        return 100 / slidesPerPage.value;
      });
  
      const isMobile = computed(() => window.innerWidth <= 768);
  
      const prevPage = () => {
        if (currentPage.value > 0) {
          currentPage.value--;
        }
      };
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value - 1) {
          currentPage.value++;
        }
      };
  
      

      const updateSlidesPerPage = () => {
        const wasMobile = slidesPerPage.value === 1;
        slidesPerPage.value = isMobile.value ? 1 : 3;
        
        // Reset to page 2 (index 2) if coming from mobile and was on page 4 or 5
        if (!isMobile.value && wasMobile && currentPage.value > 2) {
          currentPage.value = 2; // Reset to last page for 3 slides per page
        }
      };
  
      onMounted(() => {
        updateSlidesPerPage();
        window.addEventListener('resize', updateSlidesPerPage);
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('resize', updateSlidesPerPage);
      });
  
  </script>
  
  <style lang="scss" scoped>
  @use '@/assets/styles/main.scss' as *;

  .about-carousel-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .slides-inner {
    display: flex;
    width: 100%;
    gap: 20px;
  }
  
  .carousel-controls {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  
  @include tablet {
    .about-carousel-wrapper {
      width: 100%;
    }
    .slides-inner {
      width: 65%;
      overflow: hidden;
    }
  }
  </style>
  
  

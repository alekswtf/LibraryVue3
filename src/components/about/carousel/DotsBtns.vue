<template>
    <div class="carousel-buttons">
      <button
        v-for="page in pages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
      ></button>
    </div>
</template>
  
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    default: 0,
  },
  totalPages: {
    type: Number,
    default: 0,
  },
  prevPage: {
    type: Function,
    required: true,
  },
  nextPage: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['update:currentPage']);

const pages = ref([]);
const slidesPerPage = ref(3);

const updatePages = () => {
  if (window.innerWidth <= 768) {
    slidesPerPage.value = 1;
    pages.value = Array.from({ length: props.totalPages }, (_, i) => i);
  } else {
    slidesPerPage.value = 3;
    pages.value = [0, 1, 2];
  }
};

const goToPage = (page) => {
  emit('update:currentPage', page);
};

const handleResize = () => {
  updatePages();
};

onMounted(() => {
  updatePages();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

watch(() => props.totalPages, updatePages);

</script>
  
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

  .carousel-buttons {
    display: flex;
    gap: 10px;
    margin-top: 45px;
  }
  
  button {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: $main-color;
    border: none;
    cursor: pointer;
  
    &:hover {
      background-color: $brown-color;
    }
  
    &.active {
      background-color: $brown-color;
    }
  }
</style>
  
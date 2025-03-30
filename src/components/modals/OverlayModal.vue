<template>
    <transition name="fade">
        <div v-if="props.isOpen" class="overlay" @click.self="closeOverlay">
                <slot></slot>
        </div>
    </transition>
    
</template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
  });

  const emit = defineEmits(['close']);

  const closeOverlay = () => {
      emit('close');
  };

  </script>
  
  <style lang="scss" scoped>
  @use '@/assets/styles/main.scss' as *;
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 12, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  

  .fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity:  0;
}
  </style>
  
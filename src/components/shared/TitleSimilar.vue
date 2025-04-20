<template>
    <div class="title-similar">
        <h2>
            {{ title }}
        </h2>
        <hr>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;
.title-similar {
  font-family: $forum;
  font-weight: 400;
  font-size: 40px;
  color: $main-color;
  line-height: 100%;
  letter-spacing: 0.05em;
  text-transform: capitalize;

  hr {
    width: 50px;
    border: 1px solid $main-color;
    margin-top: 20px;
    margin-bottom: 40px;
  }
}
</style>
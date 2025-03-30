<template>
    <div class="library-card-container">
        <TitleSimilar title="Library Card"/>
        <LibraryCardWrapper />
    </div>
</template>

<script setup>
import TitleSimilar from '../shared/TitleSimilar.vue';
import LibraryCardWrapper from './LibraryCardWrapper.vue';
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.library-card-container {
    max-height: 614px;
	text-align: center;
    margin-top: 50px;
    padding: 20px;
}    
@include desktop {
    .library-card-container {
        max-height: 857px;
    }
}
@include tablet {
    .library-card-container {
        max-height: 857px;
    }
}
</style>
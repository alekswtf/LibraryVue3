<template>
    <div class="about-container">
        <TitleSimilar title="About" />
        <AboutText />
        <AboutCarouselWrapper />
    </div>
</template>

<script setup>
import TitleSimilar from '../shared/TitleSimilar.vue';
import  AboutText from './AboutText.vue';
import AboutCarouselWrapper from './AboutCarouselWrapper.vue';

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.about-container {
	min-height: 837px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
}

@include tablet {
    .about-container {
        min-height: 862px;
    }
    
}
</style>
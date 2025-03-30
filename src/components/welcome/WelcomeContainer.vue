<template>
    <div class="welcome-container">
        <WelcomeOverlay />
        <WelcomeText />
    </div>
</template>

<script setup >
import WelcomeOverlay from './WelcomeOverlay.vue';
import WelcomeText from './WelcomeText.vue';

</script>

<style lang="scss" scoped>
.welcome-container {
    min-height: 600px;
	background: url('@/assets/img/welcome_bg.jpg') center (center / cover) no-repeat;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
</style>
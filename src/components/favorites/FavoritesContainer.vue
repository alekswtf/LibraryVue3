<template>
    <div class="favorites-container">
        <TitleSimilar title="Favorites" />
        <FavoritesBooksContainer />
    </div>
</template>

<script setup>
import TitleSimilar from '../shared/TitleSimilar.vue';
import FavoritesBooksContainer from './FavoritesBooksContainer.vue';

</script>

<style lang="scss" scoped>
 @use '@/assets/styles/main.scss' as *;
.favorites-container {
	max-height: 1440px;
	text-align: center;
	padding: 20px;
}
@include tablet {
    .favorites-container {
        max-height: 2630px;
    }
}
</style>
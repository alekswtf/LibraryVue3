<template>
    <div class="coffee-shop-container">
        <TitleSimilar title="Coffee Shop"/>
        <CoffeeShopDeclaration/>
        <CoffeeShopPrices/>
    </div>
</template>

<script setup>
import TitleSimilar from '../shared/TitleSimilar.vue';
import CoffeeShopDeclaration from './CoffeeShopDeclaration.vue';
import CoffeeShopPrices from './CoffeeShopPrices.vue';

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.coffee-shop-container {
    background-color: $white-color;
	max-height: 841px;
	text-align: center;
	padding: 20px;
    margin-top: 30px;
}
@include desktop {
    .coffee-shop-container {
        max-height: 1481px;
    }
}
@include tablet {
    .coffee-shop-container {
        max-height: 1481px;
    }
}
</style>
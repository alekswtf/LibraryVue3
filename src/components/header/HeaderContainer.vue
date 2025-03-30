<template>
    <div class="header-container">
        <h1 class="h1">Brooklyn Public Library</h1>
    
        <div class="navigation-profile-wrapper">
            <Navigation />
            <ProfileBadge />
            <HamburgerMenu />
        </div>
    </div>    
</template>

<script setup>
import Navigation from './HeaderNavigation.vue';
import ProfileBadge from './ProfileBadge.vue';
import HamburgerMenu from './HamburgerMenu.vue';

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

    .header-container {
        height: 90px;
        background-color: $main-color;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px 0px 20px;
        
    }

    .h1 {
        font-family: "Forum", sans-serif;
        font-weight: 400;
        font-size: 30px;
        line-height: 167%;
        letter-spacing: 0.02em;
        color: $white-color;
    }

    .navigation-profile-wrapper {
        display: flex;
        align-items: center;
        gap: 40px;
    }
@include tablet {
    .navigation-profile-wrapper {
        padding: 35px;
    }
}
</style>

<template>
    <nav>
        <ul class="navigation-container">
            <li class="list-item" v-for="(item, index) in navItems" :key="index">
                <a :href="`#${item.href}`" class="item-link">
                    {{ item.label }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>

        const navItems = [
            { label: 'About', href: 'AboutContainer' },
            { label: 'Favorites', href: 'FavoritesContainer' },
            { label: 'Coffee shop', href: 'CoffeeShopContainer' },
            { label: 'Contacts', href: 'ContactsContainer' },
            { label: 'Library Card', href: 'LibraryCardContainer' },
        ];

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.navigation-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
}
a {
    font-weight: 400;
    font-size: 20px;
    line-height: 250%;
    font-family: $inter;
    color: $white-color;
    cursor: pointer;
    &:hover {
        color: $brown-color;
    }
}

@include desktop {
    .navigation-container {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: space-around;
    }
}

@include tablet {
    .navigation-container {
        display: none;
    }
}
</style>
<template>
    <div class="about-text">
        The Brooklyn Library is a free workspace, a large number of books and a cozy coffee shop inside 
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;
.about-text {
    font-family: $inter;
    font-size: 20px;
    text-align: center;
    color: $black-color;
    margin-bottom: 40px;
}

@include tablet {
    .about-text {
        line-height: 200%;
        margin-bottom: 20px;
    }
}
</style>
<template>
    <div class="welcome-text">
        <h1>
          Welcome <br> to The Brooklyn  <br> Library
        </h1>
    </div>
</template>

<script setup >

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.welcome-text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 600px;
    height: 220px;
    background-color: $main-color;
    margin-top: -80px;
    h1 {
      font-family: $forum;
      font-weight: 200;
      font-size: 40px;
      text-transform: uppercase;
      text-align: center;
      color: $white-color;
      line-height: 125%;
      letter-spacing: 0.07em;
    }
  }

</style>

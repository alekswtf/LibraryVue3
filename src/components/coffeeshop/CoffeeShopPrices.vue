<template>
    <div class="prices">
      <div class="prices-drinks">
        <h3>Coffee & Tea</h3>
        <div class="price" v-for="(drink, index) in drinks" :key="index">
          <p>{{ drink.name }}</p>
          <hr>
          <p>${{ drink.price }}</p>
        </div>
      </div>
  
      <div class="prices-desserts">
        <h3>Desserts & Cakes</h3>
        <div class="price" v-for="(dessert, index) in desserts" :key="index">
          <p>{{ dessert.name }}</p>
          <hr>
          <p>${{ dessert.price }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

      const drinks = ref([
          { name: 'Cold Brew Coffee', price: 3 },
          { name: 'French Press Pot', price: 5 },
          { name: 'Espresso', price: 2 },
          { name: 'Cappuccino', price: 5 },
          { name: 'Hot tea', price: 2 },
          { name: 'Cold tea', price: 2 }
        ]);
      const desserts = ref([
          { name: 'Forest Gateau', price: 16 },
          { name: 'Blue Moon', price: 16 },
          { name: 'Truffle Cake', price: 15 },
          { name: 'Chocolate Cake', price: 18 },
          { name: "Poet's Dream Cake", price: 16 },
          { name: 'Pineapple Cake', price: 14 }
        ]);

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;
  
.prices {
    display: grid;
    grid-template-columns: repeat(2, 500px);
    justify-content: space-between;
    margin-top: 40px;
    
  
    h3 {
      font-family: $forum;
      font-size: 40px;
      font-weight: 400;
      line-height: 100%;
      letter-spacing: 0.05em;
      text-transform: capitalize;
      color: $brown-color;
      text-align: start;
    }
  
    p {
      font-family: $inter;
      font-size: 20px;
      line-height: 200%;
      letter-spacing: 0.1em;
      color: $black-color;
    }
  
    hr {
      border: 1px solid $brown-color;
      width: 100px;
      height: 0px;
      margin: 3px 65px 0 auto;
    }
  
    .prices-drinks {
      display: flex;
      flex-direction: column;
      gap: 40px;
      width: 438px;
    }
  }

  .prices-desserts {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 40px;
    width: 482px;
    h3 {
      text-align: end;
    }
    .price {
      gap: 40px;
    }
    hr {
      border: 1px solid $brown-color;
      width: 100px;
      height: 0px;
      margin: 3px 30px 0 auto;
    }
  }

.price {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
} 
@include desktop {
  .prices {
    grid-template-columns: repeat(1, 730px);
    gap: 40px;
  }
  .prices-desserts {
    width: auto;
  }
}
@include tablet {
  .prices {
    grid-template-columns: repeat(1, 730px);
    gap: 40px;
  }
  .prices-desserts {
    width: auto;
  }
}

</style>

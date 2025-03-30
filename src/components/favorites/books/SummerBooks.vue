<template>
    <div class="book-cards">
      <BookCard
        staff="Staff Picks"
        title="Crude: A Memoir"
        author="Pablo Fajardo &   Sophie Tardy-Joubert"
        description="Drawing and color by Damien Roudeau | This book illustrates the struggles of a group of indigenous Ecuadoreans as they try to sue the ChevronTexaco company for damage their oil fields did to the Amazon and her people."
        :image="book1"
      />
      <BookCard
        staff="Staff Picks"
        title="My People Go Surfing"
        author="Yvon Chouinard"
        description="Chouinard—climber, businessman, environmentalist—shares tales of courage and persistence from his experience of founding and leading Patagonia, Inc. Full title: Let My People Go Surfing: The Education of a Reluctant Businessman, Including 10 More Years of Business Unusual."
        :image="book2"
      />
      <BookCard
        staff="Staff Picks"
        title="The Octopus Museum: Poems"
        author="Brenda Shaughnessy"
        description="This collection of bold and scathingly beautiful feminist poems imagines what comes after our current age of environmental destruction, racism, sexism, and divisive politics."
        :image="book3"
      />
      <BookCard
        staff="Staff Picks"
        title="Shark Dialogues: A Novel"
        author="Kiana Davenport"
        description="An epic saga of seven generations of one family encompasses the tumultuous history of Hawaii as a Hawaiian woman gathers her four granddaughters together in an erotic tale of villains and dreamers, queens and revolutionaries, lepers and healers."
        :image="book4"
      />
    </div>
</template>

<script setup>
 
  import BookCard from '@/components/favorites/books/BookCard.vue';
  import book1 from '@/assets/img/books/summer/book_1.png';
  import book2 from '@/assets/img/books/summer/book_2.png';
  import book3 from '@/assets/img/books/summer/book_3.png';
  import book4 from '@/assets/img/books/summer/book_4.png';

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

  .book-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    column-gap: 200px;
    row-gap: 40px;
  }
  
@include tablet {
    .book-cards {
      grid-template-columns: repeat(1, 1fr);
      justify-items: center;
    }
  } 
  </style>

<template>
    <div class="book-cards">
      <BookCard
        staff="Staff Picks"
        title="The Body"
        author="Stephen King"
        description="Powerful novel that takes you back to a nostalgic time, exploring both the beauty and danger and loss of innocence that is youth."
        :image="book1"
      />
      <BookCard
        staff="Staff Picks"
        title="Carry: A Memoir Of Survival On Stolen Land"
        author="Toni Jenson"
        description="This memoir about the author's relationship with gun violence feels both expansive and intimate, resulting in a lyrical indictment of the way things are."
        :image="book2"
      />
      <BookCard
        staff="Staff Picks"
        title="Days Of Distraction"
        author="Alexandra Chang"
        description="Auerbach's Engaging Book Places The 'Comedy' Within The Tradition Of Epic, Tragedy, And Philosophy In General, Arguing For Dante's Uniqueness As One Who Raised The Individual And His Drama Of Soul Into Something Of Divine Significance—An Inspired Introduction To Dante's Main Themes."
        :image="book3"
      />
      <BookCard
        staff="Staff Picks"
        title="Dominicana"
        author="Angie Cruz"
        description="A fascinating story of a teenage girl who marries a man twice her age with the promise to bring her to America. Her marriage is an opportunity for her family to eventually immigrate. For fans of Isabel Allende and Julia Alvarez."
        :image="book4"
      />
    </div>
</template>

<script setup>
  import BookCard from '@/components/favorites/books/BookCard.vue';
  import book1 from '@/assets/img/books/spring/book_1.png';
  import book2 from '@/assets/img/books/spring/book_2.png';
  import book3 from '@/assets/img/books/spring/book_3.png';
  import book4 from '@/assets/img/books/spring/book_4.png';
  
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

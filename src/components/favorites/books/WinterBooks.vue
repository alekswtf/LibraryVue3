<template>
    <div class="book-cards">
      <BookCard
        staff="Staff Picks"
        title="The Book Eaters"
        author="Sunyi Dean"
        description="An Unusual Sci-Fi Story About A Book Eater Woman Who Tries Desperately To Save Her Dangerous Mind-Eater Son From Tradition And Certain Death. Complete With Dysfunctional Family Values, Light Sapphic Romance, And A Strong, Complex Protagonist. Not For The Faint Of Heart."
        :image="book1"
      />
      <BookCard
        staff="Staff Picks"
        title="Cackle"
        author="Lou Ureneck"
        description="Are Your Halloween Movies Of Choice The Witches Of Eastwick And Practical Magic? Look No Further Than Here - Where A Woman Recovering From A Breakup Moves To A Quaint Town In Upstate New York And Befriends A Beautiful Witch."
        :image="book2"
      />
      <BookCard
        staff="Staff Picks"
        title="Dante: Poet Of The Secular World"
        author="Erich Auerbach"
        description="Auerbach's Engaging Book Places The 'Comedy' Within The Tradition Of Epic, Tragedy, And Philosophy In General, Arguing For Dante's Uniqueness As One Who Raised The Individual And His Drama Of Soul Into Something Of Divine Significance—An Inspired Introduction To Dante's Main Themes."
        :image="book3"
      />
      <BookCard
        staff="Staff Picks"
        title="The Last Queen"
        author="Clive Irving"
        description="A Timely And Revelatory New Biography Of Queen Elizabeth (And Her Family) Exploring How The Windsors Have Evolved And Thrived As The Modern World Has Changed Around Them."
        :image="book4"
      />
    </div>
</template>
  
  <script setup>
  import BookCard from '@/components/favorites/books/BookCard.vue';
  import book1 from '@/assets/img/books/winter/book_1.png';
  import book2 from '@/assets/img/books/winter/book_2.png';
  import book3 from '@/assets/img/books/winter/book_3.png';
  import book4 from '@/assets/img/books/winter/book_4.png';
  
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

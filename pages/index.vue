<template>
  <div class="index-page">
    <archive-carrousel />
    <archive-announcement />
    <article-list />
  </div>
</template>

<script>
  import ArchiveCarrousel from "../components/archive-carrousel";
  import ArchiveAnnouncement from "../components/archive-announcement";
  import ArticleList from "../components/article-list";
  export default {
    name: 'Index',
    head() {
      return  {
        title: 'HOME-567WATCH',
        meta: [
          { charset: 'utf-8' },
          {
            hid: 'description',
            name: 'description',
            content: 'this is website for article,news ... other things about life,coding, interesting, by a programmer'
          }
        ],
      }
    },
    components: {ArticleList, ArchiveAnnouncement, ArchiveCarrousel},
  }
</script>

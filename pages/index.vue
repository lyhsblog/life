<template>
  <div class="index-page">
    <archive-carrousel
      :articles="articleList"
      :fetching="false"
    />
    <archive-announcement
      :announcements="announcements"
      :fetching="false"
    />
    <article-list
      :articles="articleList"
    />
  </div>
</template>

<script>
  import ArchiveCarrousel from "../components/archive-carrousel";
  import ArchiveAnnouncement from "../components/archive-announcement";
  import ArticleList from "../components/article-list";
  export default {
    name: 'Index',
    components: {ArticleList, ArchiveAnnouncement, ArchiveCarrousel},
    computed: {
      articleList: function () {
        return this.$store.state.article.articleList
      }
    },
    data() {
      return {
        announcements: [
          {
            'content': '12223311'
          },
          {
            'content': '12223312'
          },
          {
            'content': '12223313'
          },
          {
            'content': '12223314'
          },
          {
            'content': '12223315'
          }
        ]
      }
    },
    mounted() {
      this.$store.dispatch('article/loadArticleList')
    },
  }
</script>

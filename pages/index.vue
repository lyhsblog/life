<template>
  <div class="index-page">
    <archive-carrousel
      :articles="articleList"
      :fetching="fetching"
    />
    <archive-announcement
      :announcements="announcements"
      :fetching="true"
    />
    <article-list
      :articles="articleList"
      :fetching="fetching"
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
        fetching: true,
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
      this.$store.dispatch('article/loadArticleList', [
        {
          id: 1,
          ad: false,
          url: '/article/1',
          src: '/images/03-15-code-review.webp',
          thumb: '/images/03-15-code-review.webp',
          title: 'articletitle1',
          description: 'iamdesc1'
        },
        {
          id: 2,
          ad: false,
          url: '/article/1',
          src: '/images/2020-08-14-sea-1.webp',
          thumb: '/images/2020-08-14-sea-1.webp',
          title: 'articletitle2',
          description: 'iamdesc2'
        },
        {
          id: 3,
          ad: false,
          url: '/article/1',
          src: '/images/done-ok.webp',
          thumb: '/images/done-ok.webp',
          title: 'articletitle2',
          description: 'iamdesc2'
        }
      ])
      this.fetching = false
    },
  }
</script>

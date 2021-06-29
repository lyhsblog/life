<template>
  <div class="index-page">
    <archive-carrousel :recommended-list="recommendedList" />
    <archive-announcement />
    <article-list :article-list="articleList" />
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
    data: function () {
      return {
        recommendedList: [],
        articleList: [],
      }
    },
    async asyncData({$axios, params}) {
      const recommendedList = await $axios.$get("/article/hots").then(res => {
        return res.content
      })
      const articleList = await $axios.$get('/article', {
        params: {
          ...params
        }
      }).then(res => res)
      return {
        recommendedList,
        articleList
      }
    },
  }
</script>

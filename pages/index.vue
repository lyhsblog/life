<template>
  <div class="index-page">
    <archive-carrousel :recommended-list="recommendedList" />
    <archive-announcement />
    <article-list :article-list="articleList" :params="params" :query="query" />
  </div>
</template>

<script>
  export default {
    name: 'Index',
    components: {
      ArticleList: () => import('@/components/article-list'),
      ArchiveAnnouncement: () => import('@/components/archive-announcement'),
      ArchiveCarrousel: () => import('@/components/archive-carrousel')},
    head() {
      return  {
        title: 'HOME-567.WATCH',
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
    data: function () {
      return {
        recommendedList: [],
        articleList: [],
        params: {},
        query: {},
      }
    },
    async asyncData({$axios, params, query}) {
      const recommendedList = await $axios.$get("/article/recommended").then(res => {
        return res.content
      })
      const articleList = await $axios.$get('/article', {
        params: {
          ...params,
          ...query,
        }
      }).then(res => res)
      return {
        recommendedList,
        articleList,
        params,
        query
      }
    },
    watchQuery: ['page','searchword'],
  }
</script>

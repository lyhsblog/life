<template>
  <div class="article-page">
    <div class="module">
      <article-content
        :article="article"
      />
    </div>
    <div class="module">
      <article-share :fetching="fetching" />
    </div>
    <div class="releted">
      <article-related
        :fetching="fetching"
        :articles="relatedArticles"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticleDetail',
    components: {
      ArticleRelated: () => import('@/components/article-related'),
      ArticleShare: () => import('@/components/article-share'),
      ArticleContent: () => import('@/components/article-content'),
    },

    head() {
      return  {
        title: `${this.article.name}-567.WATCH`,
        meta: [
          { charset: 'utf-8' },
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ],
      }
    },
    data() {
      return {
        fetching: true,
        article: {},
        relatedArticles: []
      }
    },
    async asyncData({ $axios, params }) {
      const id = params.id
      const article = await $axios.$get("/article/"+id).then(res => res)
      const regex = /(\r\n)+/ig
      return { article }
    },
    mounted() {
      this.fetchArticle()
    },
    methods: {
      async fetchArticle() {
        const id = this.$route.params.id
        const relatedArticles = await this.$axios.$get(`/article/${id}/related`)
        this.relatedArticles.push(...relatedArticles.content)
        this.fetching = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .article-page {
    .module {
      margin-bottom: $lg-gap;
      @include radius-box($sm-radius);
      @include common-bg-module();
    }

    .releted {
      margin-bottom: $lg-gap;
    }

    @media (min-width: 320px) {
      .module {
        margin-bottom: $gap;
      }
    }

    @media (min-width: 1024px) {
      .module {
        margin-bottom: $lg-gap;
      }
    }
  }
</style>

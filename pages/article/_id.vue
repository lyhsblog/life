<template>
  <div class="article-page">
    <div class="module">
      <article-content
        :fetching="fetching"
        :article="article"
      />
    </div>
<!--    <div class="module">-->
<!--      <article-mammon :fetching="fetching" />-->
<!--    </div>-->
    <div class="module">
      <article-share :fetching="fetching" />
    </div>
<!--    <div class="module">-->
<!--      <article-meta-->
<!--        :fetching="fetching"-->
<!--        :article="article"-->
<!--      />-->
<!--    </div>-->
    <div class="releted">
      <article-related
        :fetching="fetching"
        :articles="relatedArticles"
      />
    </div>
  </div>
</template>

<script>

  import ArticleContent from "../../components/article-content";
  import ArticleMammon from "../../components/article-mammon";
  import ArticleShare from "../../components/article-share";
  import ArticleMeta from "../../components/article-meta";
  import ArticleRelated from "../../components/article-related";

  export default {
    name: 'ArticleDetail',
    head() {
      return  {
        title: this.article.name,
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
    components: {
      ArticleRelated,
      ArticleMeta,
      ArticleShare,
      ArticleMammon,
      ArticleContent
    },
    data() {
      return {
        fetching: false,
        article: {
          id: 1,
          ad: false,
          url: '/article/1',
          src: '/article/1.jpg',
          thumb: '/article/1.png',
          title: 'articletitle1',
          description: 'iamdesc1',
          content: ''
        },
        relatedArticles: []
      }
    },
    mounted() {
      this.fetchArticle()
    },
    methods: {
      async fetchArticle() {
        this.fetching = true
        const id = this.$route.params.id
        const res = await this.$axios.get("/article/"+id)
        this.article = res.data
        const relatedArticles = await this.$axios.get(`/article/${id}/related`)
        this.relatedArticles.push(...relatedArticles.data.content)
        setTimeout(() => {
          this.fetching = false
        }, 1000)
      }
    }
  }
</script>

<style lang="scss">
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

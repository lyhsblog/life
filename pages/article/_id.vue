<template>
  <div class="article-page">
    <div class="module">
      <article-content />
    </div>
    <div class="module">
      <article-mammon />
    </div>
    <div class="module">
      <article-share />
    </div>
    <div class="module">
      <article-meta />
    </div>
    <div class="releted">
      <article-related />
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
    components: {
      ArticleRelated,
      ArticleMeta,
      ArticleShare,
      ArticleMammon,
      ArticleContent
    },
    data() {
      const article = {
        fetching: true,
        data: {

        }
      }
      const relatedArticles = []

      return {
        article,
        relatedArticles
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

<template>
  <div class="article-page">
    <div class="module">
      <article-content
        :fetching="fetching"
        :article="novel"
      />
    </div>
    <div class="module">
      <article-mammon :fetching="fetching" />
    </div>
    <div class="module">
      <article-share :fetching="fetching" />
    </div>
    <div class="releted">
      <article-related
        :fetching="fetching"
        :articles="relatedNovels"
      />
    </div>
  </div>
</template>

<script>

  import ArticleContent from "../../components/article-content";
  import ArticleMammon from "../../components/article-mammon";
  import ArticleShare from "../../components/article-share";
  import ArticleRelated from "../../components/article-related";
  export default {
    name: 'NovelDetail',
    components: {
      ArticleRelated,
      ArticleShare,
      ArticleMammon,
      ArticleContent
    },

    data() {
      return {
        fetching: true,
        novel: {
          id: 1,
          ad: false,
          url: '/article/1',
          src: '/article/1.jpg',
          thumb: '/article/1.png',
          title: 'articletitle1',
          description: 'iamdesc1',
          content: ''
        },
        relatedNovels: []
      }
    },
    mounted() {
      this.fetchNovel()
    },
    methods: {
      async fetchNovel() {
        this.fetching = true
        const id = this.$route.params.id
        const res = await this.$axios.get("/novel/"+id)
        this.novel = res.data
        const relatedNovel = await this.$axios.get(`/novel/${this.novel.id}/related`)
        this.relatedNovels.push(...relatedNovel.data.content)
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

<template>
  <div class="article-page">
    <div class="module">
      <article-content
        :article="novel"
      />
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
    head() {
      return  {
        title: `${this.novel.name}-567WATCH`,
        meta: [
          { charset: 'utf-8' },
          {
            hid: 'description',
            name: 'description',
            content: this.novel.description
          }
        ],
      }
    },
    components: {
      ArticleRelated,
      ArticleShare,
      ArticleMammon,
      ArticleContent
    },

    data() {
      return {
        fetching: true,
        novel: {},
        relatedNovels: []
      }
    },
    async asyncData({ $axios, params }) {
      const id = params.id
      const novel = await $axios.$get("/novel/"+id).then(res => res)
      const regex = /(\r\n)+/ig
      novel.content = novel.content.replace(regex, "\r\n\r\n")
      return { novel }
    },
    mounted() {
      this.fetchNovel()
    },
    methods: {
      async fetchNovel() {
        this.fetching = true
        const id = this.$route.params.id
        const relatedNovel = await this.$axios.get(`/novel/${id}/related`)
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

<template>
  <div class="article-page" :class="{dark: isDark}">
    <div class="module">
      <article-content
        :article="novel"
      />
    </div>
    <div class="comment">
      <comment
        :post-id="novel.id"
        :likes="novel.tags.length"
      />
    </div>
  </div>
</template>

<script>

  import ArticleContent from "../../components/article-content";
  import ArticleMammon from "../../components/article-mammon";
  import ArticleShare from "../../components/article-share";
  import ArticleRelated from "../../components/article-related";
  import Comment from "../../components/comment";
  export default {
    name: 'NovelDetail',
    head() {
      return  {
        title: `${this.novel.name}-567.WATCH`,
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
      ArticleContent,
      Comment
    },

    data() {
      return {
        fetching: true,
        novel: {},
        relatedNovels: []
      }
    },
    computed: {
      isDark: function () {
        return this.$store.state.theme === 'dark'
      }
    },
    async asyncData({ $axios, params }) {
      const id = params.id
      const novel = await $axios.$get("/novel/"+id).then(res => res)
      const regex = /(\r\n)+/ig
      novel.content = novel.content.replace(regex, "\r\n\r\n")
      return { novel }
    },
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

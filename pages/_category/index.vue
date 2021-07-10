<template>
  <div class="article-index dark">
    <archive-list-header />
    <article-list :article-list="articleList" :params="params" :query="query" />
  </div>
</template>

<script>
import ArticleList from "../../components/article-list";
import ArchiveListHeader from "../../components/archive-header";

export default {
  name: "ArticleIndex",
  components: {
    ArticleList,
    ArchiveListHeader
  },
  head() {
    return  {
      title: `Article about ${this.params.category}-567.WATCH`,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: `Article about ${this.params.category}`
        }
      ],
    }
  },
  data() {
    return {
      articleList: {},
      params: {},
      query: {},
    }
  },
  async asyncData({$axios, params, query}) {
    const articleList = await $axios.$get('/article', {
      params: {
        ...params,
        ...query,
      }
    }).then(res => res)
    return {
      articleList,
      params,
      query,
    }
  },
}
</script>

<style lang="scss">
@import '/assets/styles/init.scss';

.article-index {
  .related {
    overflow: hidden;

    .skeleton-list {
      padding: 0;
      margin: 0;
      height: 9rem;
      overflow: hidden;
      display: flex;

      .article {
        width: 12rem;
        margin-right: 1rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .articles {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      overflow: hidden;
      margin-bottom: -$gap;

      .item {
        float: left;
        width: calc((100% - #{$gap * 2}) / 3);
        margin-right: $gap;
        margin-bottom: $gap;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &.disabled {
          pointer-events: none;
          opacity: .8;
        }

        &:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 0;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: .8;
          transition: opacity $transition-time-normal;

          .thumb {
            width: 100%;
            height: 7.4rem;
            background-color: $module-bg-darker-2;
            background-size: cover;
            background-position: 50% 40%;
            transition: background-position $transition-time-fast * 2;
          }

          .title {
            display: block;
            width: 100%;
            padding: 0 1em;
            line-height: 2.4;
            text-align: center;
            font-size: $font-size-small;
            color: $text-secondary;
            transition: color $transition-time-fast;
            @include text-overflow();
          }

          &:hover {
            opacity: 1;

            .thumb {
              background-position: 50% 50%;
            }

            .title {
              color: $link-color;
            }
          }
        }
      }
    }

    &.mobile {
      .articles {
        .item {
          width: calc((100% - #{$gap}) / 2);
          margin-right: $gap;
          margin-bottom: $gap;
          &:nth-child(2n) {
            margin-right: 0;
            margin-bottom: 0;
          }

          .thumb {
            height: 6rem;
          }
        }
      }
    }
  }
}

</style>

<template>
  <div class="article">
    <p class="title">
      <i class="iconfont icon-hotfill" />
      <strong>
        HOT_ARTICLE_LIST_TITLE
      </strong>
    </p>
    <ul class="article-list" key="list">
      <li
        v-for="item in 10"
        :key="item"
        class="item"
      >
        <span class="index"></span>
        <router-link
          class="title"
          to="/"
        >
          HOT_ARTICLE_LIST_TITLE
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import LANGUAGE_KEYS from '../language/key'
  export default {
    name: 'pc-aside-article',
    data () {
      return {
        isFetching: false,
        LANGUAGE_KEYS
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';
  @import './variables.scss';

  .article {
    overflow: hidden;

    > .title {
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      border-bottom: 1px dotted $module-bg-darker-1;
      text-transform: uppercase;

      .iconfont {
        margin-right: $sm-gap;
      }
    }

    .article-list-skeleton {
      list-style: none;
      padding: $gap;
      margin: 0;

      .item {
        height: 1em;
        margin-bottom: $gap;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .article-list {
      list-style: none;
      padding: $sm-gap 0;
      margin-bottom: 0;
      counter-reset: hot-article-list;

      .item {
        display: flex;
        align-items: center;
        height: 1.9em;
        padding: 0 $gap;
        margin-bottom: $sm-gap;
        color: $text-darker;

        &:nth-child(1) {
          .index {
            color: $text-reversal;
            background-color: $primary-translucent;
          }
        }

        &:nth-child(2) {
          .index {
            color: $text-reversal;
            background-color: rgba($accent, .6);
          }
        }

        &:nth-child(3) {
          .index {
            color: $text-reversal;
            background-color: rgba($red, .6);
          }
        }

        &:last-child {
          margin: 0;
        }

        .index {
          $size: 1.5em;
          flex-shrink: 0;
          color: $text-secondary;
          counter-increment: hot-article-list;
          background-color: $module-bg-darker-1;
          width: $size;
          height: $size;
          line-height: $size;
          display: block;
          text-align: center;
          margin-right: $sm-gap;
          font-size: $gap;
          border-radius: $xs-radius;

          &::before {
            content: counter(hot-article-list);
          }
        }

        .title {
          display: block;
          font-size: $font-size-h6;
          border-bottom: 1px solid transparent;
          @include text-overflow();

          &:hover {
            text-decoration: none;
            border-color: initial;
          }
        }
      }
    }
  }
</style>

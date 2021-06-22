<template>
  <div
    class="article-list-item"
  >
    <div
      class="item-background"
    />
    <div class="item-content">
      <div class="item-thumb">
        <NuxtLink :to="`/article/${article.id}`">
          <span
            class="item-oirigin self"
          >
            Origin
          </span>
          <img
            class="item-thumb-img"
            :src="article.cover"
            :alt="article.name">
        </NuxtLink>
      </div>
      <div class="item-body">
        <h5 class="item-title">
          <NuxtLink
            :to="`/article/${article.id}`"
          >
            {{ article.name }}
          </NuxtLink>
        </h5>
        <p
          class="item-description"
          style="-webkit-box-orient: vertical;"
          v-html="article.description || 'No description'"
        ></p>
        <div class="item-meta">
          <span class="date">
            <i class="iconfont icon-clock"></i>
            <span>a day ago</span>
          </span>
          <span class="views">
            <i class="iconfont icon-eye"></i>
            <span>{{article.clicks || 0}}</span>
          </span>
          <span class="comments">
            <i class="iconfont icon-comment"></i>
            <span>0</span>
          </span>
          <span class="likes">
            <i class="iconfont icon-heart"></i>
            <span>{{article.likes || 0}}</span>
          </span>
          <span class="tags">
            <i class="iconfont icon-tag"></i>
            <span>{{article.tags.length}}</span>
          </span>
          <span class="categories">
            <i class="iconfont icon-list"></i>
            <router-link
              to="/"
            >
              {{article.category.name || 'No category'}}
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ArticleListItem',
    props: {
      article: {
        type: Object,
        required: true,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';
  .article-list-item {
    position: relative;
    margin-bottom: $gap;
    @include radius-box($sm-radius);

    &:last-child {
      margin: 0;
    }

    .item-background {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-size: 120%;
      background-position: 0% 50%;
      opacity: .06;
    }

    > .item-content {
      $height: $gap * 11;
      $padding: $sm-gap;
      $content-height: $height - ($padding * 2);
      display: block;
      height: auto;
      padding: $sm-gap $gap;
      overflow: hidden;
      @include common-bg-module($transition-time-fast);

      &:hover {
        .item-thumb {
          .item-oirigin {
            opacity: 1;
          }

          .item-thumb-img {
            opacity: .95;
            transform: translateX(-3px);
          }
        }
      }

      > .item-thumb {
        display: none;
        float: left;
        width: 15rem;
        height: $content-height;
        overflow: hidden;
        position: relative;

        .item-oirigin {
          $height: 2.1rem;
          $opacity: .8;
          position: absolute;
          left: 0;
          top: 0;
          height: $height;
          line-height: $height;
          z-index:  $z-index-normal + 1;
          padding: 0 $sm-gap;
          opacity: .4;
          font-size: $font-size-small;
          color: $white;
          text-align: center;
          text-transform: uppercase;
          @include visibility-transition();

          &.self {
            background-color: rgba($accent, $opacity);
          }
          &.other {
            background-color: rgba($red, $opacity);
          }
          &.hybrid {
            background-color: rgba($primary, $opacity);
          }
        }

        .item-thumb-img {
          min-width: 100%;
          width: calc(100% + 3px);
          max-width: calc(100% + 3px);
          height: auto;
          min-height: $content-height;
          border-color: transparent;
          background-color: $module-bg-hover;
          opacity: 1;
          transform: translateX(0);
          transition: transform $transition-time-normal, opacity $transition-time-normal;
        }
      }

      > .item-body {
        float: right;
        width: 100%;
        height: auto;

        > .item-title {
          margin-top: 3px;
          margin-bottom: $sm-gap;
          font-weight: bold;
          color: $link-color-hover;
          @include text-overflow();

          > a {
            margin-left: 0;
            transition: margin $transition-time-normal;
            border-bottom: 1px solid transparent;
            text-decoration: none;
            &:hover {
              border-color: initial;
              margin-left: $xs-gap;
            }
          }
        }

        > .item-description {
          height: auto;
          margin: 0 0 .5em;
          line-height: 1.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: $font-size-h6;
          @include clamp(3);
        }

        > .item-meta {
          height: 2em;
          line-height: 2em;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          overflow: hidden;
          font-size: $font-size-small;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;

          > .views {
            min-width: 4rem;
          }

          > .likes {
            > .liked {
              color: $red;
            }
          }

          > .likes,
          > .comments {
            min-width: 3em;
          }

          > .date,
          > .views,
          > .comments,
          > .likes,
          > .tags,
          > .categories {
            > .iconfont {
              margin-right: $xs-gap;
            }
          }

          > .categories {
            a {
              text-transform: capitalize;
              margin-right: $sm-gap;
            }
          }

          > .tags {
            margin-right: 0;
          }
        }
      }
    }
    @media (min-width: 1024px) {
      margin-bottom: $lg-gap;
      &:last-child {
        margin: 0;
      }
      .item-background {
        display: block;
      }

      > .item-content {
        $height: $gap * 11;
        $padding: $sm-gap;
        $content-height: $height - ($padding * 2);
        display: block;
        height: $height;
        padding: $padding;

        > .item-thumb {
          display: block;
        }

        > .item-body {
          width: 32rem;
          height: $content-height;

          > .item-description {
            height: 5rem;
            margin: 0 0 $xs-gap;
          }
        }
      }
    }
  }
</style>

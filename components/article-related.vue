<template>
  <div class="related">
    <placeholder
      :loading="fetching"
      :data="!!articles.length"
    >
      <template #loading>
        <div>
          <skeleton-paragraph
            class="skeleton"
            line-height="1em"
            :lines="4"
          />
          <ul class="skeleton-list">
            <skeleton-base
              class="article"
              v-for="item in 6"
              :key="item"
            />
          </ul>
        </div>
      </template>
      <template #default>
        <ul class="articles" key="articles">
          <li
            v-for="(article, index) in articles.slice(0, 6)"
            :class="{ disabled: article.disabled }"
            :key="index"
            class="item"
          >
            <router-link
              class="item-article"
              :title="article.name"
              :to="`${article.id}`"
            >
              <div
                class="thumb"
                :style="{ backgroundImage: article.cover ? `url(${API.PROXY}/fill/176/72/ce/1/plain/${encodeURI(article.cover)}@webp)` : 'url(/images/2020-08-14-sea-1.webp)'}"
              />
              <div class="title">{{ article.name }}</div>
            </router-link>
          </li>
        </ul>
      </template>
    </placeholder>
  </div>
</template>

<script>
  import Placeholder from "./widget-placeholder";
  import SkeletonBase from "./skeleton/base";
  import SkeletonParagraph from "./skeleton/paragraph";
  import API from "../config/api.config";

  export default {
    name: 'ArticleRelated',
    props: {
      fetching: Boolean,
      articles: Array
    },
    components: {Placeholder, SkeletonBase, SkeletonParagraph},
    data() {
      return {
        API
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .related {
    overflow: hidden;

    padding: $gap;
    @include common-bg-module();
    @include radius-box($lg-radius);

    .skeleton {
      padding: $gap;
    }
    .skeleton-list {
      padding: $gap;
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
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: calc((100% - #{$gap}) / 2);
        margin-bottom: $gap;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &:last-child,&:nth-last-child(2) {
          display: none;
        }
        &.disabled {
          pointer-events: none;
          opacity: .8;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: .8;
          transition: opacity $transition-time-normal;

          .thumb {
            width: 100%;
            height: 6rem;
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

    @media (min-width: 1024px) {
      .articles {
        .item {
          width: calc((100% - #{$gap * 2}) / 3);
          &:last-child,&:nth-last-child(2) {
            display: block;
          }
          .thumb {
            height: 7.4rem;
          }
        }
      }
    }
  }
</style>

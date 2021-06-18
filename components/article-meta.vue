<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="metas-skeleton" key="skeleton" :class="{ mobile: false }">
        <skeleton-paragraph
          :align="true"
          :lines="4"
          line-height="1.2em"
        />
      </div>
    </template>
    <template #default>
      <div
        class="metas"
        key="content"
        :class="{ mobile: false }"
        v-if="article"
      >
        <p class="item">
          <i18n
            zh="本文于 "
            en="Article created at "
          />
          <router-link
            class="date-link"
            :title="getDateTitle(article.create_at)"
            :to="getDateLink(article.create_at)"
          >
            {{ getDateTitle(article.create_at) }}
          </router-link>
          发布在(in category)
          <span
            v-if="article.category"
            class="category-link"
            v-for="(category, index) in article.category"
            :key="index"
          >
            <router-link
              :to="getCategoryArchiveRoute(category.slug)"
              :title="category.description || category.name"
            >
              <i18n :zh="category.name" :en="category.slug" />
            </router-link>
            <span v-if="article.category[index + 1]">
              ,
            </span>
          </span>
          <span v-if="article.category && !article.category.length">
            未知分类下 (no catgory)
          </span>
          <span class="separator">|</span>
          <responsive>
            <template #desktop>
              当前已被围观 10000 次
            </template>
            <template #mobile>10000 views.</template>
          </responsive>
        </p>
        <p class="item" v-if="article.tag">
          <span class="title">
            <i18n
              zh="相关标签："
              en="Related tags:"
            />
          </span>
          <span
            class="tag-link"
            v-for="(tag, index) in article.tag"
            :key="index"
          >
            <router-link
              :to="getTagArchiveRoute(tag.slug)"
              :title="tag.description || tag.name"
            >
              <i18n :zh="tag.name" :en="tag.slug" />
            </router-link>
            <span v-if="article.tag[index + 1]">
              <i18n zh="、" en="," />
            </span>
          </span>
        </p>
        <p class="item">
          <span class="title">
            永久地址(Article address)：
          </span>
          <span class="site-url" @click="copyArticleUrl">
            {{ articleUrl }}
          </span>
        </p>
        <div class="item">
          <span class="title">版权声明：</span>
          <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh">
            自由转载 - 署名 - 非商业性使用
          </a>
        </div>
      </div>
    </template>
  </placeholder>
</template>

<script>
  import Placeholder from "./widget-placeholder";
  import Responsive from "./widget-responsive";
  import SkeletonParagraph from "./skeleton/paragraph";
  import { humanizeYMD } from "../transforms/moment"
  export default {
    name: 'ArticleMeta',
    props: {
      article: Object,
      fetching: Boolean
    },
    components: {Placeholder, SkeletonParagraph, Responsive},
    methods: {
      getDateTitle (date) {
        return humanizeYMD(date, 'zh')
      },
      getDateLink(date) {
        return 'datalink'
      },
      getCategoryArchiveRoute(cate) {
        return 'Categorylink'
      },
      getTagArchiveRoute(tag) {
        return 'tagroute'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .metas,
  .metas-skeleton {
    padding: $gap;
  }

  .metas {
    .item {
      margin-bottom: $lg-gap;
      line-height: 1.4em;
      word-break: break-all;
      padding-left: $gap;
      border-left: 6px solid $module-bg-darker-1;

      &:last-child {
        margin: 0;
      }

      a {
        border-bottom: 1px solid transparent;
        &:hover {
          text-decoration: none;
          border-color: initial;
        }
      }

      .date-link,
      .tag-link {
        margin-right: $sm-gap / 2;
      }

      .separator {
        margin: 0 $sm-gap;
      }

      .date-link {
        text-transform: uppercase;
      }

      .category-link,
      .tag-link {
        text-transform: capitalize;
      }

      .title {
        margin-right: $sm-gap;
      }

      .site-url {
        border-bottom: 1px solid;
        cursor: pointer;
        color: $link-color;
        &:hover {
          color: $link-color-hover;
        }
      }
    }

    &.mobile {
      .item {
        line-height: 2.3em;
        margin: 0;
        padding: 0;
        border: none;

        > .title.en {
          width: auto;
          margin-right: $gap;
        }
      }
    }
  }
</style>

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
          Article created at
          <router-link
            class="date-link"
            :title="getDateTitle(article.createTime)"
            :to="getDateLink(article.createTime)"
          >
            {{ getDateTitle(article.createTime) }}
          </router-link>
          发布在:
          <span>
            未知分类下
          </span>
          <span class="separator">|</span>
          <responsive>
            <template #desktop>
              当前已被围观 {{article.clicks}} 次
            </template>
            <template #mobile>{{article.clicks}} views.</template>
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
            永久地址：
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
    data() {
      return {
        articleUrl: ''
      }
    },
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
      },
      copyArticleUrl() {
        return "#"
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

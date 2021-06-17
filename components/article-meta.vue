<template>
  <div
    class="metas"
    key="content"
  >
    <p class="item">
      <i18n
        zh="本文于 "
        en="Article created at "
      />
      <router-link
        class="date-link"
        title="title"
        to="/"
      >
        data title
      </router-link>
      <i18n
        zh="发布在 "
        en="in category "
      />
      <span
        class="category-link"
      >
        <router-link
          to="/"
          title="catedesc"
        >
          catename
        </router-link>
        <span>
          ,
        </span>
      </span>
      <span>
        catename
      </span>
      <span class="separator">|</span>
      views
    </p>
    <p class="item">
          <span class="title">
            tagname
          </span>
      <span
        class="tag-link"
      >
            <router-link
              to="/"
              title="title"
            >
              tagname
            </router-link>
            <span>
              tagname
            </span>
          </span>
    </p>
    <p class="item">
      <span class="title">
        Article address:
      </span>
      <span class="site-url" @click="copyArticleUrl">
        articleUrl
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

<script>
  export default {
    name: 'ArticleMeta',
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

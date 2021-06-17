<template>
  <div v-if="isArticlePage" class="tools">
    <button class="full-column">
      {{LANGUAGE_KEYS.ARTICLE_FULL_COL_READ}}
      <i class="iconfont icon-read" />
    </button>
    <button class="full-page">
      {{LANGUAGE_KEYS.ARTICLE_FULL_SCREEN_READ}}
      <i class="iconfont icon-fullscreen" />
    </button>
  </div>
</template>

<script>
  import LANGUAGE_KEYS from "../language/key";

  export default {
    name: 'PcAsideTool',
    data() {
      return {
        isArticlePage: true,
        LANGUAGE_KEYS,
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';
  @import './variables.scss';

  .tools {
    display: flex;
    justify-content: space-between;

    > .full-column {
      margin-right: $sm-gap;
    }

    > .full-page {
      margin-left: $sm-gap;
    }

    > .full-column,
    > .full-page {
      display: inline-block;
      flex-grow: 1;
      height: $tool-height;
      line-height: $tool-height;
      text-align: center;
      @include radius-box($xs-radius);
      @include common-bg-module();

      .iconfont {
        margin-left: $gap;
      }
    }
  }
</style>

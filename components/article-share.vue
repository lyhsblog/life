<template>
  <div class="share-module">
    <placeholder :loading="fetching">
      <template #loading>
        <div class="skeleton">
          <skeleton-base
            v-for="item in skeletonCount"
            :key="item"
            :radius="0"
            :style="{
              width: `calc((100% - (1em * ${skeletonCount - 1})) / ${skeletonCount})`
            }"
          />
        </div>
      </template>
      <template #default>
        <share class="article-share" />
      </template>
    </placeholder>
  </div>
</template>

<script>
  import Share from "./widget-share";
  import Placeholder from "./widget-placeholder";
  import SkeletonBase from "./skeleton/base";
  export default {
    name: 'ArticleShare',
    props: {
      fetching: Boolean
    },
    components: {
      Share, Placeholder, SkeletonBase,
    },
    data() {
      return {
        skeletonCount: 5
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .share-module {
    padding: $gap;

    > .skeleton {
      display: flex;
      justify-content: space-between;
      height: 3rem;
    }

    > .article-share {
      width: 100%;
      opacity: .6;
      display: flex;
      justify-content: space-between;

      &:hover {
        opacity: 1;
      }

      ::v-deep .share-ejector {
        flex-grow: 1;
        width: auto;
        height: 3rem;
        line-height: 3rem;
        margin-right: $gap;
        font-size: $font-size-h4;
        border-radius: $xs-radius;
        background-color: $module-bg-darker-1;

        &:last-child {
          margin-right: 0;
        }
      }

      &.mobile {
        ::v-deep .share-ejector {
          width: auto;
          display: none;
          flex-grow: 0;

          &[class*='wechat'],
          &[class*='weibo'],
          &[class*='twitter'] {
            display: inline-block;
            flex-grow: 1;
          }
          &[class*='twitter'] {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>

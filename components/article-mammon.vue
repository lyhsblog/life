<template>
  <div class="mammon">
    <placeholder :loading="fetching">
      <template #loading>
        <skeleton-paragraph
          key="skeleton"
          class="skeleton"
          line-height="1em"
          :lines="4"
        />
      </template>
      <template #default>
        <adsense-responsive
          key="adsense"
          class="mammon-box"
          ins-class="mammon-ins"
        />
      </template>
    </placeholder>
  </div>
</template>

<script>
  import AdsenseResponsive from "./adsense-responsive.vue";
  import Placeholder from "./widget-placeholder";
  import SkeletonLine from "./skeleton/line";
  import SkeletonParagraph from "./skeleton/paragraph";
  export default {
    name: 'ArticleMammon',
    props: {
      fetching: Boolean
    },
    components: {
      AdsenseResponsive, Placeholder, SkeletonLine, SkeletonParagraph
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .mammon {
    padding: $gap;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .mammon-box,
    ::v-deep(.mammon-ins) {
      width: 100%;
      height: 16rem;
      min-height: 16rem;
    }

    .skeleton {
      width: 100%;
    }
  }
</style>



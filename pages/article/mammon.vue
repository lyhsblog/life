<template>
  <div class="mammon">
    <adsense-responsive
      key="adsense"
      class="mammon-box"
      ins-class="mammon-ins"
    />
  </div>
</template>

<script>
  import AdsenseResponsive from "../../components/adsense-responsive.vue";
  export default {
    name: 'ArticleMammon',
    components: {
      AdsenseResponsive
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



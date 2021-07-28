<template>
  <div id="pc-right" ref="element">
    <div class="module">
      <pc-aside-search />
    </div>
    <div class="module">
      <pc-aside-article />
    </div>
<!--    <div class="module mammon">-->
<!--      <pc-aside-mammon dynamic-swiper-name="ad1" />-->
<!--    </div>-->
    <div class="module calendar">
      <pc-aside-calendar />
    </div>
<!--    <div-->
<!--      class="module ali-ma-ma"-->
<!--      :placeholder="t(LANGUAGE_KEYS.AD)"-->
<!--    >-->
<!--      <div style="height: 100%; display: flex; justify-content: center; align-items: center">-->
<!--        <span style="font-size: 50px">AD BIG</span>-->
<!--      </div>-->
<!--    </div>-->
    <div :id="ASIDE_STICKY_ELEMENT_ID" class="aside-sticky-box">
<!--      <client-only>-->
<!--        <div class="module mammon">-->
<!--          <pc-aside-mammon dynamic-swiper-name="ad2" />-->
<!--        </div>-->
<!--      </client-only>-->
      <div class="module">
        <pc-aside-tag />
      </div>
<!--      <pc-aside-tool />-->
    </div>
  </div>
</template>

<script>
  import PcAsideCalendar from "./layout-calendar";
  import LANGUAGE_KEYS from '../language/key'
  import PcAsideArticle from "./layout-pc-right-article";
  import PcAsideSearch from "./layout-pc-right-search";
  import PcAsideMammon from "./layout-pc-right-mammon";
  import PcAsideTag from "./layout-pc-right-tag";
  import PcAsideTool from "./layout-pc-right-tool";

  const ASIDE_STICKY_ELEMENT_ID = 'aside-sticky-module'

  export default {
    name: 'pc-right',
    components: {
      PcAsideTool,
      PcAsideTag,
      PcAsideCalendar,
      PcAsideMammon,
      PcAsideSearch,
      PcAsideArticle
    },
    data () {
      return {
        LANGUAGE_KEYS,
        ASIDE_STICKY_ELEMENT_ID,
        t: (key) => {
          return LANGUAGE_KEYS[key]
        },
        // adIndex,
        // renderStickyAd,
        // element,
        // canPushRouteWithDay,
        // getDateRoute,
        // handleStandingAdSwiperReady,
        // handleStandingAdSlideChange,
        // handleStickyAdIndexChange,
        // handleStickyStateChange
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';
  @import './variables.scss';

  #pc-right {
    display: block;
    width: $aside-width;
    margin: 0;
    margin-left: $lg-gap;

    .module {
      margin-bottom: $lg-gap;
      @include radius-box($sm-radius);
      @include common-bg-module();

      &.calendar {
        padding: $gap;

        .date-link {
          display: block;
          border-radius: 100%;

          &.link-active {
            background-color: $primary;
            color: $text-reversal;
          }
        }
      }

      &.mammon {
        width: 100%;
      }

      &.ali-ma-ma {
        @extend .center-placeholder;
        height: $aside-width;
        display: flex;
        justify-content: center;
        align-items: center;

        .iframe {
          height: 250px;
          width: 250px;
          overflow: hidden;
        }
      }

      &.tools {
        margin-top: $lg-gap;
      }
    }

    .aside-sticky-box {
      position: sticky;
      top: $top-height;
      width: $aside-width;
    }
  }
</style>

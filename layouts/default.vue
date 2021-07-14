<template>
  <div id="app-root" :class="{
      dark: isDark,
      default: !isDark,
    }">
    <div class="captured">
      <div class="layout">
        <!-- mobile -->
        <div id="aside" :class="openedAsideClass">
          <layout-mobile-nav />
        </div>
        <!-- mobile -->

        <background />
        <language />
        <theme />
        <share class="main-share" />
        <wallpaper />
        <toolbox />
        <layout-pc-header />
        <main
          id="main"
          :class="{ 'full-page': layoutColumn.isFullPage, 'open': openedAsideClass }"
          style="min-height: 100vh"
        >
          <!-- mobile -->

          <div
            v-if="isOpenedSidebar"
            class="close-mask"
            @click="closeMobileSidebar"
          />
          <layout-mobile-header />

          <!-- mobile -->

          <layout-pc-nav v-if="layoutColumn.isNormal || layoutColumn.isWide" />
          <div
            id="main-content"
            :class="{
              'layout-normal': layoutColumn.isNormal,
              'layout-wide': layoutColumn.isWide,
              'layout-full-column': layoutColumn.isFullColumn,
              'layout-full-page': layoutColumn.isFullPage,
            }"
          >
            <Nuxt />
          </div>
          <layout-pc-right v-if="$device.isDesktopOrTablet" />
        </main>
        <pc-footer />
      </div>
    </div>
  </div>
</template>
<script>
  import Background from "../components/widget-background";
  import Language from "../components/widget-language";
  import Theme from "../components/widget-theme";
  import Share from "../components/widget-share";
  import Wallpaper from "../components/widget-wallpaper-main";
  import Toolbox from "../components/widget-toolbox";
  import PcFooter from "./layout-pc-footer";
  import LayoutMobileNav from "./layout-mobile-nav";
  import LayoutPcRight from "./layout-pc-right-index";
  import LayoutPcNav from "./layout-pc-nav";
  import LayoutMobileHeader from "./layout-mobile-header";
  import LayoutPcHeader from "./layout-pc-header";
  export default {
    components: {
      LayoutPcHeader,
      LayoutMobileHeader,
      LayoutPcNav,
      LayoutPcRight,
      LayoutMobileNav,
      PcFooter, Toolbox, Wallpaper, Share, Theme, Language, Background},
    data () {
      const closeMobileSidebar = () => this.$store.commit("changeSlideOpened", false)
      return {
        layoutColumn: {
          isFullPage: false,
          isFullColumn: false,
          isNormal: true,
          isWide: true,
        },
        closeMobileSidebar,
      }
    },
    computed: {
      openedAsideClass: function () {
        return this.isOpenedSidebar ? 'open': ''
      },
      isOpenedSidebar: function () {
        return this.slideOpened
      },
      slideOpened: function () {
        return this.$store.state.slideOpened
      },
      isDark: function () {
        return this.$store.state.theme === 'dark'
      }
    },
  }
</script>
<style lang="scss" scoped>
@import '/assets/styles/init.scss';

@media (min-width: 320px) {
  .layout {
    color: $text;
    background-color: $module-bg-hover;
    $aside-width: 68%;

    #aside {
      width: $aside-width;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      background-color: $mobile-aside-bg;
      transform: translate3d(-100%, 0 ,0);
      transition: $mobile-aside-transition;

      &.open {
        overflow: hidden;
        transform: translate3d(0, 0 ,0);
        -webkit-overflow-scrolling: touch;
      }
    }

    //615add
    //#background {
    //  display: none;
    //}

    #language {
      display: none;
    }
    #theme {
      display: none;
    }
    #share {
      display: none;
    }
    #wallpaper {
      display: none;
    }

    #toolbox {
      display: none;
    }

    #pc-header {
      display: none;
    }

    #pc-right {
      display: none;
    }

    #footer {
      display: none;
    }

    //615add

    #main {
      transition: $mobile-aside-transition;

      .close-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        right: 0;
        bottom: 0;
        z-index: $z-index-top;
        background-color: $module-bg-translucent;
        @include backdrop-blur(3px);
      }
      &.open {
        transform: translate3d($aside-width, 0 ,0);
      }

      #main-content {
        min-height: 100vh;
        position: relative;
        overflow: hidden;
        width: 100%;
        margin: 0;
        padding: ($mobile-header-height + $lg-gap) $gap $gap;
        transition: width .35s;
      }

      #pc-nav {
        display: none;
      }
    }
  }
}

@media (min-width: 1024px) {
  .layout {
    padding-top: $header-height + $lg-gap;
    background: none;
    @media screen and (max-width: 1200px) {
      #theme,
      #language,
      .main-share {
        display: none !important;
      }
    }

    //615add
    #aside {
      display: none;
    }

    #background {
      display: block;
    }

    #language {
      display: block;
    }
    #theme {
      display: block;
    }
    #share {
      display: block;
    }
    #wallpaper {
      display: block;
    }

    #toolbox {
      display: block;
    }

    #pc-header {
      display: block;
    }

    #pc-right {
      display: block;
    }

    #footer {
      display: inline-flex;
    }

    #header {
      display: none;
    }
    //615add

    #share {
      position: fixed;
      top: 12%;
      left: 0;
      height: auto;
      max-width: 4rem;
      display: flex;
      flex-direction: column;
      opacity: 0.4;

      &:hover {
        opacity: 1;
      }

      ::v-deep .share-ejector {
        $height: 2.1em;
        width: 3rem;
        height: $height;
        line-height: $height;
        font-size: $font-size-h4;
        border-top-right-radius: $xs-radius;
        border-bottom-right-radius: $xs-radius;
        transition: width $transition-time-fast;

        &.renren,
        &.evernote,
        &.linkedin,
        &.mail {
          display: none;
        }

        &:hover {
          width: 120%;
        }
      }
    }
    #main {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: $container-width;

      //615add
      &.open {
        transform: none;
      }
      .close-mask {
        display: none;
      }

      #pc-nav {
        display: block;
      }
      //615add

      &.full-page {
        width: 100%;
      }

      #main-content {
        padding: 0;
        width: $main-width;
        position: relative;
        overflow: hidden;
        transition: none;
        //615add
        transform: translate3d(0%,0,0) !important;
        //615add
        &:-moz-full-screen {
          overflow-y: auto;
        }

        &:-webkit-full-screen {
          overflow-y: auto;
        }

        &:fullscreen {
          overflow-y: auto;
        }

        &.layout-normal {
          flex-grow: 1;
        }

        &.layout-wide {
          flex-grow: 1;
        }

        &.layout-full-column {
          width: 100%;
          margin: 0;
        }

        &.layout-full-page {
          width: 100%;
          margin: -$lg-gap 0;
        }
      }
    }
  }
}
</style>

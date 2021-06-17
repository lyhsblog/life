<template>
  <div id="wallpaper" :class="{ dark: isDark }">
    <div class="switcher">
      <div class="up">
        <span class="title" :class="language">
          title
        </span>
      </div>
      <div class="down"></div>
    </div>
  </div>
<!--  <client-only>-->
<!--    <popup :visible="isOnWallpaper">-->
<!--      <wallpapers />-->
<!--    </popup>-->
<!--  </client-only>-->
</template>

<script>
  import Wallpapers from './widget-wallpaper-wall.vue'
  import LANGUAGE_KEYS from '../language/key'
  export default {
    name: 'Wallpaper',
    components: {
      Wallpapers
    },
    data () {

      const toggleWallpaper = () => {

      }
      return {
        LANGUAGE_KEYS,
        language: 'zh',
        isDarkTheme: false,
        isOnWallpaper: false,
        toggleWallpaper
      }
    },
    computed: {
      isDark: function () {
        return this.$store.state.theme === 'dark'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  #wallpaper {
    position: fixed;
    left: 0;
    top: 70%;
    cursor: pointer;
    $offset: 6px;

    &.dark {
      .switcher {
        .up {
          .title {
            color: $text-reversal;
          }
        }
      }
    }

    .switcher {
      width: 4rem;
      height: 8rem;
      opacity: .6;
      display: block;
      position: relative;
      transform: translateX(-$offset * 2);
      transition: opacity $transition-time-fast, transform $transition-time-fast;

      &:hover {
        opacity: .8;
        transform: translateX(-$offset);
      }

      @keyframes wallpaper-y {
        0% { transform: translateY(-$offset) }
        50% { transform: translateY($offset) }
        100% { transform: translateY(-$offset) }
      }

      > .up,
      > .down {
        width: 3rem;
        height: 6.8rem;
        position: absolute;
        border-top-right-radius: $xs-radius;
        border-bottom-right-radius: $xs-radius;
      }

      .down {
        top: 0;
        left: $offset;
        z-index: $z-index-normal + 1;
        background-color: $primary;
        animation: wallpaper-y 1.5s .75s infinite;
      }

      .up {
        top: 0;
        left: 0;
        z-index: $z-index-normal + 2;
        background-color: $yellow;
        animation: wallpaper-y 1.5s 0s infinite;

        .title {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 2rem;
          font-family: 'webfont-bolder', DINRegular;
          writing-mode: tb-rl;
          color: $primary;

          &.zh {
            letter-spacing: -2.5px;
          }

          &.en {
            text-align: center;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-size: $font-size-small;
          }
        }
      }
    }
  }
</style>

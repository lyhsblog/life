<template>
  <header id="pc-header">
    <div class="header-container container">
      <div class="header-header">
        <img src="~/static/images/logo.svg" class="header-logo" data-not-lazy />
        <span class="header-slogan">
          Because the mountain was there
        </span>
        <router-link to="/" class="header-link" />
      </div>
      <client-only transition>
        <div class="header-player">
          <div class="panel">
            <button
              class="prev-song button"
            >
              <i class="iconfont icon-music-prev"></i>
            </button>
            <button
              class="toggle-play button"
            >
              <i
                class="iconfont"
                :class="'icon-music-play'"
              ></i>
            </button>
            <button
              class="next-song button"
            >
              <i class="iconfont icon-music-next"></i>
            </button>
            <button
              class="muted-toggle button"
            >
              <i
                class="iconfont"
                :class="'icon-music-volume'"
              ></i>
            </button>
          </div>
          <div class="song">
            <router-link
              class="link"
              to="/"
            >
              <span>XXXFFSDF</span>
            </router-link>
          </div>
          <div class="song">
            xxxxxx
          </div>
        </div>
      </client-only>
    </div>
  </header>
</template>

<script>

  export default {
    name: 'layout-pc-header',
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  #pc-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    z-index: $z-index-header;
    background-color: $module-bg;
    @include backdrop-blur();

    .header-container {
      height: 100%;
      display: flex;
      justify-content: space-between;

      .header-header {
        height: 100%;
        display: flex;
        position: relative;
        align-items: center;
        padding-left: $sm-gap;
        width: 29em;
        overflow: hidden;

        @keyframes logo-blink {
          0% { mask-position: -30% }
          100% { mask-position: 666% }
        }

        .header-logo {
          width: 11rem;
          margin-right: $gap * 4;
          filter: $theme-logo-rotate;
          /* mask-size: 88%;
          mask-position: -30%;
          mask-image: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.2)
          );
          animation: logo-blink 8s ease-in 1s infinite; */

          .logo-st {
            fill: $primary;
          }
        }

        .header-slogan {
          color: $primary;
          font-family: 'webfont-normal', DINRegular;
        }

        .header-link {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      .header-player {
        width: 14rem;
        display: flex;
        flex-direction: column;
        align-items: inherit;
        justify-content: center;
        opacity: .3;
        @include text-overflow();
        @include visibility-transition();

        &:hover {
          opacity: 1;
        }

        > .panel {
          display: flex;
          justify-content: flex-start;
          margin-bottom: $xs-gap;

          > .button {
            margin-right: $lg-gap;

            &:hover {
              .iconfont {
                color: $link-color-hover;
              }
            }
          }
        }

        > .song {
          font-size: $font-size-small;
          @include text-overflow();

          > .link {
            color: $text-dividers;
            @include color-transition();

            &:hover {
              color: $link-color-hover;
            }
          }
        }

        .iconfont {
          color: $text-dividers;
          @include color-transition();
        }
      }
    }

    > .pre-load {
      width: 0;
      height: 0;
      @include hidden();
    }
  }
</style>

<template>
  <div
    class="announcement"
    :class="{
      mobile: false,
      dark: isDark
    }"
  >
    <div class="warpper" key="warpper">
      <div
        class="background"
        :data-content="announcements[0].content"
      />
      <div class="title">
            <span
              class="icon-box"
              :style="{ transform: `rotate(-${activeIndex * 90}deg)` }"
            >
              <i class="iconfont icon-windmill" />
            </span>
      </div>
      <div class="swiper-box">
        <div v-swiper="swiperOption" class="swiper" @transition-start="handleSwiperTransitionStart">
          <div class="swiper-wrapper">
            <div class="swiper-slide" :key="an.content" v-for="an in announcements">
              <div class="content" v-html="1111111" />
              <div class="date">2021/06/10</div>
            </div>
          </div>
        </div>
        <div class="navigation">
          <div
            class="button prev"
            :class="{ disabled: activeIndex === 0 }"
            @click="prevSlide"
          >
            <i class="iconfont icon-announcement-prev" />
          </div>
          <div
            class="button next"
            :class="{ disabled: activeIndex === announcements.length - 1 }"
            @click="nextSlide"
          >
            <i class="iconfont icon-announcement-next" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LANGUAGE_KEYS from "../language/key";
  import { directive } from "vue-awesome-swiper";

  export default {
    name: 'ArchiveAnnouncement',
    directives: {
      swiper: directive,
    },
    props: {
      announcements: {
        type: Array,
        required: true
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    data() {
      const swiperOption = {
        height: 42,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        allowTouchMove: false,
        slidesPerView: 1,
        setWrapperSize: true,
        direction: 'vertical',
      }

      const prevSlide = () => this.$swiper.slidePrev()
      const nextSlide = () => this.$swiper.slideNext()
      const handleSwiperTransitionStart = () => this.activeIndex = this.$swiper.activeIndex || 0

      return {
        LANGUAGE_KEYS,
        swiperOption,
        activeIndex: 0,
        prevSlide,
        nextSlide,
        handleSwiperTransitionStart
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

  $announcement-height: 42px;
  $title-width: 10%;
  $content-width: 100% - $title-width;
  $demarcation-width: 74%;

  .announcement {
    position: relative;
    margin-bottom: $lg-gap;
    height: $announcement-height;
    line-height: $announcement-height;
    font-size: $font-size-h6;
    color: $text-secondary;
    @include common-bg-module();
    @include radius-box($xs-radius);

    .announcement-empty {
      height: 100%;
      min-height: auto;
    }

    .announcement-skeleton {
      display: flex;
      width: 100%;
      height: 100%;
      padding: $sm-gap;

      .left {
        width: 68%;
        margin-right: $gap;
      }
      .right {
        flex: 1;
      }
    }

    &.mobile {
      margin-bottom: $gap;
      .swiper-box {
        .swiper {
          .swiper-slide {
            .content {
              max-width: 100%;
            }
          }
        }
      }
    }

    &.dark {
      .background {
        &::after {
          background: $module-bg-darker-1;
        }
      }
    }

    .background {
      position: absolute;
      width: $demarcation-width;
      height: 100%;
      background: linear-gradient(
        66deg,
        $module-bg-opaque,
        $module-bg-lighter
        66%
      );

      &::before {
        content: attr(data-content);
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 6em;
        font-weight: bold;
        direction: rtl;
        opacity: .2;
        z-index: -1;
        @include text-overflow(clip);
      }

      &::after {
        $size: 1rem;
        content: '';
        display: block;
        position: absolute;
        width: $size;
        height: 200%;
        top: -50%;
        right: -($size / 2);
        background: $body-bg;
        transform: rotate(18deg);
      }
    }

    .title {
      float: left;
      width: $title-width;
      text-align: center;
      font-size: $font-size-base;

      .icon-box {
        display: inline-block;
        transform: rotate(0deg);
        transition: transform .3s;
      }
    }

    .swiper-box {
      float: right;
      display: flex;
      width: $content-width;

      .swiper {
        flex: 1;
        height: $announcement-height;

        .swiper-wrapper {
          flex-direction: column;
          // Filter for slide when transitioning
          &[style*="300ms"] {
            .swiper-slide-active {
              .content {
                @include blur-filter('vertical-small');
              }
            }
          }
        }

        .swiper-slide {
          width: auto;
          display: flex;
          justify-content: space-between;
          height: $announcement-height;

          .content {
            max-width: 76%;
            position: relative;
            font-weight: bold;
            @include text-overflow();

            ::v-deep(p) {
              margin: 0;
              max-width: 100%;
              @include text-overflow();
            }

            a {
              border-bottom: 1px solid;
            }
          }

          .date {
            color: $text-dividers;
            margin-right: $xs-gap;
          }
        }
      }

      .navigation {
        display: flex;
        flex-direction: column;
        width: 3rem;
        height: $announcement-height;

        .button {
          height: 50%;
          text-align: center;
          color: $text-dividers;
          cursor: pointer;
          @include color-transition();

          &:hover {
            color: $text;
          }

          &.disabled {
            opacity: .8;
            color: $text-dividers;
            cursor: no-drop;
          }

          &.prev {
            line-height: 2;
          }

          &.next {
            line-height: 1.4;
          }
        }
      }
    }
  }
</style>

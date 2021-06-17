<template>
  <div id="toolbox">
    <div class="container">
      <div class="tools">
        <a
          class="rss"
          :href="VALUABLE_LINKS.RSS"
          @mousedown="handleRSS"
        >
          <i class="iconfont icon-rss" />
        </a>
        <button
          class="barrage"
          :title="t(LANGUAGE_KEYS.BARRAGE)"
          :class="{ active: isOnBarrage }"
          @click="toggleBarrage"
        >
          <i class="iconfont icon-barrage" />
        </button>
        <a class="feedback" :href="mailUrl" :title="t(LANGUAGE_KEYS.FEEDBACK)">
          <i class="iconfont icon-mail" />
        </a>
        <button
          class="to-page-top"
          :title="t(LANGUAGE_KEYS.TO_TOP)"
          @click="scrollToTop"
          @mouseover="setTopButtonState(true, true)"
          @mouseleave="setTopButtonState(false)"
        >
          <i class="iconfont icon-totop" />
        </button>
        <button
          class="to-page-bottom"
          :title="t(LANGUAGE_KEYS.TO_BOTTOM)"
          @click="toBottom"
          @mouseover="setBottomButtonState(true, true)"
          @mouseleave="setBottomButtonState(false)"
        >
          <i class="iconfont icon-tobottom" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import LANGUAGE_KEYS from '../language/key'
  import LINKS from '../config/links'
  import { scrollToTop } from '../utils/effects'
  import { scrollTo, Easing } from '../utils/scroller'
  export default {
    name: 'Toolbox',
    mounted() {
      this
    },
    data () {
      const isOnBarrage = this.$store.state.barraging
      let animationFrameId = 0;
      let isTopButtonMouseOver = false
      let isBottomButtonMouseOver = false

      const slowMoveToAnyWhere = () => {
        const step = () => {
          let targetScrollY = window.scrollY
          const currentScrollY = document.body.scrollHeight - window.innerHeight
          if (isBottomButtonMouseOver) {
            targetScrollY += 1
          }
          if (isTopButtonMouseOver) {
            targetScrollY -= 1
          }
          if (targetScrollY < 0) {
            targetScrollY = 0
          } else if (targetScrollY >= currentScrollY) {
            targetScrollY = currentScrollY
          }
          const canScrollTo = targetScrollY > 0 && targetScrollY < currentScrollY
          if (!canScrollTo) {
            return false
          }
          window.scrollTo(0, targetScrollY)
          if (isBottomButtonMouseOver || isTopButtonMouseOver) {
            animationFrameId = window.requestAnimationFrame(step)
          } else {
            window.cancelAnimationFrame(animationFrameId)
            return false
          }
        }
        animationFrameId = window.requestAnimationFrame(step)
      }

      let toggleBarrage = () => {
        this.$store.commit('changeBarraging', !isOnBarrage)
      }
      return {
        VALUABLE_LINKS: LINKS,
        LANGUAGE_KEYS,
        t: (key) => {
          return LANGUAGE_KEYS[key]
        },
        mailUrl: `mailto:xxx@xx.com`,
        isOnBarrage,
        scrollToTop: scrollToTop,
        toBottom() {
          scrollTo(
            window.scrollY + window.innerHeight,
            300,
            { easing: Easing.easeIn }
          )
        },
        setTopButtonState(state, isStartSlow = false) {
          isTopButtonMouseOver = state
          window.cancelAnimationFrame(animationFrameId)
          isStartSlow && slowMoveToAnyWhere()
        },
        setBottomButtonState(state, isStartSlow = false) {
          isBottomButtonMouseOver = state
          window.cancelAnimationFrame(animationFrameId)
          isStartSlow && slowMoveToAnyWhere()
        },
        handleRSS() {
        },
        toggleBarrage
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  #toolbox {
    position: fixed;
    z-index: $z-index-toolbox;
    width: 100%;
    bottom: 30rem;

    > .container {
      $size: $lg-gap * 2.8;
      position: relative;

      > .tools {
        position: absolute;
        right: -12rem;
        width: $size;
        overflow: hidden;

        &:first-child {
          border-top-left-radius: $xs-radius;
          border-top-right-radius: $xs-radius;
        }
        &:last-child {
          border-bottom-left-radius: $xs-radius;
          border-bottom-right-radius: $xs-radius;
        }

        > .rss,
        > .webcam,
        > .barrage,
        > .to-page-top,
        > .to-page-bottom,
        > .feedback {
          display: block;
          width: $size;
          height: $size;
          line-height: $size;
          text-align: center;
          @include common-bg-module($transition-time-fast);
        }

        @keyframes default-btn-bg {
          0% {
            color: $white;
            background: $accent;
          }
          20% {
            color: $white;
            background: $red;
          }
          40% {
            color: $white;
            background: $primary;
          }
          60% {
            color: $text;
            background: $yellow;
          }
          80% {
            color: $text;
            background: $white;
          }
          100% {
            color: $white;
            background: $black;
          }
        }

        > .rss {
          color: $rss-primary;

          &:hover {
            background-color: $rss-primary;
            color: $white;
          }
        }

        > .barrage {
          color: $text-reversal;
          animation: default-btn-bg 8s infinite;
          &.active {
            background-color: $module-bg-hover;
            animation: default-btn-bg steps(1) 1.666s infinite;
          }

          &.close {
            color: $link-color;
            animation: none;
          }
        }

        > .to-page-bottom {
          height: $size * 0.6;
          line-height: $size * 0.6;
        }
      }
    }
  }
</style>

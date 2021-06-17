<template>
  <div id="pc-nav">
    <nav class="nav-list" :class="{ en: !isZhLang }">
      <router-link to="/" class="item link-active router-link-exact-active" exact>
        <i class="iconfont icon-home"></i>
        <span class="text">HOME</span>
      </router-link>
      <router-link class="item" to="/article">
        <i class="iconfont icon-thinking"></i>
        <span class="text">
          CODE
        </span>
      </router-link>
      <router-link class="item" to="/video">
        <i class="iconfont icon-lens"></i>
        <span class="text">
          ME
        </span>
      </router-link>
      <router-link class="item" to="/article">
        <i class="iconfont icon-thinking"></i>
        <span class="text">
          LIFE
        </span>
      </router-link>
      <router-link class="item" to="/article">
        <i class="iconfont icon-thinking"></i>
        <span class="text">
          NEWS
        </span>
      </router-link>
      <router-link class="item" to="/video">
        <i class="iconfont icon-lens"></i>
        <span class="text">
          VLOG
        </span>
      </router-link>
      <router-link class="item" to="/manga">
        <i class="iconfont icon-thinking"></i>
        <span class="text">
          MANGA
        </span>
      </router-link>
      <router-link class="item" to="/manga">
        <i class="iconfont icon-thinking"></i>
        <span class="text">
          VIDEO
        </span>
      </router-link>
      <div v-for="(ad, index) in ads" :key="index">
        <span class="separator"></span>
        <a class="item" :href="ad.url">
          <i
            class="iconfont"
            :class="ad.icon"
            :style="{ color: ad.color }"
          ></i>
          <span class="text" :style="{ color: ad.color }">
            <template v-if="ad.i18n">
              {{ ad.text }}
            </template>
            <template v-else>
              {{ ad.text }}
            </template>
          </span>
          <span class="superscript" v-if="ad.hot">
            <i class="iconfont icon-hot"></i>
          </span>
        </a>
      </div>
      <span class="separator"></span>
      <router-link class="item app" to="/">
        <i class="iconfont icon-app"></i>
        <span class="text">
          APP
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  import VALUABLE_LINKS from '../config/links'
  import LANGUAGE_KEYS from '../language/key'
  export default {
    name: 'layout-pc-nav',
    data () {
      return {
        ads: [
          {
            url: '',
            icon: 'icon-aliyun',
            color: '#ff6a00',
            i18n: {
              zh: 'zh',
              en: 'en',
            },
            text: 'ALIYUN',
            hot: true
          },
          {
            url: '',
            icon: 'icon-jingdong',
            color: '#e1251b',
            i18n: {
              zh: 'zh',
              en: 'en',
            },
            text: 'JD',
            hot: true
          }
        ],
        VALUABLE_LINKS,
        LANGUAGE_KEYS,
        isZhLang: false,
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  #pc-nav {
    width: $navbar-width;
    height: auto;
    margin-right: $lg-gap;

    .nav-list {
      width: $navbar-width;
      padding: 0;
      margin: 0;
      position: fixed;

      &.en {
        .item {
          .text {
            font-size: $font-size-h6;
          }
        }
      }

      .item {
        display: block;
        position: relative;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 $lg-gap;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        color: $text-secondary;
        font-family: 'webfont-normal', DINRegular;
        letter-spacing: 0.5px;
        margin-bottom: $sm-gap;
        will-change: background-color;
        transition: background-color $transition-time-fast * 0.6;
        @include radius-box($sm-radius);

        &:hover {
          color: $primary-lighter;
          background-color: $module-bg-translucent;
        }

        > .superscript {
          margin-left: $sm-gap;

          .iconfont {
            margin-right: 0;
            color: $red;
          }
        }

        &.app {
          color: $primary;
          > .iconfont {
            color: $primary;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }

        &.link-active {
          color: $primary;
          background-color: $module-bg-lighter;

          &.guestbook {
            background: linear-gradient(
                to bottom,
                $module-bg-lighter,
                transparent
            );
          }
        }

        .iconfont {
          width: 1em;
          margin-right: $gap;
          display: inline-block;
          font-weight: 400;
        }
      }

      .separator {
        display: block;
        height: 0;
        background-color: transparent;
        border-top: 1px dotted $module-bg-darker-2;
        margin-bottom: $sm-gap;
      }
    }
  }
</style>

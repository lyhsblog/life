<template>
  <aside class="aside" :class="{ open: open }">
    <div class="aside-user">
      <div class="avatar">
        <img :src="gravatar" alt="567WATCH" />
      </div>
      <div class="profile">
        <h3 class="name">Surmon</h3>
        <p class="slogan">
          {{LANGUAGE_KEYS.APP_SLOGAN}}
        </p>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <router-link to="/" class="item" exact>
          <i class="iconfont icon-home"></i>
          HOME
        </router-link>
        <router-link class="item" to="/code">
          <i class="iconfont icon-code"></i>
          CODE
        </router-link>
        <router-link class="item" to="/life">
          <i class="iconfont icon-thinking"></i>
          LIFE
        </router-link>
        <router-link class="item" to="/news">
          <i class="iconfont icon-peachblossom"></i>
          NEWS
        </router-link>
        <router-link class="item" to="/vlog">
          <i class="iconfont icon-lens"></i>
          VLOG
        </router-link>
        <router-link class="item" to="/manga">
          <i class="iconfont icon-user"></i>
          MANGA
        </router-link>
        <router-link class="item" to="/novel">
          <i class="iconfont icon-user"></i>
          NOVEL
        </router-link>
        <router-link class="item" to="/video">
          <i class="iconfont icon-user"></i>
          VIDEO
        </router-link>
        <router-link class="item" to="/me">
          <i class="iconfont icon-user"></i>
          ME
        </router-link>
<!--        <router-link class="item" to="/6">-->
<!--          <i class="iconfont icon-horse"></i>-->
<!--          {{LANGUAGE_KEYS.PAGE_JOB}}-->
<!--        </router-link>-->
<!--        <router-link class="item" to="/7">-->
<!--          <i class="iconfont icon-tool"></i>-->
<!--          {{LANGUAGE_KEYS.PAGE_FREELANCER}}-->
<!--        </router-link>-->
<!--        <router-link class="item guestbook" to="/">-->
<!--          <i class="iconfont icon-comment"></i>-->
<!--          {{LANGUAGE_KEYS.PAGE_GUESTBOOK}}-->
<!--        </router-link>-->
<!--        <router-link class="item app link-active" to="/8">-->
<!--          <i class="iconfont icon-app"></i>-->
<!--          {{LANGUAGE_KEYS.PAGE_APP}}-->
<!--        </router-link>-->
      </nav>
    </div>
  </aside>
</template>

<script>
import LANGUAGE_KEYS from "../language/key";
import VALUABLE_LINKS from "../config/links";

export default {
  name: "layout-mobile-nav",
  data() {
    return {
      open: true,
      LANGUAGE_KEYS,
      VALUABLE_LINKS,
      gravatar: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/styles/init.scss';

.aside {
  display: block;
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  transform: scale(0.8, 0.8);
  transition: $mobile-aside-transition;

  &.open {
    opacity: 1;
    transform: scale(1, 1);
  }

  > .aside-user {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: $gap * 2;
    padding-bottom: $gap;
    border-bottom: 1px solid darken($mobile-aside-bg, 5%);

    > .avatar {
      width: 35%;

      > img {
        max-width: 100%;
        border: 3px solid $module-bg;
        @include radius-box($sm-radius);
      }
    }

    > .profile {
      color: $body-bg;
      width: 100%;

      > .name {
        font-weight: bold;
        margin-bottom: $gap;
      }

      > .slogan {
        color: $primary;
        @include text-overflow();
      }
    }
  }

  > .aside-nav {
    width: 100%;

    .nav-list {
      padding: 0;
      margin: 0;

      .item {
        display: block;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        margin-bottom: .5em;
        border: none;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 700;
        color: $module-bg;

        .iconfont {
          font-weight: normal;
        }

        &.app {
          margin-top: $gap;
          color: $primary;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &.link-active {
          color: $primary;
          font-weight: bold;
          background-color: $body-bg;
        }

        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
        }
      }
    }
  }
}
</style>


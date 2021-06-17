<template>
  <header id="header">
    <div
      class="search"
      :class="{ actived: searchState.open }"
    >
      <input
        ref="inputElement"
        v-model="searchState.keyword"
        type="text"
        class="input"
        required
        :placeholder="t(LANGUAGE_KEYS.SEARCH_PLACEHOLDER)"
        @keyup="submitSearch"
      >
      <span class="close" @click="cancelSearch">
        <i class="iconfont icon-cancel"></i>
      </span>
<!--      <client-only>-->
<!--        <datalist-->
<!--          v-if="tags.length"-->
<!--          id="keywords"-->
<!--          class="search-keywords"-->
<!--        >-->
<!--          <option-->
<!--            class="iiem"-->
<!--            v-for="tag in tags"-->
<!--            :key="tag.slug"-->
<!--            :value="tag.name"-->
<!--            :label="tag.description"-->
<!--          />-->
<!--        </datalist>-->
<!--      </client-only>-->
    </div>
    <transition name="module">
      <div v-if="searchState.open" class="search-mask"></div>
    </transition>
    <nav class="navbar">
      <span class="navbar-menu" @click="openMobileSidebar">
        <i class="iconfont icon-menu"></i>
      </span>
      <router-link to="/" class="navbar-logo">
        <img src="~/static/images/logo.svg"  alt="logo"/>
      </router-link>
      <span class="navbar-search" @click="openSearch">
        <i class="iconfont icon-search"></i>
      </span>
    </nav>
  </header>
</template>

<script>

  import LANGUAGE_KEYS from "../language/key";

  export default {
    name: 'layout-mobile-header',
    data() {
      const searchState = {
        open: false,
        keyword: ''
      }

      const openSearch = () => {
        searchState.open = true
      }
      const cancelSearch = () => {
        searchState.open = false
      }
      const submitSearch = () => {
      }

      const openMobileSidebar = () => this.$store.commit("changeSlideOpened", true)
      return {
        t: (key) => {
          return LANGUAGE_KEYS[key]
        },
        LANGUAGE_KEYS,
        searchState,
        openSearch,
        submitSearch,
        cancelSearch,
        openMobileSidebar
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  #header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $mobile-header-height;
    background-color: $module-bg;
    z-index: $z-index-header;
    @include backdrop-blur();

    .search-mask {
      position: fixed;
      z-index: $z-index-normal;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      touch-action: none;
      background-color: $module-bg-translucent;
      @include backdrop-blur(3px);
    }

    .search {
      position: absolute;
      display: flex;
      z-index: $z-index-normal + 1;
      width: 100%;
      height: $mobile-header-height;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: $text-reversal;
      transform: translateY(-100%);

      > .input {
        width: 80%;
        height: 100%;
        padding: 1em;
      }

      > .close {
        width: 20%;
        height: 100%;
        line-height: $mobile-header-height;
        text-align: center;
      }

      &.actived {
        opacity: 1;
        transform: translateY(0%);
      }
    }

    .navbar {
      width: 100%;
      height: $mobile-header-height;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: space-between;

      .navbar-menu,
      .navbar-search {
        height: 100%;
        width: 20%;
        line-height: $mobile-header-height;
        text-align: center;
      }

      .navbar-logo {
        width: 30%;
      }
    }
  }
</style>

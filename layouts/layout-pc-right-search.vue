<template>
  <div class="search">
    <div class="search-box">
      <input
        id="keyword"
        v-model.trim="keywords"
        required
        type="search"
        name="search"
        list="keywords"
        class="search-input"
        :class="'zh'"
        placeholder="input keywords"
        @keyup.enter="handleSearch"
      >
      <button class="search-btn" @click="handleSearch">
        <i class="iconfont icon-search" />
      </button>
<!--      <client-only>-->
<!--        <datalist v-if="tags.length" id="keywords">-->
<!--          <option-->
<!--            v-for="tag in tags"-->
<!--            :key="tag.slug"-->
<!--            :value="isZhLang ? tag.name : tag.slug"-->
<!--            :label="tag.description"-->
<!--            class="iiem"-->
<!--          />-->
<!--        </datalist>-->
<!--      </client-only>-->
    </div>
    <router-link class="archive-btn" to="/">
      <i class="iconfont icon-peachblossom" />
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'pc-aside-search',
    data () {
      return {
        keywords: ''
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const route = this.$route
        switch (route.name) {
          case "index":
            this.path = "/"
            break
          case "category":
            this.path = "/"
            break
          case "manga":
            this.path = "/manga"
            break
          case "novel":
            this.path = "/novel"
            break
          case "av":
            this.path = "/av"
            break
          case "vlog":
            this.path = "/vlog"
            break
          default:
            this.path = "/"
        }
      },
      handleSearch: function () {
        this.$router.push({path: this.path, query: {
            searchword: this.keywords
          }
        })
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.$nextTick(() => {
            this.init()
          })
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';
  @import './variables.scss';

  .search {
    padding: $sm-gap;
    width: 100%;
    height: 3em;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .search-input,
    .search-btn,
    .archive-btn {
      height: 2em;
      line-height: 2em;
      background-color: $module-bg-darker-1;
      @include background-transition();

      &:hover {
        background-color: $module-bg-hover;
      }
    }

    > .search-box {
      display: flex;
      flex-grow: 1;

      > .search-input {
        margin-right: 0;
        flex-grow: 1;

        &::-webkit-calendar-picker-indicator {
          display: none;
        }
      }

      > .search-btn {
        width: 2em;
        background-color: $module-bg-darker-3;
        @include background-transition();

        &:hover {
          background-color: $module-bg-darker-4;
        }
      }
    }

    > .archive-btn {
      display: inline-block;
      text-align: center;
      margin-left: $sm-gap;
      width: 3em;

      .iconfont {
        font-size: $font-size-h4;
      }
    }
  }
</style>

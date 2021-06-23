<template>
  <div class="article">
    <p class="title">
      <i class="iconfont icon-hotfill" />
      <strong>
        HOT
      </strong>
    </p>
    <placeholder
      :data="hots.length"
      :loading="fetching"
    >
      <template #loading>
        <ul class="article-list-skeleton" key="list">
          <li v-for="item in 10" :key="item" class="item">
            <skeleton-paragraph :lines="1" />
          </li>
        </ul>
      </template>
      <template #placeholder>
        <empty
          class="empty"
          i18n-ley="NO DATA"
        />
      </template>
      <template #default>
        <ul class="article-list" key="list">
          <li
            v-for="item in hots"
            :key="item.id"
            class="item"
          >
            <span class="index"></span>
            <router-link
              class="title"
              :to="item.url"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </template>
    </placeholder>
  </div>
</template>

<script>
  import Placeholder from "../components/widget-placeholder";
  import SkeletonLine from "../components/skeleton/line";
  import SkeletonParagraph from "../components/skeleton/paragraph";
  import Empty from "../components/widget-empty";

  export default {
    name: 'pc-aside-article',
    components: { Placeholder, SkeletonLine, SkeletonParagraph, Empty },
    data() {
      return {
        fetching: true,
        hots: []
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
            this.path = "/article"
            break
          case "category":
            this.path = "/article"
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
            this.path = "/article"
        }

        this.loadTags()
      },
      async loadTags() {
        this.fetching = true
        const res = await this.$axios.get(`${this.path}/hots`)
        if(!res.data.empty) {
          for (const item of res.data.content) {
            item.url = `${this.path}/${item.id}`
          }
        }
        this.hots = []
        this.hots.push(...res.data.content)
        setTimeout(() => {
          this.fetching = false
        }, 1000)
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

  .article {
    overflow: hidden;

    > .title {
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      border-bottom: 1px dotted $module-bg-darker-1;
      text-transform: uppercase;

      .iconfont {
        margin-right: $sm-gap;
      }
    }

    .article-list-skeleton {
      list-style: none;
      padding: $sm-gap;
      margin: 0;

      .item {
        height: 1.9em;
        margin-bottom: $sm-gap;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .article-list {
      list-style: none;
      padding: $sm-gap 0;
      margin-bottom: 0;
      counter-reset: hot-article-list;

      .item {
        display: flex;
        align-items: center;
        height: 1.9em;
        padding: 0 $gap;
        margin-bottom: $sm-gap;
        color: $text-darker;

        &:nth-child(1) {
          .index {
            color: $text-reversal;
            background-color: $primary-translucent;
          }
        }

        &:nth-child(2) {
          .index {
            color: $text-reversal;
            background-color: rgba($accent, .6);
          }
        }

        &:nth-child(3) {
          .index {
            color: $text-reversal;
            background-color: rgba($red, .6);
          }
        }

        &:last-child {
          margin: 0;
        }

        .index {
          $size: 1.5em;
          flex-shrink: 0;
          color: $text-secondary;
          counter-increment: hot-article-list;
          background-color: $module-bg-darker-1;
          width: $size;
          height: $size;
          line-height: $size;
          display: block;
          text-align: center;
          margin-right: $sm-gap;
          font-size: $gap;
          border-radius: $xs-radius;

          &::before {
            content: counter(hot-article-list);
          }
        }

        .title {
          display: block;
          font-size: $font-size-h6;
          border-bottom: 1px solid transparent;
          @include text-overflow();

          &:hover {
            text-decoration: none;
            border-color: initial;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="tag">
    <div class="tag-list" key="list">
      <router-link
        class="item"
        :title="tag.description"
        to="/"
        :key="index"
        v-for="(tag, index) in tags"
      >
        <i class="iconfont" :class="'icon-tag'" />
        <span class="name">
              tagname
              <span class="count">({{ tag.count || 0 }})</span>
            </span>
      </router-link>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'PcAsideTag',
    data() {
      return {
        fetching: true,
        path: '',
        tags: [],
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
        const res = await this.$axios.get(`${this.path}/tags`)
        this.tags.push(...res.data)
        this.fetching = false
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

  .tag {
    margin-bottom: 0;
    max-height: calc(100vh - 88px - #{$top-height + $lg-gap + $lg-gap + $tool-height});
    overflow-y: auto;
    width: 100%;
    border-top: $gap solid transparent;
    border-bottom: $gap solid transparent;

    .tag-list-skeleton {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0 $gap;
      overflow: hidden;

      .item {
        width: calc(50% - #{$gap / 2});
        height: 1.4em;
        margin-right: 0;
        margin-bottom: $gap;

        &:nth-child(2n-1) {
          margin-right: $gap;
        }
        &:nth-child(4n-1) {
          width: 30%;
          margin-right: $gap;
        }
        &:nth-child(4n) {
          width: calc(70% - #{$gap});
        }
        &:nth-last-child(1),
        &:nth-last-child(2) {
          margin-bottom: 0;
        }
      }
    }

    .tag-list {
      list-style: none;
      padding: 0;
      overflow: hidden;
      margin-left: $gap;
      margin-top: -$gap;

      .item {
        $height: 2em;
        display: inline-flex;
        margin-right: $sm-gap;
        margin-top: $gap;
        height: $height;
        line-height: $height;
        font-size: $font-size-h6;
        text-transform: capitalize;
        font-family: $font-family-normal;
        @include radius-box($mini-radius);

        .iconfont {
          width: 2em;
          text-align: center;
          background-color: $module-bg-darker-1;
          @include background-transition();
        }

        .name {
          display: block;
          padding: 0 $sm-gap;
          @include background-transition();

          .count {
            margin-left: $xs-gap;
          }
        }

        &.link-active {
          .iconfont {
            color: $module-bg-opaque;
            background-color: $primary-translucent;
          }
          .name {
            background-color: $primary;
            color: $text-reversal;
          }
        }

        &:not(.link-active) {
          .name {
            background-color: $module-bg-hover;
          }

          &:hover {
            .iconfont {
              background-color: $module-bg-hover;
            }
            .name {
              background-color: $module-bg-darker-3;
            }
          }
        }
      }
    }
  }
</style>

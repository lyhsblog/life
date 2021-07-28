<template>
  <div class="tag">
    <placeholder
      :data="tags.length"
      :loading="fetching"
    >
      <template #loading>
        <div class="article-skeleton" key="skeleton">
          <div class="title">
            <skeleton-line />
          </div>
          <div class="content">
            <div class="first">
              <skeleton-line />
            </div>
            <responsive>
              <skeleton-paragraph :lines="5" />
            </responsive>
          </div>
        </div>
      </template>
      <template #placeholder>
        <empty class="article-empty" key="empty">
          NO DATA,TRY OTHER MENU
        </empty>
      </template>
      <template #default>
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
          {{tag.name}}
              <!--          <span class="count">({{ tag.count || 0 }})</span>-->
        </span>
          </router-link>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script>

  import SkeletonParagraph from "../components/skeleton/paragraph";
  import SkeletonLine from "../components/skeleton/line";
  import Placeholder from "../components/widget-placeholder";
  import Empty from "../components/widget-empty";
  import Responsive from "../components/widget-responsive";

  export default {
    name: 'PcAsideTag',
    components: {SkeletonParagraph, SkeletonLine, Placeholder, Empty, Responsive},
    data() {
      return {
        fetching: true,
        path: '',
        tags: [],
      }
    },
    async fetch() {
      if(this.$device.isDesktopOrTablet) {
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
        this.tags = await this.$axios.$get(`${this.path}/tags`).then(res => res)
      }
      this.fetching = false
    },
    watch: {
      '$route'(to, from) {
        if (to.fullPath !== from.fullPath) {
          this.$nextTick(() => {
            this.$fetch()
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

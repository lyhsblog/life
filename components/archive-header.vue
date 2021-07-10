<template>
  <placeholder
    :data="category.id != null"
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
      <div class="header">
        <div class="background" :style="{
        backgroundImage: `url(${encodeURI(category.cover) || ''})`
      }"/>
        <div class="content">
          <div class="logo">
            <transition name="module" mode="out-in">
              <i key="date" class="iconfont" :class="category.icon || ''"></i>
            </transition>
          </div>
          <div class="title">
            <transition name="module" mode="out-in">
              <h5 class="text">
                <slot></slot>
              </h5>
            </transition>
          </div>
        </div>
      </div>
    </template>
  </placeholder>
</template>

<script>
  import SkeletonParagraph from "./skeleton/paragraph";
  import SkeletonLine from "./skeleton/line";
  import Placeholder from "./widget-placeholder";
  import Empty from "./widget-empty";
  import Responsive from "./widget-responsive";

  export default {
    name: 'archive-list-header',
    components: {SkeletonParagraph, SkeletonLine, Placeholder, Empty, Responsive},
    data() {
      return {
        fetching: true,
        category: {
          id: 'this is id',
          name: 'this is name',
          cover: 'this is cover',
          description: 'this is description'
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.category.name = this.$route.params.category
        this.loadCategory()
      },
      async loadCategory() {
        this.fetching = true
        const res = await this.$axios.get(`/article/category/${this.category.name}`)
        this.category = res.data
        this.fetching = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .article-skeleton {
    background: var(--module-bg);
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2rem;

    .content {
      width: 50%;
      margin-top: 2.6rem;
      margin-left: 1rem;

      .first {
        width: 8rem;
        height: $gap * 2;
        margin-bottom: $gap;
      }
    }

    .title {
      position: absolute;
      top: 2rem;
      right: 2rem;
      height: 2.6rem;
      width: 18rem;
    }
  }

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 16.4rem;
    margin-bottom: $lg-gap;
    color: $white;
    @include radius-box($lg-radius);

    &:hover {
      .background {
        transform: scale(1);
      }
      .content {
        backdrop-filter: none;
        .logo {
          .iconfont {
            animation: none;
            transform: scale(1.05);
          }
        }
      }
    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background-color: $module-bg;
      background-size: cover;
      background-position: center center;
      transform: scale(1.1);
      @include transform-transition();
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      @include backdrop-blur(1px);

      .logo {
        height: 12rem;
        line-height: 12rem;
        margin: 0;
        text-align: center;
        overflow: hidden;

        @keyframes logo-animate {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .iconfont {
          font-size: 6em;
          display: inline-block;
          animation: logo-animate 5s infinite;
          @include transform-transition();
        }
      }

      .title {
        height: 4rem;
        line-height: 2.5rem;

        .text {
          margin: 0;
          text-align: center;
          text-transform: capitalize;
        }
      }
    }

    @media (min-width: 320px) {
      height: 12rem;

      .logo {
        height: 8.6rem;
        line-height: 8.6rem;

        .iconfont {
          font-size: 5em;
        }
      }
    }

    @media (min-width: 1024px) {
      height: 16.4rem;

      .logo {
        height: 12rem;
        line-height: 12rem;

        .iconfont {
          font-size: 6em;
        }
      }
    }
  }
</style>

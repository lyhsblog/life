<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="topbar-skeleton" key="skeleton">
        <div class="statistics-skeleton">
          <skeleton-line class="count-skeleton" />
          <skeleton-line class="like-skeleton" />
        </div>
        <div class="sort-skeleton">
          <skeleton-line />
        </div>
      </div>
    </template>
    <template #default>
      <div class="topbar" key="element">
        <div class="statistics">
          <div class="total">
            <strong class="count">{{ total || 0 }}</strong>
            comments
          </div>
          <button
            class="like"
            :class="{ liked: false }"
          >
            <i class="iconfont icon-heart" />
            <strong class="count">{{ likes || 0 }}</strong>
            <template v-if="isLike">赞</template>
            <template v-else>
              Like
            </template>
          </button>
        </div>
        <div class="sort">
          <button
            class="button"
            :class="{ actived: true }"
          >
            NEW
          </button>
          <button
            class="button"
            :class="{ actived: false }"
          >
            HOT
          </button>
        </div>
      </div>
    </template>
  </placeholder>
</template>

<script>
  import Placeholder from "../widget-placeholder";
  import SkeletonLine from "../skeleton/line";
  import SkeletonBase from "../skeleton/base";
  import SkeletonParagraph from "../skeleton/paragraph";

  export default {
    name: 'CommentTopbar',
    components: { Placeholder, SkeletonLine, SkeletonBase, SkeletonParagraph },
    props: {
      fetching: {
        type: Boolean,
        required: true
      },
      total: {
        type: Number
      },
      sort: {
        type: Number,
        required: true
      },
      likes: {
        type: Number,
        required: true
      },
      postId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isLike: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';
  $topbar-size: 2em;

  .sponsor-modal {
    width: 600px;
    height: 200px;
    border-radius: $sm-radius !important;
  }

  .topbar,
  .topbar-skeleton {
    display: flex;
    padding-bottom: $gap;
    margin-bottom: $lg-gap;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed $module-bg-darker-1;
  }

  .topbar-skeleton {
    .statistics-skeleton {
      display: flex;
      width: 70%;

      .count-skeleton {
        width: 20%;
        height: $topbar-size;
        margin-right: 1rem;
      }
      .like-skeleton {
        height: $topbar-size;
        width: 40%;
      }
    }

    .sort-skeleton {
      width: 20%;
      height: $topbar-size;
    }
  }

  .topbar {
    .statistics {
      display: flex;

      .like,
      .sponsor,
      .total {
        height: $topbar-size;
        line-height: $topbar-size;
        padding: 0 .6em;
        margin-right: $sm-gap;
        background-color: $module-bg-darker-1;
        @include radius-box($mini-radius);

        .count {
          margin-right: $xs-gap;
        }
      }

      .like {
        padding-left: 0;
        @include background-transition();

        .iconfont {
          display: inline-block;
          width: $topbar-size;
          text-align: center;
          margin-right: $sm-gap;
          background-color: $module-bg-darker-2;
          @include background-transition();
        }

        &:hover {
          background-color: $module-bg-hover;
          .iconfont {
            background-color: $module-bg-darker-3;
          }
        }

        &.liked {
          cursor: no-drop;
          .iconfont {
            color: $red;
          }
        }
      }

      .sponsor {
        color: $text-reversal;
        background-color: $primary-lighter;
        @include background-transition();
        &:hover {
          background-color: $primary;
        }
      }
    }

    .sort {
      .button {
        margin-left: $gap;

        &.actived {
          color: $link-color-hover;
          font-weight: bold;
        }
      }
    }
  }
</style>

<template>
  <li
    :key="comment.id"
    :id="comment.id"
    :class="{ mobile: false }"
    class="comment-item"
  >
    <div class="cm-avatar">
      <a class="link">
        <img
          alt=""
          src="/images/anonymous.jpg"
          draggable="false"
        >
      </a>
    </div>
    <div class="cm-body">
      <div class="cm-header">
        <a class="user-name" :href="comment.site || 'https://567.watch'">
          {{comment.nickname}}
        </a>
        <comment-ua :ua="`chrome`" />
        <span class="location">
          <span>US</span>
        </span>
        <span class="flool">#{{ comment.id }}</span>
      </div>
      <div class="cm-content">
<!--        <p class="reply">-->
<!--          <span class="text">-->
<!--            reply-->
<!--          </span>-->
<!--          <button class="parent">-->
<!--            #1000-->
<!--          </button>-->
<!--          :-->
<!--        </p>-->
        <div
          class="markdown-html comment"
          v-html="comment.content"
        />
      </div>
      <div class="cm-footer">
        <span class="create_at">{{ comment.createTime }}</span>
<!--        <button class="reply">-->
<!--          <i class="iconfont icon-reply" />-->
<!--          REPLY-->
<!--        </button>-->
        <button
          class="like"
          :class="{
            liked: false,
            actived: false
          }"
          :disabled="true"
        >
          <i class="iconfont icon-zan" />
          LIKE
          <span> ({{ comment.likes || 0}})</span>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
  import CommentUa from "./ua"
  export default {
    name: 'CommentListItem',
    components: { CommentUa },
    props: {
      comment: {
        type: Object,
        required: true
      },
      liked: {
        type: Boolean,
        default: false
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .comment-item {
    position: relative;
    padding-left: 2rem;
    margin-top: $lg-gap;
    &:first-child {
      margin-top: 0;
    }

    .cm-avatar {
      display: block;
      position: absolute;
      left: 0;
      top: $gap * 2;
      background-color: $module-bg-darker-2;

      .link {
        $size: 4.8rem;
        display: block;
        border: 5px solid $module-bg-lighter;
        border-radius: $mini-radius;
        width: $size;
        height: $size;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .cm-body {
      display: block;
      width: 100%;
      height: 100%;
      padding: $sm-gap $sm-gap $sm-gap ($lg-gap * 3);
      background-color: $module-bg-darker-1;
      @include radius-box($xs-radius);
      @include background-transition();

      > .cm-header {
        display: block;
        position: relative;

        > .user-name {
          font-weight: bold;
          margin-right: $gap;

          &:hover {
            border-bottom: 1px solid;
          }
        }

        ::v-deep .os,
        ::v-deep .browser,
        .location {
          color: $text-disabled;
          font-size: $font-size-small;
          margin-right: $gap;

          .iconfont {
            margin-right: $xs-gap;
          }

          .separator {
            margin: 0 $xs-gap;
          }
        }

        > .flool {
          float: right;
          line-height: 1.8;
          color: $text-dividers;
          font-size: $font-size-small;
          font-weight: bold;
        }
      }

      > .cm-content {
        padding-right: $xs-gap;
        user-select: text;
        font-size: $font-size-h6;

        .reply {
          display: flex;
          align-items: center;
          margin-top: $sm-gap;
          margin-bottom: - $xs-gap;
          color: $text-disabled;
          font-weight: bold;

          .text {
            margin-right: $xs-gap;
          }

          .parent {
            font-weight: bold;
            color: $link-color;
            &:hover {
              color: $link-color-hover;
            }
          }
        }

        .markdown-html {
          margin: $sm-gap 0;
        }
      }

      > .cm-footer {
        display: flex;

        > .create_at,
        > .reply,
        > .like {
          color: $text-disabled;
          font-size: $font-size-small;
          margin-right: $gap;

          .iconfont {
            margin-right: $xs-gap;
          }
        }

        .reply {
          &:hover {
            color: $link-color;
          }
        }

        .like {
          &:hover {
            color: $red;
          }
          &.liked {
            color: $red;
            font-weight: bold;
          }
          &.actived {
            font-weight: bold;
          }
        }
      }
    }

    &:hover {
      .cm-body {
        background-color: $module-bg-darker-3;
      }
    }

    &.mobile {
      padding: 0;
      margin-top: $gap;

      .cm-body {
        padding: $sm-gap $gap;
      }
    }
  }
</style>

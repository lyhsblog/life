<template>
  <div
    ref="element"
    class="detail"
  >
    <div class="knowledge" key="knowledge">
      <h2 class="title">title</h2>
      <div
        class="markdown-html"
        v-html="'content'"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticleContent',
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .detail {
    padding: 1rem 2rem;
    position: relative;
    overflow: hidden;
    height: auto;
    transition: height $transition-time-normal;

    .skeleton {
      .title {
        width: 60%;
        height: 26px;
        margin: 2rem auto;
      }

      .content {
        margin-top: 3rem;
        margin-bottom: 1rem;
      }
    }

    .origin {
      position: absolute;
      top: -11px;
      left: -29px;
      transform: rotate(-45deg);
      width: 7rem;
      height: 4rem;
      line-height: 5.8rem;
      text-align: center;
      text-transform: uppercase;
      transform-origin: center;
      color: $text-reversal;
      font-weight: bold;
      font-size: $font-size-small;

      &.self {
        background-color: rgba($accent, .8);
      }
      &.other {
        background-color: rgba($red, .8);
      }
      &.hybrid {
        background-color: rgba($primary, .8);
      }
    }

    .knowledge {
      user-select: text;

      .title {
        margin: 1em 0 1.5em 0;
        text-align: center;
        font-weight: 700;
        font-size: $font-size-h2 * .95;
      }

      .markdown-html {
        .google-auto-placed {
          margin-bottom: $sm-gap;
        }
      }

      .readmore {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: $gap;

        .readmore-btn {
          width: 80%;
          text-align: center;
          line-height: 3rem;
          color: $text-secondary;
          background-color: $module-bg-darker-1;
          @include background-transition();
          @include radius-box($xs-radius);

          &[disabled] {
            cursor: no-drop;
          }

          &:hover {
            background-color: $primary;
            color: $text-reversal;
          }

          .iconfont {
            margin-left: $sm-gap;
          }
        }
      }
    }

    @media (min-width: 320px) {
      padding: $gap $lg-gap;

      > .origin {
        font-size: $font-size-base;
      }

      > .knowledge {
        > .content {
          pre {
            padding-left: 0;

            > .code-lines {
              display: none;
            }
          }
        }
      }
    }

    @media (min-width: 1024px) {
      padding: 1rem 2rem;

      > .origin {
        font-size: $font-size-small;
      }

      > .knowledge {
        > .content {
          pre {
            padding-left: unset;

            > .code-lines {
              display: block;
            }
          }
        }
      }
    }
  }
</style>

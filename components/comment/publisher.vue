<template>
  <form
    :id="ElementID.Publisher"
    :class="{ mobile: false }"
    class="publisher"
  >
    <div class="user">
      <!-- profile editor -->
      <template>
        <div class="name">
          <input
            v-model="profile.nickname"
            required
            type="text"
            name="name"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="'nickname' + ' *'"
          >
        </div>
        <div class="email">
          <input
            v-model="profile.email"
            required
            type="email"
            name="email"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="'email' + ' *'"
          >
        </div>
        <div class="site">
          <input
            v-model="profile.site"
            type="url"
            name="url"
            autocomplete="on"
            :disabled="disabled"
            :placeholder="'Site'"
          >
        </div>
<!--        <div class="save">-->
<!--          <button-->
<!--            type="submit"-->
<!--            :disabled="false"-->
<!--          >-->
<!--            <i class="iconfont icon-success" />-->
<!--          </button>-->
<!--        </div>-->
      </template>
      <!-- profile setting -->
<!--      <template>-->
<!--        <div class="edit">-->
<!--          <strong class="name">John</strong>-->
<!--          <span class="setting">-->
<!--            <i class="iconfont icon-setting" />-->
<!--            <span class="account-setting">-->
<!--              SETTING-->
<!--            </span>-->
<!--            <ul class="user-tool">-->
<!--              <li>-->
<!--                EDIT-->
<!--              </li>-->
<!--              <li>-->
<!--                CLEAR-->
<!--              </li>-->
<!--            </ul>-->
<!--          </span>-->
<!--        </div>-->
<!--      </template>-->
    </div>
    <div class="postbox">
      <div class="user">
        <div class="gravatar">
          <img
            alt=""
            src="/images/anonymous.jpg"
            draggable="false"
          >
        </div>
      </div>
      <div class="editor">
<!--        <transition name="module">-->
<!--          <div class="will-reply">-->
<!--            <div class="reply-user">-->
<!--              <span class="reply-text">-->
<!--                REPLY-->
<!--                <button class="reply-user-name">-->
<!--                  #1000 @John：-->
<!--                </button>-->
<!--              </span>-->
<!--              <button class="cancel iconfont icon-cancel"/>-->
<!--            </div>-->
<!--            <div-->
<!--              class="reply-preview markdown-html comment"-->
<!--              v-html="`this is text for comment`"-->
<!--            />-->
<!--          </div>-->
<!--        </transition>-->
        <slot name="pen"></slot>
      </div>
    </div>
  </form>
</template>

<script>
  import { ElementID, CommentEvent } from './helper'
  export default {
    name: 'CommentPublisher',
    props: {
      disabled: {
        type: Boolean,
        required: true
      },
      replyPid: {
        type: Number,
        required: true
      },
      profile: {
        type: Object,
        required: true
      },
      cached: {
        type: Boolean,
        required: true
      },
      editing: {
        type: Boolean,
        required: true
      }
    },
    emits: [
      CommentEvent.SyncProfile,
      CommentEvent.SaveProfile,
      CommentEvent.EditProfile,
      CommentEvent.ClearProfile,
      CommentEvent.CancelProfile,
      CommentEvent.CancelReply
    ],
    data() {
      return {
        ElementID
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .publisher {
    display: block;
    padding-top: $gap;
    margin-top: $lg-gap;
    border-top: 1px dashed $module-bg-darker-1;

    > .user {
      width: 100%;
      height: 2em;
      line-height: 2em;
      display: flex;
      margin-bottom: $gap;
      padding-left: 5.2rem;

      > .edit {
        flex-grow: 1;
        text-align: right;
        line-height: 2em;
        position: relative;

        > .setting {
          font-size: $font-size-h6;
          margin-left: $gap;
          display: inline-block;
          position: relative;

          &:hover {
            .user-tool {
              display: block;
            }
          }

          > .iconfont {
            margin-right: $xs-gap;
          }

          > .account-setting {
            text-transform: capitalize;
          }

          .user-tool {
            display: none;
            position: absolute;
            right: 0;
            top: 2em;
            margin: 0;
            padding: 0;
            padding-top: .5rem;
            list-style-type: square;
            z-index: $z-index-normal + 1;
            color: $text-reversal;

            > li {
              padding: 0 $gap;
              cursor: pointer;
              background-color: $primary-translucent;
              &:hover {
                background-color: $primary-lighter;
              }
            }
          }
        }
      }

      > .save {
        width: 10%;
        margin-left: $gap;
        flex-grow: 1;
        line-height: 2em;
        text-align: center;

        > button {
          width: 100%;
          height: 100%;
          @include background-transition();
          background-color: $module-bg-hover;
          &:hover {
            background-color: $module-bg-darker-3;
          }
        }
      }

      > .name,
      > .email,
      > .site {
        flex-grow: 1;

        input {
          width: 100%;
          height: 2em;
          line-height: 2em;
          text-indent: 3px;
          background-color: $module-bg-darker-1;
          @include radius-box($mini-radius);
          @include background-transition();

          &:focus,
          &:hover {
            background-color: $module-bg-hover;
          }
        }
      }

      > .name,
      > .email {
        margin-right: $gap;
      }
    }

    > .postbox {
      width: 100%;
      display: flex;

      > .user {
        margin-right: 1em;

        .gravatar {
          display: block;
          margin-bottom: .5em;
          width: 4rem;
          height: 4rem;
          background-color: $module-bg-darker-1;

          img {
            width: 100%;
            height: 100%;
            transition: transform .5s ease-out;
          }
        }
      }

      .editor {
        flex-grow: 1;
        overflow: hidden;

        .will-reply {
          font-size: $font-size-h6;

          .reply-user,
          .reply-preview {
            margin-bottom: $gap;
            @include radius-box($xs-radius);
            @include background-transition();
          }

          .reply-user {
            display: flex;
            justify-content: space-between;
            padding: 0 $gap;
            line-height: 2.6em;
            background-color: $module-bg-darker-1;
            &:hover {
              background-color: $module-bg-hover;
            }

            .reply-user-name {
              margin-left: $sm-gap;
              display: inline;
              font-weight: bold;
            }

            .reply-user-name,
            .cancel {
              &:hover {
                color: $link-color-hover;
              }
            }
          }

          .reply-preview {
            overflow: auto;
            padding: $sm-gap $gap;
            max-height: 10em;
            background-color: $module-bg-hover;
            &:hover {
              background-color: $module-bg-darker-3;
            }
          }
        }
      }
    }

    &.mobile {
      > .user {
        margin: 0;
        padding: 0;
        height: auto;
        flex-direction: column;

        > .name,
        > .email,
        > .site,
        > .save {
          width: 80%;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: $gap;
        }

        > .save {
          width: 30%;
          margin-bottom: 0;
        }
      }

      > .postbox {
        > .user {
          margin: 0;
        }
      }
    }
  }
</style>

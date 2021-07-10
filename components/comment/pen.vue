<template>
  <div class="pen">
    <div class="markdown">
      <div
        ref="inputElement"
        class="markdown-input"
        :contenteditable="!disabled"
        :placeholder="`INPUT YOU WANT`"
      />
      <transition name="list-fade">
        <div
          class="markdown-preview markdown-html comment"
          v-if="preview"
          v-html="previewContent"
        />
      </transition>
    </div>
    <div class="pencilbox">
      <div class="stationery">
        <button
          class="emoji"
          title="emoji"
          type="button"
          :disabled="disabled || preview"
        >
          <i class="iconfont icon-emoji" />
          <div class="emoji-box">
            <ul class="emoji-list">
              <li
                class="item"
                v-for="(emoji, index) in EMOJIS"
                v-once
                :key="index"
                @click="insertEmoji(emoji)"
              >{{ emoji }}</li>
            </ul>
          </div>
        </button>
        <button
          class="image"
          title="image"
          :disabled="disabled || preview"
          @click.prevent="insertImage"
        >
          <i class="iconfont icon-image" />
        </button>
        <button
          class="link"
          title="link"
          :disabled="disabled || preview"
          @click.prevent="insertLink"
        >
          <i class="iconfont icon-link-horizontal" />
        </button>
        <button
          class="code"
          title="code"
          :disabled="disabled || preview"
          @click.prevent="insertCode"
        >
          <i class="iconfont icon-code-comment" />
        </button>
        <button
          class="preview"
          title="preview"
          :class="{ actived: preview }"
          :disabled="disabled"
          @click.prevent="handleTogglePreview"
        >
          <i
            class="iconfont"
            :class="preview ? 'icon-eye-close' : 'icon-eye'"
          />
        </button>
      </div>
      <button
        class="submit"
        :disabled="false"
        @click="handleSubmit"
      >
        SUBMIT
      </button>
    </div>
  </div>
</template>

<script>
  import { insertContent } from '../../utils/editable'
  import { markdownToHTML } from '../../transforms/markdown'
  import { EMOJIS, CommentEvent } from './helper'
  const Events = {
      Update: 'update:modelValue',
      InputReady: 'input-ready'
  }
  export default {
    name: 'CommentPen',
    props: {
      modelValue: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        required: true
      },
      posting: {
        type: Boolean,
        required: true
      },
      preview: {
        type: Boolean,
        required: true
      }
    },
    emits: [
      Events.Update,
      Events.InputReady,
      CommentEvent.TogglePreview,
      CommentEvent.Submit
    ],
    data() {
      return {
        EMOJIS,
        content: '',
        inputElement: Object,
        inputElementObserver: Object,
      }
    },
    computed: {
      previewContent: function() {
        return this.preview
          ? markdownToHTML(this.content)
          : null
      }
    },
    mounted() {
      this.inputElement = this.$refs?.inputElement
      this.$emit(Events.InputReady, this.inputElement)
      this.inputElementObserver = new MutationObserver(mutations => {
        this.handleInputChange()
      })
      this.inputElementObserver?.observe(this.inputElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      })
    },
    beforeDestroy() {
      this.inputElementObserver?.disconnect()
    },
    methods: {
      handleTogglePreview: function () {
        this.$emit(CommentEvent.TogglePreview)
      },
      handleInputChange: function () {
        const text = this.inputElement?.innerText
        if (text !== this.content) {
          this.content = text
          this.$emit(Events.Update, text)
        }
      },
      handleValueChange: function (value) {
        if (value !== this.content) {
          this.content = value
          if (this.inputElement) {
            this.inputElement.innerText = value
          }
        }
      },
      handleSubmit: function (event) {
        event.preventDefault()
        this.$emit(CommentEvent.Submit, this.content)
      },

      insertContentToInput: function (before, after = '') {
        insertContent({
          element: this.inputElement,
          content: [before, after]
        })
        this.handleInputChange()
      },
      insertEmoji: function (emoji) {
        this.insertContentToInput(` ${emoji} `)
      },
      insertImage: function () {
        this.insertContentToInput(` ![`, `](https://) `)
      },
      insertLink: function () {
        this.insertContentToInput(` [`, `](https://) `)
      },
      insertCode: function () {
        this.insertContentToInput('\n```javascript\n', '\n```\n')
      }
    },
    watch: {
      modelValue: function (value) {
        this.handleValueChange(value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .pen {
    position: relative;
    @include radius-box($xs-radius);

    .markdown {
      position: relative;
      overflow: hidden;

      .markdown-input {
        min-height: 6em;
        max-height: 36em;
        overflow: auto;
        outline: none;
        padding: .5em;
        cursor: auto;
        font-size: $font-size-h6;
        line-height: 1.8em;
        background-color: $module-bg-darker-1;
        @include background-transition();

        &:empty:before {
          content: attr(placeholder);
          color: $text-disabled;
        }

        &:focus {
          content:none;
        }

        &:hover {
          background-color: $module-bg-hover;
        }
      }

      .markdown-preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        margin: 0;
        padding: .5em;
        background-color: $body-bg;
      }
    }

    .pencilbox {
      $size: $font-size-base * 2;
      height: $size;
      line-height: $size;
      display: flex;
      justify-content: space-between;
      background-color: $module-bg-darker-3;

      .stationery {
        .emoji,
        .image,
        .link,
        .code,
        .preview {
          width: $size;
          height: $size;
          text-align: center;
          display: block;
          float: left;
          @include background-transition();

          &[disabled] {
            opacity: .7;
          }

          &:not([disabled]) {
            &.actived,
            &:hover {
              background-color: $module-bg-darker-4;
            }
          }
        }

        .emoji {
          &:not([disabled]):hover {
            .emoji-box {
              display: block;
            }
          }

          .emoji-box {
            display: none;
            position: absolute;
            bottom: $size;
            left: 0;
            top: 0;
            width: 100%;
            overflow-y: auto;
            background-color: $module-bg;

            .emoji-list {
              list-style: none;
              padding: 0;
              margin: 0;
              font-size: $font-size-h3;
              display: flex;
              flex-wrap: wrap;

              .item {
                padding: 0 .4em;
                cursor: pointer;
                @include background-transition();

                &:hover {
                  background-color: $module-bg-hover;
                }
              }
            }
          }
        }
      }

      .submit {
        width: 8rem;
        height: $size;
        background-color: $module-bg-darker-4;
        @include background-transition();

        &:hover {
          background-color: $module-bg-darker-5;
        }
      }
    }
  }
</style>

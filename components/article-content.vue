<template>
  <div
    ref="element"
    class="detail"
  >
    <transition name="module">
      <div
        v-if="!fetching"
        class="origin"
        :class="{
          self: true,
        }"
      >
        OG
      </div>
    </transition>
    <placeholder
      :loading="fetching"
      @after-enter="handleContentAnimateDone"
    >
      <template #loading>
        <div class="skeleton" key="skeleton">
          <skeleton-line class="title" />
          <skeleton-paragraph
            class="content"
            :lines="9"
            line-height="1.2em"
          />
        </div>
      </template>
      <template #default>
        <div class="knowledge" key="knowledge">
          <h2 class="title">{{ article.name }}</h2>
          <div
            class="markdown-html"
            :id="contentElementIds.default"
            v-html="content.default"
          />
          <transition
            name="module"
            mode="out-in"
            @after-enter="handleRenderMoreAnimateDone"
          >
            <div v-if="isRenderMoreEnabled" class="readmore">
              <button
                class="readmore-btn"
                :disabled="longFormRenderState.rendering"
                @click="handleRenderMore"
              >
                {{longFormRenderState.rendering ? 'ARTICLE_RENDERING': 'ARTICLE_READ_ALL'}}
                <i class="iconfont icon-next-bottom"></i>
              </button>
            </div>
            <div
              class="markdown-html"
              :id="contentElementIds.leftover"
              v-else-if="longFormRenderState.rendered"
              v-html="content.leftover"
            />
          </transition>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script>
import Placeholder from "./widget-placeholder";
import SkeletonLine from "./skeleton/line";
import SkeletonParagraph from "./skeleton/paragraph";
import { markdownToHTML } from '../transforms/markdown'

export default {
    name: 'ArticleContent',
    components: {Placeholder, SkeletonLine, SkeletonParagraph},
    props: {
      fetching: Boolean,
      article: Object
    },
    data() {
      return {
        longFormRenderState: {
          rendering: false,
          rendered: false,
        },
        contentElementIds: {
          default: 'article-content',
          leftover: 'more-article-content'
        }
      }
    },
    mounted() {
      this.handleContentAnimateDone()
    },
    computed: {
      isLongFormContent: function() {
        return this.article?.content.length > 13688
      },
      isRenderMoreEnabled: function() {
        return this.isLongFormContent && !this.longFormRenderState.rendered
      },
      content: function() {
        const regex = /(\r\n)+/ig
        const content = this.article?.content.replaceAll(regex, "\r\n\r\n")
        const result = {
          default: '',
          leftover: ''
        }

        if (!content) {
          return result
        }

        const parseMarkdown = (content) => {
          return markdownToHTML(content, {
            // tagMap: tagMap.value,
            relink: true,
            html: true
          })
        }

        if (this.isLongFormContent) {
          const index = this.getContentSplitIndex(content)
          result.default = parseMarkdown(content.substring(0, index))
          result.leftover = parseMarkdown(content.substring(index))
        } else {
          result.default = parseMarkdown(content)
          result.leftover = ''
        }
        return result
      }
    },
    methods: {
      getContentSplitIndex: function(content) {
        // 坐标优先级：H4 -> H3 -> Code -> \n\n
        const shortContent = content.substring(0, 11688)
        const lastH4Index = shortContent.lastIndexOf('\n####')
        const lastH3Index = shortContent.lastIndexOf('\n###')
        const lastCodeIndex = shortContent.lastIndexOf('\n\n```')
        const lastLineIndex = shortContent.lastIndexOf('\n\n**')
        const lastPLineIndex = shortContent.lastIndexOf('\r\n')
        return Math.max(lastH4Index, lastH3Index, lastCodeIndex, lastLineIndex, lastPLineIndex)
      },
      handleRenderMore: function() {
        this.longFormRenderState.rendering = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.longFormRenderState.rendered = true
            this.longFormRenderState.rendering = false
          }, 1000)
        })
      },
      observeLozad: function(elementId) {
        const element =  this.$refs.element
        const contentElement = element.value?.querySelector(`#${elementId}`)
        const lozadElements = contentElement && contentElement.querySelectorAll(`.${LOZAD_CLASS_NAME}`)
        if (lozadElements?.length) {
          const lozadObserver = window.$lozad(lozadElements, {
            loaded: element => element.classList.add(LOADED_CLASS_NAME)
          })
          lozadObserver.observe()
        }
      },
      handleContentAnimateDone: function () {
        this.observeLozad(this.contentElementIds.default)
      },
      handleRenderMoreAnimateDone: function () {
        this.observeLozad(this.contentElementIds.leftover)
      }
    }
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

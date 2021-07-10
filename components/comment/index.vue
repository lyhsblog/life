<template>
  <div
    :id="ElementID.Warpper"
    :class="{ mobile: false }"
    class="comment-box"
  >
    <comment-topbar
      :total="comments.totalElements"
      :likes="likes"
      :post-id="postId"
      :fetching="fetching"
      :sort="sortMode"
    />
    <comment-list
      :fetching="fetching"
      :comments="comments.content"
    />
    <comment-pagination
      :fetching="fetching"
      :sort="sortMode"
      :pagination="comments"
    />
    <comment-publisher
      :disabled="disabled"
      :editing="disabled"
      :reply-pid="10000"
      :profile="baseProfile"
      :cached="false"
    >
      <template #pen>
        <comment-pen
          :model-value="penState.content"
          :preview="penState.preview"
          :disabled="posting || fetching"
          :posting="posting"
          @update:modelValue="updateModelValue"
          @input-ready="handleMarkdownInputReady"
          @toggle-preview="togglePenPreview"
          @submit="submitComment"
        />
      </template>
    </comment-publisher>
  </div>
</template>

<script>
  import CommentTopbar from './topbar.vue'
  import { ElementID } from './helper'
  import CommentList from "./list";
  import CommentPagination from "./pagination"
  import CommentPublisher from "./publisher"
  import CommentPen from "./pen"
  import {email as emailRegex, url as urlRegex} from "../../constants/regex";

  export default {
    name: 'Comment',
    components: {
      CommentList,
      CommentTopbar,
      CommentPagination,
      CommentPublisher,
      CommentPen
    },
    props: {
      likes: {
        type: Number,
        default: 0
      },
      postId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        fetching: true,
        posting: false,
        input: '',
        disabled: false,
        ElementID,
        sortMode: 0,
        crrPage: 0,
        sort: [
          'createTime,desc',
          'likes,desc'
        ],
        comments: {
          content: []
        },
        markdownInputElement: Object,
        penState: {
          content: '',
          preview: false
        },
        baseProfile: {
          nickname: '',
          email: '',
          site: ''
        },
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.loadComment()
      },
      async loadComment() {
        this.fetching = true
        this.comments = await this.$axios.$get("/comment", {
          params: {
            cid: this.postId,
            sort: this.sort[this.sortMode],
            page: this.crrPage
          }
        }).then(res => res)
        this.fetching = false
      },
      updateModelValue: function (value) {
        this.penState.content = value
      },
      handleMarkdownInputReady: function (markdownElement) {
        this.markdownInputElement = markdownElement
      },
      togglePenPreview: function () {
        this.penState.preview = !this.penState.preview
      },
      clearPenContent: function () {
        this.penState.content = ''
      },
      submitComment: async function () {
        const profile = this.baseProfile
        console.log(profile)
        if (!profile.nickname) {
          return alert("nickname is necessary")
        }
        if (!profile.email) {
          return alert("email is necessary")
        }
        if (!emailRegex.test(profile.email)) {
          return alert("type of email unsupported")
        }
        if (profile.site && !urlRegex.test(profile.site)) {
          return alert("please check url format")
        }
        if (!this.penState.content || !this.penState.content.trim()) {
          return alert("comment is necessary")
        }

        // content length
        const lineOverflow = this.penState.content.split('\n').length > 36
        const lengthOverflow = this.penState.content.length > 2000
        if (lineOverflow || lengthOverflow) {
          return alert("comment is too long, length of words keeps under 2000")
        }

        // post
        this.posting = true
        await this.$axios.$post("/comment", {
          cid: this.postId,
          content: this.penState.content,
          ...this.baseProfile
        })
        this.penState.preview = false
        // reset reply state
        this.clearPenContent()
        this.posting = false
        await this.loadComment()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .comment-box {
    padding: $gap;
    @include common-bg-module();
    @include radius-box($lg-radius);
  }
</style>

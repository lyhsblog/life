<template>
  <placeholder
    :loading="fetching"
    :data="comments.length"
  >
    <template #loading>
      <ul class="comment-list-skeleton">
        <li v-for="item in 3" :key="item" class="item">
          <div class="gravatar">
            <skeleton-base />
          </div>
          <div class="content">
            <skeleton-paragraph :lines="4" />
          </div>
        </li>
      </ul>
    </template>
    <template #placeholder>
      <div class="list-empty">
        EMPTY
      </div>
    </template>
    <template #default>
      <transition-group
        name="list-fade"
        tag="ul"
        ref="listElement"
        class="comment-list"
      >
        <comment-item
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :liked="true"
        />
      </transition-group>
    </template>
  </placeholder>
</template>

<script>
  import CommentItem from './item.vue'
  import Placeholder from "../../widget-placeholder";
  import SkeletonLine from "../../skeleton/line";
  import SkeletonParagraph from "../../skeleton/paragraph";
  import Empty from "../../widget-empty";

  export default {
    name: 'CommentList',
    components: {
      CommentItem, Placeholder, SkeletonLine, SkeletonParagraph, Empty
    },
    props: {
      fetching: {
        type: Boolean,
        default: false
      },
      comments: {
        type: Array,
        required: true
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .comment-list-skeleton {
    padding: 0;

    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: $lg-gap;

      .gravatar {
        width: 5rem;
        height: 5rem;
      }

      .content {
        width: calc((100% - 5rem) * 0.9);
      }
    }
  }

  .list-empty {
    color: $text-secondary;
    font-weight: bold;
    text-align: center;
    line-height: 8rem;
  }

  .comment-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
</style>

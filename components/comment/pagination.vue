<template>
  <transition name="module">
    <div v-if="!fetching && pagination.totalPages > 1" class="pagination">
      <ul class="pagination-list">
        <li class="item prev">
          <span class="symbol">-</span>
          HOT
        </li>
        <li
          v-for="(item, index) in pagination.totalPages"
          :key="index"
          class="item"
        >
          <button
            class="pagination-btn"
            :class="{
              actived: false,
              disabled: true
            }"
          >
            {{ item }}
          </button>
        </li>
        <li class="item next">
          NEW
          <span class="symbol">-</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>

  export default {
    name: 'CommentPagination',
    props: {
      fetching: {
        type: Boolean,
        required: true
      },
      sort: {
        type: Number,
        required: true
      },
      pagination: Object
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .pagination {
    margin-top: $lg-gap;

    > .pagination-list {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      list-style-type: none;

      > .item {
        $item-size: 2rem;
        margin: 0 0.5em;

        &.prev,
        &.next {
          display: inline-block;
          width: 4em;
          height: $item-size;
          line-height: $item-size;
          font-size: $font-size-small;
          text-align: center;
          color: $text-disabled;

          .symbol {
            margin: 0 $xs-gap;
          }

          &:hover {
            background: none;
          }
        }

        .pagination-btn {
          display: inline-block;
          width: $item-size;
          height: $item-size;
          line-height: $item-size;
          text-align: center;
          @include radius-box($mini-radius);
          @include background-transition();

          &.disabled {
            cursor: no-drop;
            opacity: .5;
          }

          &.actived,
          &:hover {
            background-color: $module-bg-darker-1;
          }
        }
      }
    }
  }
</style>

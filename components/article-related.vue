<template>
  <div class="related">
    <ul class="articles" key="articles">
      <li
        :class="{ disabled: false }"
        class="item"
      >
        <router-link
          class="item-article"
          to="/"
        >
          <div class="thumb"/>
          <div class="title">title</div>
        </router-link>
      </li>
      <li
        :class="{ disabled: false }"
        class="item"
      >
        <router-link
          class="item-article"
          to="/"
        >
          <div class="thumb"/>
          <div class="title">title</div>
        </router-link>
      </li>
      <li
        :class="{ disabled: false }"
        class="item"
      >
        <router-link
          class="item-article"
          to="/"
        >
          <div class="thumb"/>
          <div class="title">title</div>
        </router-link>
      </li>
      <li
        :class="{ disabled: false }"
        class="item"
      >
        <router-link
          class="item-article"
          to="/"
        >
          <div class="thumb"/>
          <div class="title">title</div>
        </router-link>
      </li>
      <li
        :class="{ disabled: false }"
        class="item"
      >
        <router-link
          class="item-article"
          to="/"
        >
          <div class="thumb"/>
          <div class="title">title</div>
        </router-link>
      </li>
      <li
        :class="{ disabled: false }"
        class="item"
      >
        <router-link
          class="item-article"
          to="/"
        >
          <div class="thumb"/>
          <div class="title">title</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ArticleRelated',
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .related {
    overflow: hidden;

    .skeleton-list {
      padding: 0;
      margin: 0;
      height: 9rem;
      overflow: hidden;
      display: flex;

      .article {
        width: 12rem;
        margin-right: 1rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .articles {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      overflow: hidden;
      margin-bottom: -$gap;

      .item {
        float: left;
        width: calc((100% - #{$gap * 2}) / 3);
        margin-right: $gap;
        margin-bottom: $gap;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &.disabled {
          pointer-events: none;
          opacity: .8;
        }

        &:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 0;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: .8;
          transition: opacity $transition-time-normal;

          .thumb {
            width: 100%;
            height: 7.4rem;
            background-color: $module-bg-darker-2;
            background-size: cover;
            background-position: 50% 40%;
            transition: background-position $transition-time-fast * 2;
          }

          .title {
            display: block;
            width: 100%;
            padding: 0 1em;
            line-height: 2.4;
            text-align: center;
            font-size: $font-size-small;
            color: $text-secondary;
            transition: color $transition-time-fast;
            @include text-overflow();
          }

          &:hover {
            opacity: 1;

            .thumb {
              background-position: 50% 50%;
            }

            .title {
              color: $link-color;
            }
          }
        }
      }
    }

    &.mobile {
      .articles {
        .item {
          width: calc((100% - #{$gap}) / 2);
          margin-right: $gap;
          margin-bottom: $gap;
          &:nth-child(2n) {
            margin-right: 0;
            margin-bottom: 0;
          }

          .thumb {
            height: 6rem;
          }
        }
      }
    }
  }
</style>

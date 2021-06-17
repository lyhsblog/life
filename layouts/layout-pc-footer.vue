<template>
  <footer id="footer" class="footer">
    <div class="container">
      <a
        class="ipc"
        :href="VALUABLE_LINKS.FUCK_IPC"
        v-if="false"
      >
        陕 ICP 备 13004859 号-2
      </a>
      <a
        class="sitemap-btn"
        target="_blank"
        :href="VALUABLE_LINKS.SITE_MAP"
      >
        sitemap
      </a>
      <span class="separator">|</span>
      Powered By
      <a class="item" :href="VALUABLE_LINKS.NODEPRESS">
        NuxtJs
      </a>
      ,
      <a class="item" :href="VALUABLE_LINKS.VUE">
        Vue
      </a>
      和 日月星辰 强力驱动
      <span class="separator">|</span>
      <router-link key="zh" to="/">吾之臂躯</router-link>
      <span> 行针步线</span>
    </div>
  </footer>
</template>

<script>
  import LINKS from '../config/links'
  export default {
    name: 'pc-footer',
    data () {
      return {
        VALUABLE_LINKS: LINKS,
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .footer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: $footer-height;
    margin-top: $lg-gap;
    @include common-bg-module();

    .container {
      color: $text-secondary;
      font-size: $font-size-h6;
      text-align: center;
      text-transform: uppercase;

      a {
        border-bottom: 1px solid transparent;
        &:hover {
          border-color: initial;
        }
      }

      .separator {
        margin: 0 $sm-gap;
      }

      .ipc {
        margin-right: $xs-gap;
      }
    }
  }
</style>

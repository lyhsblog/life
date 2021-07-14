<template>
  <div id="theme">
    <div class="switcher" :class="theme" @click="switchTheme">
      <i class="iconfont" :class="'icon-sunny'"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Theme',
    computed: {
      theme: function () {
        return this.$store.state.theme
      }
    },
    mounted() {
      this.$store.commit('cahngeTheme', localStorage.theme)
    },
    methods: {
      switchTheme: function () {
        localStorage.setItem('theme', localStorage.theme === 'dark' ? 'default' : 'dark');
        this.$store.commit('cahngeTheme', this.$store.state.theme === 'dark' ? 'default' : 'dark')
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  #theme {
    position: fixed;
    right: 0;
    top: 20%;

    .switcher {
      $size: $lg-gap * 2;
      width: $size;
      height: $size;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: $module-bg;
      border-left: $xs-gap solid $primary;
      border-top-left-radius: $xs-radius;
      color: $primary;
      opacity: 0.4;
      cursor: pointer;
      @include visibility-transition();

      &:hover {
        opacity: 1;
      }
    }
  }
</style>

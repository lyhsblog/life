<template>
  <div id="background">
    <div class="image" :class="{ dark: isDark }"></div>
  </div>
</template>

<script>
  export default {
    name: 'Background',
    computed: {
      isDark: function () {
        return this.$store.state.theme === 'dark'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  #background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: $z-index-underground;
    background-color: $body-bg;

    .image {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.3;
      background: cdn-url('~/static/images/background.png');

      &.dark {
        opacity: 0.2;
      }
    }
  }
</style>

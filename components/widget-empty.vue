<template>
  <div class="empty">
    <slot>
      <template v-if="placeholder">{{ placeholder }}</template>
      <template v-else>
        EMPTY_PLACEHOLDER
      </template>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'Empty',
    props: {
      placeholder: String
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .empty {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 5em;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: $text-dividers;
    letter-spacing: .1em;
  }
</style>

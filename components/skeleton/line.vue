<template>
  <div class="skeleton line" :style="style">
    <skeleton-base />
  </div>
</template>

<script>
  import SkeletonBase from './base.vue'
  export default {
    name: 'SkeletonLine',
    components: {
      SkeletonBase
    },
    props: {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      }
    },
    computed: {
      style: function () {
        const props = this.$props
        return {
          ...(props.width && { width: props.width + 'px' }),
          ...(props.height && { height: props.height + 'px' })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .skeleton.line {
    width: 100%;
    height: 100%;
  }
</style>

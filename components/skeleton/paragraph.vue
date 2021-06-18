<template>
  <div class="skeleton paragraph" :style="style">
    <skeleton-line
      v-for="line in lines"
      :key="line"
      :style="getLineStyle(line - 1)"
      class="paragraph-line"
    />
  </div>
</template>

<script>
  import SkeletonLine from './line.vue'
  export default {
    name: 'SkeletonParagraph',
    components: {
      SkeletonLine
    },
    props: {
      lines: {
        type: Number,
        default: 1
      },
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      align: {
        type: Boolean,
        default: false
      },
      lineHeight: {
        type: String,
        default: '1rem'
      }
    },
    computed: {
      style: function () {
        const props = this.$props
        return {
          ...(props.width && { width: props.width + 'px' }),
          ...(props.height && { height: props.height + 'px' })
        }
      },
      getLineStyle: function () {
        const props = this.$props
        return (index) => {
          const style = {
            height: props.lineHeight,
            marginBottom: index === props.lines - 1
              ? '0'
              : `calc(${props.lineHeight} * 0.75)`
          }
          const position = index % 3
          if (position) {
            const margin = 15 * position
            style.width = `${100 - margin}%`
            style.marginLeft = props.align ? '0' : '6%'
          }
          return style
        }
      }
    }
  }
</script>

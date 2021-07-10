<template>
  <span class="ua">
    <span class="os">
      <i
        class="iconfont"
        :class="`icon-windows`"
      />
      <span>windows10</span>
    </span>
    <span class="browser">
      <i class="iconfont" :class="`icon-chrome`" />
      <span>chrome90</span>
    </span>
  </span>
</template>

<script>

  export default {
    name: 'CommentUa',
    props: {
      ua: {
        type: String,
        required: true
      }
    },
    data() {
      return {
      }
    }
  }
</script>

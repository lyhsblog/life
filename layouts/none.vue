<template>
  <Nuxt />
</template>
<script>
 export default {
   methods: {
     holder: function () {
       this.$nextTick(() => {
         this.$nuxt.$loading.start()
         setTimeout(() => this.$nuxt.$loading.finish(), 2000)
       })
     }
   },
   watch: {
     '$route'(to, from) {
       if (to.fullPath !== from.fullPath) {
         this.holder()
       }
     }
   },
   mounted() {
     this.holder()
   },
 }
</script>

<template>
  <Nuxt />
</template>
<script>
 export default {
   async fetch() {
     const holder = this.$loading.show({
       // Optional parameters
       loader: 'bars',
       container: null,
     })
     setTimeout(() => {
       holder.hide()
     },1000)
   },
   methods: {
     holder: function () {
       const holder = this.$loading.show({
         // Optional parameters
         loader: 'bars',
         container: null,
       })
       setTimeout(() => {
         holder.hide()
       },2000)
     }
   },
   watch: {
     '$route'(to, from) {
       if (to.fullPath !== from.fullPath) {
         this.$nextTick(() => {
           this.holder()
         })
       }
     }
   }
 }
</script>

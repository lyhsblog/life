<template>
  <div v-if="loading" class="loading-page" @touchmove.prevent="avoidScroll($event)">
    <div class="vld-icon">
      <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" width="128" height="128">
        <circle cx="15" cy="15" r="15">
          <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
          <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity="0.3">
          <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate>
          <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate>
        </circle>
        <circle cx="105" cy="15" r="15">
          <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate>
          <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate>
        </circle>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    avoidScroll(event){
      event.preventDefault()
    },
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  right: 0;
  color: #0088f5;
  backdrop-filter: blur(2px);
  opacity: 0.8;
  z-index: 1000;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

}
</style>

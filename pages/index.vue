<template>
  <div class="index-page">
    <archive-carrousel />
    <archive-announcement
      :announcements="announcements"
      :fetching="fetching"
    />
    <article-list />
  </div>
</template>

<script>
  import ArchiveCarrousel from "../components/archive-carrousel";
  import ArchiveAnnouncement from "../components/archive-announcement";
  import ArticleList from "../components/article-list";
  export default {
    name: 'Index',
    components: {ArticleList, ArchiveAnnouncement, ArchiveCarrousel},
    data() {
      return {
        fetching: false,
        announcements: [
          {
            'content': '12223311'
          },
          {
            'content': '12223312'
          },
          {
            'content': '12223313'
          },
          {
            'content': '12223314'
          },
          {
            'content': '12223315'
          }
        ]
      }
    },
    mounted() {
      this.loadHot()
    },
    methods: {
      async loadHot() {
        this.$store.commit("LayoutPcRightArticle/fetching", true)
        const res = await this.$axios.get("/article/related")
        if(!res.data.empty) {
          for (const item of res.data.content) {
            item.url = "/article/"+item.id
          }
        }
        this.$store.commit("LayoutPcRightArticle/cleanHotArticle")
        this.$store.commit("LayoutPcRightArticle/addHotArticle", res.data.content)
        this.$store.commit("LayoutPcRightArticle/fetching", false)
      }
    }
  }
</script>

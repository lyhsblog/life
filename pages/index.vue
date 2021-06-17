<template>
  <div class="index-page">
    <archive-carrousel
      :articles="articles"
      :fetching="false"
    />
    <archive-announcement
      :announcements="announcements"
      :fetching="false"
    />
    <article-list
      :mammon="false"
      :fetching="false"
      :articles="articles"
      :pagination="pagination"
    />
  </div>
</template>

<script>
  import ArchiveCarrousel from "../components/archive-carrousel";
  import ArchiveAnnouncement from "../components/archive-announcement";
  import ArticleList from "../components/archive-list";
  export default {
    name: 'Index',
    components: {ArticleList, ArchiveAnnouncement, ArchiveCarrousel},
    data() {
      return {
        articles: [
          {
            ad: false,
            url: '/article/1',
            src: '/article/1.jpg',
            thumb: '/article/1.png',
            title: 'articletitle',
            description: 'iamdesc1'
          },
          {
            ad: false,
            url: '/article/1',
            src: '/article/1.jpg',
            thumb: '/article/1.png',
            title: 'articletitle',
            description: 'iamdesc2'
          }

        ],
        pagination: {

        },
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
    }

  }
</script>

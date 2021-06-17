export const state = () => ({
  hotArticles: [],
  articleList: []
})

export const mutations = {
  addHotArticle(state, articles) {
    state.hotArticles.push(...articles)
  },
  addArticleList(state, articles) {
    state.articleList.push(...articles)
  },
}

export const actions = {
  loadHotArticles (state) {
    state.commit('addHotArticle', [
      {
        id: 1,
        ad: false,
        url: '/article/1',
        src: '/article/1.jpg',
        thumb: '/article/1.png',
        title: 'articletitle1',
        description: 'iamdesc1'
      },
      {
        id: 2,
        ad: false,
        url: '/article/1',
        src: '/article/1.jpg',
        thumb: '/article/1.png',
        title: 'articletitle2',
        description: 'iamdesc2'
      }
    ])
  },
  loadArticleList(state) {
    state.commit('addArticleList', [
      {
        id: 1,
        ad: false,
        url: '/article/1',
        src: '/article/1.jpg',
        thumb: '/article/1.png',
        title: 'articletitle1',
        description: 'iamdesc1'
      },
      {
        id: 2,
        ad: false,
        url: '/article/1',
        src: '/article/1.jpg',
        thumb: '/article/1.png',
        title: 'articletitle2',
        description: 'iamdesc2'
      }
    ])
  }
}

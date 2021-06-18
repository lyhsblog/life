export const state = () => ({
  hotArticles: [],
  articleList: [],
  article: {
    id: 1,
    ad: false,
    url: '/article/1',
    src: '/article/1.jpg',
    thumb: '/article/1.png',
    title: 'articletitle1',
    description: 'iamdesc1'
  },
  relatedArticles: [
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
    },
    {
      id: 3,
      ad: false,
      url: '/article/1',
      src: '/article/1.jpg',
      thumb: '/article/1.png',
      title: 'articletitle2',
      description: 'iamdesc2'
    },
    {
      id: 4,
      ad: false,
      url: '/article/1',
      src: '/article/1.jpg',
      thumb: '/article/1.png',
      title: 'articletitle2',
      description: 'iamdesc2'
    },
    {
      id: 5,
      ad: false,
      url: '/article/1',
      src: '/article/1.jpg',
      thumb: '/article/1.png',
      title: 'articletitle2',
      description: 'iamdesc2'
    },
    {
      id: 6,
      ad: false,
      url: '/article/1',
      src: '/article/1.jpg',
      thumb: '/article/1.png',
      title: 'articletitle2',
      description: 'iamdesc2'
    },
    {
      id: 7,
      ad: false,
      url: '/article/1',
      src: '/article/1.jpg',
      thumb: '/article/1.png',
      title: 'articletitle2',
      description: 'iamdesc2'
    }
  ]
})

export const mutations = {
  addHotArticle(state, articles) {
    state.hotArticles.push(...articles)
  },
  addArticleList(state, articles) {
    state.articleList.push(...articles)
  },
  setArticle(state, article) {
    state.article = article
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
  loadArticleList(state, data) {
    state.commit('addArticleList', data)
  },
}

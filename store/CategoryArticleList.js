export const state = () => ({
  category: '',
  articleList: {
    content: [],
    empty:true,
    first:true,
    last:true,
    number:0,
    numberOfElements:0,
    size:10,
    totalElements:0,
    totalPages: 0,
  },
})

export const mutations = {
  setCategory(state, category) {
    state.category = category
  },
  setArticleList(state, articleList) {
    state.articleList = articleList
  },
  pushArticleList(state, articleList) {
    const content = [...state.articleList.content,...articleList.content]
    const unique = new Map();
    state.articleList = articleList
    state.articleList.content = content.filter((item) => !unique.has(item.id) && unique.set(item.id, 1))
  }
}

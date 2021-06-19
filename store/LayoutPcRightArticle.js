export const state = () => ({
  hots: [],
  fetching: true,
})

export const mutations = {
  addHotArticle(state, articles) {
    state.hots.push(...articles)
  },
  cleanHotArticle(state) {
    state.hots = []
  },
  fetching(state, fetching) {
    state.fetching = fetching
  },
}

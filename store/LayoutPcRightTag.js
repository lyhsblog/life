export const state = () => ({
  tags: [],
  fetching: true,
})

export const mutations = {
  addTags(state, tags) {
    state.tags.push(...tags)
  },
  cleanTags(state) {
    state.tags = []
  },
  fetching(state, fetching) {
    state.fetching = fetching
  },
}


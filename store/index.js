export const state = () => ({
  slideOpened: false,
  searchFor: 'manga',
  theme: 'default',
  barraging: false,
})

export const mutations = {
  changeSearchFor(state, searchFor) {
    state.searchFor = searchFor
  },
  changeSlideOpened(state, slideOpened) {
    state.slideOpened = slideOpened
  },
  cahngeTheme(state, theme) {
    state.theme = theme
  },
  changeBarraging(state, barragin) {
    state.barraging = barragin
  }
}

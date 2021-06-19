export const state = () => ({
  slideOpened: false,
  searchCall: () => '',
  theme: 'dark',
  barraging: false,
})

export const mutations = {
  changeSearchCall(state, callback) {
    state.searchCall = callback
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

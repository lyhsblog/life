export const state = () => ({
  slideOpened: false,
  theme: 'default',
  barraging: false,
})

export const mutations = {
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

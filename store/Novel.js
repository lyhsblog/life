export const state = () => ({
  novelList: {
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
  setNovelList(state, novelList) {
    state.novelList = novelList
  },
  pushNovelList(state, novelList) {
    const content = [...state.novelList.content,...novelList.content]
    const unique = new Map();
    state.novelList = novelList
    state.novelList.content = content.filter((item) => !unique.has(item.id) && unique.set(item.id, 1))
  }
}

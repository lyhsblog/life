export const state = () => ({
  mangaList: {
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
  setMangaList(state, mangaList) {
    state.mangaList = mangaList
  },
  pushMangaList(state, mangaList) {
    const content = [...state.mangaList.content,...mangaList.content]
    const unique = new Map();
    state.mangaList = mangaList
    state.mangaList.content = content.filter((item) => !unique.has(item.id) && unique.set(item.id, 1))
  }
}

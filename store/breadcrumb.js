export const UPDATE_ITEMS = 'update-items'

export const state = () => ({
  items: []
})

export const mutations = {
  [UPDATE_ITEMS]: (state, value) => {
    state.items = value
  }
}

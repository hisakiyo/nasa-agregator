import Cookie from 'js-cookie'
export const strict = false

export const state = () => ({
  user: null,
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
    login({ commit }, account) {
        // Cookie.set('access_token', token, { expires: 365 })
        // commit('SET_USER', {})
    },

    logout({ commit }) {
        Cookie.remove('access_token')
        commit('SET_USER', null)
    },
}
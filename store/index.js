/*

import Vuex from 'vuex'
const store = () =>
  new Vuex.Store({
    state: () => ({
      token: '',
      mainNav: []
    }),
    mutations: {
      setMainNav(state, nav) {
        state.mainNav = nav
      },
      logIn(state, token) {
        state.token = token
      },
      logOut(state) {
        state.token = ''
      },
      initialiseStore(state) {
        if (localStorage.getItem('store')) {
          this.replaceState(
            Object.assign(state, JSON.parse(localStorage.getItem('store')))
          )
        }
      }
    },
    getters: {
      userComponentsArr: state => {
        return state.mainNav.map(item => item.url)
      }
    }
  })

// Init store from localStorage on load
store.commit('initialiseStore')
// Update localstorage for every mutation
store.subscribe((_mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store

*/

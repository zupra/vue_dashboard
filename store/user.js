export const state = () => ({
  token: '',
  mainNav: []
})

export const mutations = {
  setMainNav(state, nav) {
    state.mainNav = nav
  },
  logIn(state, token) {
    state.token = token
  },
  logOut(state) {
    state.token = ''
  }
}

export const getters = {
  userComponentsArr: state => {
    return state.mainNav.map(item => item.link)
  },
  userReport: state => {
    return state.mainNav
      .filter(item => item.link.includes('report'))
      .map(item => ({
        title: item.name,
        name: item.link.split('/')[1]
      }))
  },
  userGraph: state => {
    return state.mainNav
      .filter(item => item.link.includes('graph'))
      .map(item => ({
        title: item.name,
        name: item.link.split('/')[1]
      }))
  }
}

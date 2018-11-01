export const state = () => ({
  token: '', //sessionStorage.getItem('token') || '',
  mainNav: [] //JSON.parse(sessionStorage.getItem('main_nav')) || []
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
    return state.mainNav.map(item => item.url)
  },
  userReportArr: state => {
    return state.mainNav.map(item => item.name)
  }
  // getReportTitle: state => name => {
  //   return state.mainNav.filter(item => item.name === name)[0].link
  // }
}

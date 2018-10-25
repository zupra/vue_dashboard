export default function({ store, route, redirect }) {
  if (
    !store.state.user.token ||
    !store.getters['user/userComponentsArr'].includes(route.name)
  ) {
    return redirect('/login')
  }

  //!store.getters['user/userComponentsArr'].includes(route.name)
  //return console.log(store.getters['user/userComponentsArr'])
}

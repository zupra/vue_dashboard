export default function({ store, route, redirect }) {
  if (!store.state.user.token) {
    return redirect('/login')
  }

  // else
  //   console.log(
  //     route.name,
  //     !store.state.user.token,
  //     store.getters['user/userComponentsArr'],
  //     ~store.getters['user/userComponentsArr'].indexOf(route.name)
  //   )
}

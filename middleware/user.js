export default function({ store, route, redirect }) {
  if (
    !store.state.user.token
    //~store.getters['user/userComponentsArr'].indexOf(route.name)
    //!!store.getters['user/userComponentsArr'].includes(route.name)
  ) {
    return redirect('/login')
  } else
    console.log(
      route.name,
      !store.state.user.token,
      store.getters['user/userComponentsArr'],
      ~store.getters['user/userComponentsArr'].indexOf(route.name)
    )

  //!store.getters['user/userComponentsArr'].includes(route.name)
  //return console.log(store.getters['user/userComponentsArr'])
}

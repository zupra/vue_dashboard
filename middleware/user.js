export default function({ store, redirect }) {
  //store.state.auth.loggedIn
  if (store.state.user.token) {
    return redirect('/login')
  }
}

// Authorization
export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.user.token) {
      config.headers.common['Token'] = store.state.user.token
      // console.log('set headers token')
    }
  })
}

// Authorization
export default function({ $axios, store }) {
  /*
  $axios.onRequest(config => {
    if (store.state.user.token) {
      config.headers.common['Token'] = store.state.user.token
      // console.log('set headers token')
    }
  })
  */

  // $axios.create({
  //   baseURL: process.env.baseUrl
  // })

  if (store.state.user.token) {
    $axios.setHeader('Token', store.state.user.token)
  }
}

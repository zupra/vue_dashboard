import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  return new VuexPersistence({
    // options
    key: 'user',
    modules: ['user'],
    storage: sessionStorage
  }).plugin(store)
}

<template lang="pug">
.Wrap
  h1 report base component
  h2 report {{ name }}
</template>

<script>
export default {
  // validate({ params }) {
  //   return params.name
  // }
  data() {
    return {}
  },
  asyncData({ store, params, error }) {
    if (!store.getters['user/userReports'].includes(params.name)) {
      return error({ message: 'report/name not found', statusCode: 404 })
    }
    return params
  }
}
</script>

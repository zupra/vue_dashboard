<template lang="pug">
.Wrap
  h1 Please select an report #NAME
  nav.list-Card
    nuxt-link(
      v-for="report in reportList",
      :to="report",
      :key="report"
    ) {{report}}
</template>

<script>
export default {
  data() {
    return {
      reportList: this.$store.getters['user/userReports']
    }
  }
}
</script>

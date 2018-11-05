<template lang="pug">
.Wrap

  h1 Здесь будет генератор новых отчётов
  h2 А пока список готовых отчётов:
  nav.listNav_Card
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
      reportList: this.$store.getters['user/userReportArr']
    }
  }
}
</script>

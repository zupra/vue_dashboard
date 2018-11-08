<template lang="pug">
.Breadcrumbs
  nuxt-link(to="/")
    svg(width="26", height="24")
      path(d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z")
    | Home
  nuxt-link(
    v-for="link, i in breadcrumbsLinks"
    :key="i"
    :to="link"
  ).breadcrumps__level {{link.meta.title}}
</template>

<script>
export default {
  computed: {
    breadcrumbsLinks() {
      let tmp = []
      if (this.$route.matched) {
        this.$route.matched.forEach(link => {
          tmp.push(
            Object.assign({ meta: { title: 'Title not found in meta' } }, link)
          )
        })
      }
      if (tmp.length === 0) {
        tmp.push({ path: '/', meta: { title: 'Home' } })
      }
      return tmp
    }
  }
}
</script>

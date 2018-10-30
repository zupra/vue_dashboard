<template lang="pug">
.Wrap
  h1 Protection page
  .btn.fill.red(@click="getData") Fetch Data
  pre {{Data}}

</template>


<script>
//- import Logo from '~/components/Logo.vue'
export default {
  // middleware: 'user',
  components: {
    // Logo
  },
  data() {
    return {
      Data: []
    }
  },
  methods: {
    getData() {
      // fetch('//jsonplaceholder.typicode.com/comments')
      //   .then(resp => resp.json())
      //   .then(data => (this.Data = data))
      this.$axios.get(`/cars`).then(res => (this.Data = res.data))
    }
  }
}
</script>

<style>
</style>

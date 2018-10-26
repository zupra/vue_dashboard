<template lang="pug">
.Wrap
  h1 Protection page
  .btn.fill.red(@click="getUsers") Fetch Data
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
    getUsers() {
      fetch('//jsonplaceholder.typicode.com/comments')
        .then(resp => resp.json())
        .then(data => (this.Data = data))
    }
  }
}
</script>

<style>
</style>

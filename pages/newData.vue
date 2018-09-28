<template lang="pug">
.Wrap
  .btn.fill.red(@click="getUsers") Fetch Data
  pre {{Data}}

</template>


<script>
//- import Logo from '~/components/Logo.vue'
export default {
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

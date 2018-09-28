<template lang="pug">
.Wrap
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
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      fetch('//jsonplaceholder.typicode.com/comments')
        .then(resp => resp.json())
        .then(data => (this.Data = data))
    }
  }
}
</script>

<style>
</style>

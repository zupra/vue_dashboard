<template lang="pug">
.MainFullWidth
  h1 Test Grid
  .Grid
    each _,i in Array(16)
      //- if item === 'B' || item === 'G'
      if i === 3 || i === 1 || i === 8 || i === 10
        .box.height_2x Widget #{i+1}
          .flex
            img(src="~/static/img/spinner.svg")

      else
        .box Widget #{i+1}
          .flex
            img(src="~/static/img/spinner.svg")


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
  methods: {}
}
</script>

<style lang="styl">

.MainFullWidth
  margin: 1em


.Grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  grid-auto-rows: minmax(200px, auto)
  grid-gap: 1em
.box
  border 1px solid #CCC
  padding: 1em
  background: #EEE
.height_2x
  grid-row-end: span 2

.box
.flex
  display: flex
.box
  flex-direction: column


.flex
  flex 1
  img
    margin: auto

</style>

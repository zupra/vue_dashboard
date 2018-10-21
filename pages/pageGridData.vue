<template lang="pug">
.MainFullWidth
  h1 Test Grid
  .Grid
    each _,i in Array(16)
      //- if item === 'B' || item === 'G'
      if i === 3 || i === 1 || i === 8 || i === 10
        .box.height_2x Widget #{i+1}
          LineChart(style="position: relative;width: 100%")
          BarChart(style="position: relative;width: 100%")
          //- .flex
          //-   img(src="~/static/img/spinner.svg")

      else
        .box Widget #{i+1}
          MixedBarLine(style="position: relative;width: 100%")


</template>


<script>
import BarChart from '~/components/Chart/BarChart.js'
import LineChart from '~/components/Chart/LineChart.js'
import MixedBarLine from '~/components/Chart/MixedBarLine.js'

export default {
  components: {
    BarChart,
    LineChart,
    MixedBarLine
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


.Grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(280px, auto))
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
  justify-content: space-between;

.flex
  flex 1
  img
    margin: auto

</style>

<template lang="pug">
.MainFullWidth
  h1 Test Grid
  .Grid
    each _,i in Array(16)
      //- if item === 'B' || item === 'G'
      if i === 3 || i === 1 || i === 8 || i === 10
        .box.height_2x Widget #{i+1}
          BarChart(
            style="position: relative;width: 100%",
            :data={
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets: [
                {
                  type: 'line',
                  label: 'GitHub Commits',
                  backgroundColor: 'rgba(237, 85, 101,.5)',
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                }
              ]
            }
          )
          BarChart(
            style="position: relative;width: 100%",
            :data={
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets: [
                {
                  label: 'GitHub Commits',
                  backgroundColor: 'rgba(237, 85, 101,.5)',
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                }
              ]
            }
          )
          //- .flex
          //-   img(src="~/static/img/spinner.svg")

      else
        .box Widget #{i+1}
          BarChart(
            style="position: relative;width: 100%",
            :data={
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets: [
                {
                  type: 'line',
                  label: 'label 1',
                  backgroundColor: 'rgba(237, 85, 101,.5)',
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                },
                {
                  type: 'bar',
                  label: 'label 2',
                  backgroundColor: 'rgba(38, 166, 154,.5)',
                  data: [11, 12, 20, 40, 80, 39, 40, 10, 39, 12, 20, 40]
                }
              ]
            }
          )


</template>


<script>
import BarChart from '~/components/Chart/BarChart.js'

export default {
  components: {
    BarChart
  },
  data() {
    return {
      Data: []
    }
  },
  methods: {}
}
</script>


<style lang="stylus" scoped>

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

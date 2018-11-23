<template lang="pug">
//- .Wrap
.MainFullWidth

  h1 {{ title }}
  //- h2 report:{{ name }} extend report component
  //- pre toolbar:{{toolbar}}

  fieldset
    legend Доступные поля <b>{{ name }}</b>

    h1 Доступные поля

  //- .slice(0,2)
  //- template(v-if="chart.type == 'BarChart'")
  template(v-if="Data")
    div(
      style="display:inline-flex"
      v-for="chart in Data.chart_list"
    )
      h2 {{chart.title}}
      BarChart(
        v-if="chart.type == 'BarСhart'"
        style="position: relative;width: 100%",
        :height="100"
        :data="chart.data"
      )
      PieChart(
        v-if="chart.type == 'PieСhart'"
        :height="500"
        :data="chart.data"
      )



  pre {{Data}}
</template>

<script>
import { mapGetters } from 'vuex'
import PieChart from '~/components/Chart/PieChart.js'
import BarChart from '~/components/Chart/BarChart.js'

export default {
  name: 'Graph',
  validate({ store, params }) {
    return store.getters['user/userGraph'].some(
      item => item.name == params.name
    )
  },
  components: {
    BarChart,
    PieChart
  },
  data() {
    return {
      Data: null,
      spinner: false
    }
  },
  // `http://betclub.com/atlas/graph/index/${params.name}`
  async asyncData({ app, params }) {
    // app.$axios.defaults.baseURL = app.isDev
    //   ? process.env.DEV_API
    //   : process.env.PROD_API
    // `/graph/index/${params.name}`
    // `http://betclub.com/atlas/graph/index/${params.name}`

    let { data } = await app.$axios.$get(
      `http://betclub.com/atlas/graph/index/${params.name}`
    )
    return {
      name: params.name,
      Data: data
    }
  },
  computed: {
    title() {
      return this.$store.getters['user/userGraph'].filter(
        item => item.name === this.name
      )[0].title
    }
    // ...mapGetters({
    //   userReportArr: 'user/userReportArr'
    // })
  },
  methods: {}
}
</script>

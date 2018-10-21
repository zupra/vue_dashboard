import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  mounted() {
    // Переопределение базового рендер метода с реальными данными.
    this.renderChart(
      {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        // datasets: [
        //   {
        //     label: 'GitHub Commits',
        //     backgroundColor: '#f87979',
        //     data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        //   }
        // ]
        datasets: [
          {
            type: 'bar',
            label: 'Bar Component',
            backgroundColor: 'rgba(248,121,121,.5)',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            type: 'line',
            label: 'Line Component',
            backgroundColor: 'rgba(71,183,132,.5)',
            data: [11, 12, 20, 40, 80, 39, 40, 10, 39, 12, 20, 40]
          }
        ]
      },
      {
        responsive: true
      }
    )
  }
}

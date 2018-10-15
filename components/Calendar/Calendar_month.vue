<template lang="pug">
div

  pre VAL = {{VAL}}

  .Calendar
    .Cr-Head
      .Cr-Head_ltMonth(@click="ltMonth") «
      .Cr-Head_currMonth {{currYear}}
      .Cr-Head_gtMonth(@click="gtMonth") »

    .monthsList
      time(
        v-for="m,i in months",
        :class="{currMonth: i==currMonth, CURR: i == CURR}",
        @click="CURR=i"
      ) {{m.slice(0,3)}}


</template>

<script>
const NOW = new Date()

export default {
  data() {
    return {
      inst_date: NOW,
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      CURR: NOW.getMonth()
    }
  },

  computed: {
    VAL() {
      const MonthStr =
        this.CURR >= 0 ? this.months[this.CURR] : this.months[this.currMonth]

      const MonthFormat =
        this.CURR + 1 < 10 ? '0' + (this.CURR + 1) : this.CURR + 1
      return {
        str: MonthStr + ' ' + this.currYear,
        format: this.currYear + '-' + MonthFormat + '-01'
      }
    },
    currYear() {
      return this.inst_date.getFullYear()
    },
    currMonth() {
      return this.inst_date.getMonth()
    }
  },
  methods: {
    ltMonth() {
      this.inst_date = new Date(this.currYear - 1, this.currMonth)
    },
    gtMonth() {
      this.inst_date = new Date(this.currYear + 1, this.currMonth)
    }
  }
}
</script>


<style lang="stylus">
@import '~@/components/Calendar/_calendar.styl'
</style>

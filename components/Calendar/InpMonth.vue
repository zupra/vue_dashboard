<template lang="pug">
.Calendar_Input
  //- input(@click="show=!show" placeholder="дд мм гггг" :value="VAL.str", readonly)
  input(@click="show=!show" :value="VAL.str", readonly)
  .Calendar(v-show="show")
    .Cr-Head
      .Cr-Head_ltMonth.ripple(@click="ltMonth") «
      .Cr-Head_current {{currYear}}
      .Cr-Head_gtMonth.ripple(@click="gtMonth") »

    .monthsList
      time(
        v-for="m,i in months",
        :class="{currMonth: i==currMonth, CURR: i == CURR}",
        @click="CURR=i; show=false"
      ) {{m.slice(0,3)}}


</template>

<script>
const NOW = new Date()

export default {
  data() {
    return {
      show: false,
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
  mounted() {
    document.documentElement.addEventListener('click', this.close, false)
  },
  beforeDestroy() {
    document.documentElement.removeEventListener('click', this.close, false)
  },
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) this.show = false
    },
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

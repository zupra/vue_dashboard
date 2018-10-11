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
$width = 280px
$time = ($width / 7)
$M = ($width / 4)

.Calendar
  background #FFF
  // box-shadow 0 1em 6em -1em #000
  box-shadow: 0 0 20px rgba(#333 .5)
  width: $width
  text-align: center
  user-select: none
.Cr
  &-Head,
  &-Week,
  &-Days
    display: flex

  &-Head,
  &-Week
    font-weight bold

  &-Week
    line-height: 2em
    &_day
      width: $time

  &-Head
    background: #477dca
    color: #FFF
    justify-content: space-between
    line-height: $time

    &_currMonth
      flex: 1

    &_ltMonth,
    &_gtMonth
      background #3498db
      cursor: pointer
      width: $time
      &:hover
        background: #3498db + 10%

  &-Days
    flex-wrap: wrap
    line-height: $time

    &_blank,
    &_day
      width: $time

    &_blank
      color #dee2e6

    &_day
      cursor: pointer
      border-radius: 50%
      &:hover:not(.currDay):not(.clickedDay)
        background: #dee2e6

    .currDay
      background: #CCC
      position: relative
    .clickedDay
      color: #FFF
      font-weight: bold
      background: #477dca

//=====

.monthsList
  display: flex
  //color #477dca
  flex-wrap wrap
  line-height $time
time
  width: $M
  cursor pointer
  &:hover
    //background: #dee2e6
    outline 1px solid #dee2e6
    outline-offset -4px
.currMonth
  background #dee2e6
.CURR
  color #FFF
  background #477dca
</style>

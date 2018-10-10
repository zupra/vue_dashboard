<template lang="pug">
div
  div
    p сегодня: {{new Date().toLocaleDateString()}} г.
    p выбрано: &nbsp
      i(v-if='clickedDay')
        b {{output.str}} &nbsp;
        | format &nbsp;
        b {{output.format}}

  .Calendar
    .Cr-Head
      .Cr-Head_ltMonth(@click="ltMonth") «
      .Cr-Head_currMonth {{months[currMonth]}} {{currYear}}
      .Cr-Head_gtMonth(@click="gtMonth") »
    .Cr-Week
      .Cr-Week_day(v-for="day in days") {{day}}
    .Cr-Days
      .Cr-Days_blank(v-for="blank in daysOfPrevMonth") {{blank}}
      .Cr-Days_day(
        v-for="i in daysInMonth",
        :class="{currDay: i == currDay, clickedDay: i == clickedDay}",
        @click="setDate(i)"
      ) {{i}}
      .Cr-Days_blank(v-for="_,i in qtyDaysNextMonth") {{i+1}}


</template>

<script>
const NOW = new Date()

export default {
  name: 'Calendar',
  //components: {},
  // props: {
  //   field_from: [String, Boolean],
  //   field_to: [String, Boolean],
  //   prop_curr: [String, Number] // предучтановленное число текущего месяца # для вчера норм (new Date().getDate())-1
  // },
  data() {
    return {
      inst_date: NOW,
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек'
      ],
      clickedDay: null,
      output: {
        str: '', //19 Апр 2018
        format: '' //2018-04-19
      }
    }
  },

  computed: {
    currYear() {
      return this.inst_date.getFullYear()
    },
    currMonth() {
      return this.inst_date.getMonth()
    },
    currWD() {
      return this.inst_date.getDay()
    },
    currDay() {
      // !TODO wtf
      if (
        this.inst_date.getMonth() === NOW.getMonth() &&
        this.inst_date.getFullYear() === NOW.getFullYear()
      ) {
        return NOW.getDate()
      }
    },
    daysInMonth() {
      return new Date(this.currYear, this.currMonth + 1, 0).getDate()
    },
    _lastDateOfPrevMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDate()
    },
    _qtyDaysPrevMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDay()
    },
    daysOfPrevMonth() {
      return (
        this._qtyDaysPrevMonth &&
        Array.from(
          { length: this._qtyDaysPrevMonth },
          (v, k) => this._lastDateOfPrevMonth - this._qtyDaysPrevMonth + (k + 1)
        )
        /*
        Array.from(
          { length: this._qtyDaysPrevMonth },
          (v, k) => this._lastDateOfPrevMonth - k
        ).reverse()
        */
      )
    },
    qtyDaysNextMonth() {
      return 42 - (this.daysInMonth + this._qtyDaysPrevMonth)
    }
  },
  methods: {
    ltMonth() {
      this.clickedDay = null
      // this.clickedDay && this.reset()
      this.inst_date = new Date(this.currYear, this.currMonth - 1)
    },
    gtMonth() {
      this.clickedDay = null
      // this.clickedDay && this.reset()
      this.inst_date = new Date(this.currYear, this.currMonth + 1)
    },
    reset() {
      this.clickedDay = null
      // this.output.str = ''
      this.$emit('setdate', null)
    },
    setDate(day) {
      this.clickedDay = day

      const fixDay = day < 10 ? '0' + day : day
      const fixMonth =
        this.currMonth + 1 < 10
          ? '0' + (this.currMonth + 1)
          : this.currMonth + 1

      this.output.str = `${day} ${this.months[this.currMonth]} ${this.currYear}`
      this.output.format = `${this.currYear}-${fixMonth}-${fixDay}`

      this.$emit('setdate', this.output)
    }
  }
}
</script>

<style lang="stylus">
$width = 280px
$time = ($width / 7)


.Calendar
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


</style>

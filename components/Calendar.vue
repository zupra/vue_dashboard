<template lang="pug">
.Calendar
  div
    p сегодня: {{new Date().toLocaleDateString()}} г.
    p выбрано: &nbsp
      b(v-if='CURR') {{fixCURR}} {{months[currMonth]}} {{currYear}} г.
  .calendar
    .head
      b.ltMonth(@click='ltMonth') «
      b {{months[currMonth]}} {{currYear}}
      b.gtMonth(@click='gtMonth') »
    .week
      b(v-for='day in days') {{day}}
    .days
      span(v-for='blank in nullWeek')  
      time(v-for='i in daysInMonth', :class='{currDay: i == currDay, CURR: i == CURR}', @click='CURR = i') {{i}}


</template>

<script>
const NOW = new Date()

export default {
  name: 'Calendar',
  //components: {},
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
      CURR: null
    }
  },

  computed: {
    fixCURR() {
      return this.CURR <= this.daysInMonth ? this.CURR : this.daysInMonth
    },
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
      if (
        this.inst_date.getMonth() == NOW.getMonth() &&
        this.inst_date.getFullYear() == NOW.getFullYear()
      ) {
        return NOW.getDate()
      }
    },
    daysInMonth() {
      return new Date(this.currYear, this.currMonth + 1, 0).getDate()
    },
    nullWeek() {
      return new Date(this.currYear, this.currMonth, 0).getDay()
    }
  },
  methods: {
    ltMonth() {
      this.inst_date = new Date(this.currYear, this.currMonth - 1)
    },
    gtMonth() {
      this.inst_date = new Date(this.currYear, this.currMonth + 1)
    }
  }
}
</script>

<style lang="stylus" scoped>

$width = 280px
$time = $width/7

.head
.week
.days
  display flex

.calendar
  //box-shadow 0 1em 6em -1em #000
  box-shadow 0 0 20px rgba(#333 .5)
  width: $width
  text-align center
.week
  line-height 2em
  b
    width $time
.days
  flex-wrap wrap
  line-height $time

span
time
  width $time
time
  cursor pointer
  border-radius 50%
  &:hover:not(.currDay):not(.CURR)
    background #dee2e6
.currDay
  background rgba(red, .2)
  position relative

.CURR
  color #FFF
  font-weight bold
  background #477dca

.head
  user-select none
  background #EEE
  justify-content space-between
  line-height $time
.ltMonth
.gtMonth
  cursor pointer
  width $time
  &:hover
    background #EEE - 5%

</style>

<template lang="pug">
.Calendar_Input
  input(
    @click="show=!show"
    :value="output.str",
    readonly
  )
  .Calendar(v-show="show")
    .Cr-Head
      .Cr-Head_ltMonth.ripple(@click="ltMonth") «
      .Cr-Head_current {{months[currMonth].slice(0,3)}} {{currYear}}
      .Cr-Head_gtMonth.ripple(@click="gtMonth") »
    .Cr-Week
      .Cr-Week_day(v-for="day in days") {{day}}
    .Cr-Days
      .Cr-Days_blank(v-for="blank in daysOfPrevMonth") {{blank}}
      .Cr-Days_day(
        v-for="d in daysInMonth",
        :class="{Today: d == Today, clickedDay: d == clickedDay}",
        @click="setDate(d)"
      ) {{d}}
      .Cr-Days_blank(v-for="_,i in qtyDaysNextMonth") {{i+1}}
</template>

<script>
const NOW = new Date()
export default {
  props: {
    /*
      установка даты
      # для вчера норм
      :prop_setDateFrom="( d => new Date(d.setDate(d.getDate()-1)) )(new Date)"
      https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript
    */
    prop_setDateFrom: {
      type: Date,
      default: null
    },
    prop_setDateTo: {
      type: Date,
      default: null
    }
  },
  data() {
    return {
      show: false,
      inst_date: this.prop_setDateFrom ? this.prop_setDateFrom : NOW,
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октябрь',
        'Ноября',
        'Декабря'
      ],
      clickedDay: null,
      output: {
        str: '', //1 Апреля 2018
        format: '' //2018-04-01
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
    Today() {
      // !TODO wtf, TIMESTAMP?
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
      )
    },
    qtyDaysNextMonth() {
      return 42 - (this.daysInMonth + this._qtyDaysPrevMonth)
    }
  },
  watch: {
    prop_setDateTo() {
      this.inst_date = this.prop_setDateTo
      const setDate = this.prop_setDateTo.getDate()
      this.setDate(setDate)
    }
  },
  //первый старт
  created() {
    this.setDate(this.inst_date.getDate())
  },
  // updated() {
  //   console.error('updated')
  // },
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
      this.clickedDay = null
      this.inst_date = new Date(this.currYear, this.currMonth - 1)
    },
    gtMonth() {
      this.clickedDay = null
      this.inst_date = new Date(this.currYear, this.currMonth + 1)
    },
    setDate(day) {
      this.clickedDay = day
      /**готовим output
        output: {
          str: "1 Апреля 2018"
          format: "2018-04-01"
        }
      */
      const fixDay = day < 10 ? '0' + day : day
      const { output, months, currMonth, currYear } = this
      const fixMonth =
        currMonth + 1 < 10 ? '0' + (currMonth + 1) : currMonth + 1
      output.str = `${day} ${months[currMonth]} ${currYear}`
      output.format = `${currYear}-${fixMonth}-${fixDay}`

      this.$emit('setdate', this.output.format)
      this.show = false
    }
  }
}
</script>

<style lang="stylus">
@import '~@/components/Calendar/_calendar.styl'
</style>

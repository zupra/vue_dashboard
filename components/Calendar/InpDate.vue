<template lang="pug">
.Calendar_Input
  //- :placeholder="output.str ? output.str : `${Today} ${months[currMonth]} ${currYear}`"
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
        v-for="i in daysInMonth",
        :class="{Today: i == Today, clickedDay: i == clickedDay}",
        @click="setDate(i)"
      ) {{i}}
      .Cr-Days_blank(v-for="_,i in qtyDaysNextMonth") {{i+1}}
</template>

<script>
const NOW = new Date()
export default {
  props: {
    /*
      установка даты
      # для вчера норм https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript
    */
    prop_setDate: {
      type: Date,
      default: null
    }
  },
  data() {
    return {
      show: false,
      inst_date: this.prop_setDate ? this.prop_setDate : NOW,
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
    NOW() {
      return this.prop_setDate || NOW
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
    Today() {
      // !TODO wtf, TIMESTAMP?
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
      )
    },
    qtyDaysNextMonth() {
      return 42 - (this.daysInMonth + this._qtyDaysPrevMonth)
    }
  },
  created() {
    this.setDate(this.NOW.getDate())
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
      this.clickedDay = null
      this.inst_date = new Date(this.currYear, this.currMonth - 1)
    },
    gtMonth() {
      this.clickedDay = null
      this.inst_date = new Date(this.currYear, this.currMonth + 1)
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
      this.show = false
    }
  }
}
</script>

<style lang="stylus">
@import '~@/components/Calendar/_calendar.styl'
</style>

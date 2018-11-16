<template lang="pug">
.Calendar_period
  span За период с &nbsp;
    InpDate(
      @setdate="v =>From=v",
      :prop_setDateFrom="( d => new Date(d.setDate(d.getDate()-1)) )(new Date)"
    )
    | &nbsp; по &nbsp;
    InpDate(
      @setdate="v =>To=v",
      :prop_setDateTo="setTo"
    )

  .error(
    v-show="error",
    class="ERROR text-danger"
  ) Неверный период времени (Начало > Конец)
</template>

<script>
import InpDate from '~/components/Calendar/InpDate.vue'

export default {
  components: {
    InpDate
  },
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
      From: '',
      To: '',
      setTo: null
    }
  },
  computed: {
    newDate() {
      if (this.From && this.To) return { from: this.From, to: this.To }
      // get() {
      //   if (this.From && this.To) return { from: this.From, to: this.To }
      // },
      // set(newDate) {
      //   this.$emit('onDate', newDate)
      // }
    },
    error() {
      return this.From > this.To
    }
  },
  watch: {
    error(error) {
      if (error) this.setTo = new Date(this.From)
    },
    newDate(newDate) {
      this.$emit('period', newDate)
    }
  }
}
</script>

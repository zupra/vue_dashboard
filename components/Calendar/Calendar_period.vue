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
  data() {
    return {
      From: '',
      To: '',
      setTo: null
    }
  },
  computed: {
    error() {
      return this.From > this.To
    }
  },
  watch: {
    error(error) {
      if (error) this.setTo = new Date(this.From)
    }
  }
}
</script>

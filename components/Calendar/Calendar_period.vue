<template lang="pug">
.Calendar_period
  span За период с &nbsp;
    InpDate(
      :prop_setDate="( d => new Date(d.setDate(d.getDate()-1)) )(new Date)"
    )
    | &nbsp; по &nbsp;
    InpDate

  .error(
    v-if="From && To && From.format > To.format",
    class="ERROR text-danger"
  ) Неверный период времени (FROM > TO)
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
      To: ''
    }
  }
}
</script>

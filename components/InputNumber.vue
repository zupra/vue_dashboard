<template lang="pug">
.InputNumber.button-group
  .btn(@click="(value - step >= min) && minus(step)") -
  .InputNumber_Field
    b {{value}}
  .btn(@click="(value + step <= max) && plus(step)") +

</template>
<script>
export default {
  props: {
    start: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      value: this.start
    }
  },
  methods: {
    plus(step) {
      this.value += step
      this.$emit('number', this.value)
    },
    minus(step) {
      this.value -= step
      this.$emit('number', this.value)
    }
  }
}
</script>

<style lang="stylus">
.InputNumber
  //display inline-flex
  &_Field
    width 3em
    //border 1px solid #CCC
    display flex
    justify-content center
    align-items center

</style>

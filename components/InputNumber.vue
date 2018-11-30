<doc>
https://github.com/JayeshLab/vue-numeric-input/blob/master/src/vue-numeric-input.vue
</doc>


<template lang="pug">
.InputNumber.button-group
  .btn(@click="(value - step >= min) && minus(step)") -
  //- v-model="value"
  //- :value="value"
  //- @input="onInput"
  //- v-model.number.lazy="value"
  input.InputNumber_Field(
    @input.number="onInput"
    v-model="value"
  )
  .btn(@click="(value + step <= max) && plus(step)") +

</template>
<script>
export default {
  props: {
    start: {
      type: [Number, String],
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
      value: Number(this.start)
    }
  },
  watch: {
    start(val) {
      this.value = Number(val)
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
    },
    onInput(e) {
      console.log(e)
      if (/[\d\.]+/i.test(e.target.value)) {
        this.$emit('number', e.target.value)
      }
      // this.value = e.target.value
      // if (/[0-9]/.test(e.target.value)) this.value = e.target.value
      // let keyCode = e.keyCode ? e.keyCode : e.which
      // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      //   // 46 is dot
      //   e.preventDefault()
      // }
    }
    // toNumber (val) {
    //   let num = parseFloat(val)
    //   if (isNaN(val) || !isFinite(val)) {
    //     num = 0
    //   }
    //   return num
    // },
  }
}
</script>

<style lang="stylus">
.InputNumber
  //display inline-flex
  &_Field
    width 5em

    border-radius: 0 !important
    border-left 0 !important
    border-right 0 !important
    box-shadow: none !important
    padding 0 !important
    text-align center



    //border 1px solid #CCC
    // display flex
    // justify-content center
    // align-items center
    // b
    //   margin auto

</style>

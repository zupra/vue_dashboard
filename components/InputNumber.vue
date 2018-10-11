<template lang="pug">
.InputNumber
  .btn(@click="minus") -
  //- input(readonly, :value="value")
  .InputNumber_Field
    b {{value}}
  .btn(@click="plus") +

</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: undefined
    },
    step: {
      type: Number,
      default: 1
    }
  },
  methods: {
    plus() {
      this.value++
      // this.$emit('change', newValue, oldValue)
    },
    minus() {
      this.value--
    }
  }
}
</script>

<style lang="stylus">
.InputNumber
  display flex
  &_Field
    width 3em
    border 1px solid #CCC
    display flex
    justify-content center
    align-items center

</style>

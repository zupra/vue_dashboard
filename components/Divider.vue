<template lang="pug">
.Divider(:id="title")
  .Divider__title # {{title}}


</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Divider'
    }
  }
}
</script>
<style lang="stylus">
.Divider
  padding 4rem 0 2rem
  font bold 22px/1 "Courier New", Courier, monospace
  color #FFF
  &__title
    background #ead2ac
    padding .2em 1em 0
</style>

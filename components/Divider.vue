<template lang="pug">
.Divider
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
  margin 3rem
  background #ead2ac
  padding .5rem 1em
  font bold 22px/1 "Courier New", Courier, monospace
  color #FFF
  //&__title
</style>

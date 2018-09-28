<template lang="pug">
.Divider
  .Divider__title {{title}}

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
  // background #EEE
  margin 3rem 1rem
  position relative

  line-height 22px
  font-size: 22px;
  text-align center
  &:before
    content ''
    display block
    transform translateY(12px)
    height: 1px
    background-image: linear-gradient(to right, rgba(#000, 0), rgba(violet 0.75), rgba(#000, 0));
  &__title
    position relative
    display: inline-block;
    background: white;
    padding 0 .5em
</style>

<template lang="pug">
.Expander
  .Expander__trigger(@click='open = !open')

    svg.Expander__trigger-Icon(:class='{open:open}', width='40', height='12', stroke='cornflowerblue')
      polyline(points='12,2 20,10 28,2', stroke-width='3', fill='none')
    | {{ title }}


  transition(:name='animation')
    .Expander__body(v-show='open')
      slot
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },
    animation: {
      type: String,
      default: 'rightToLeft'
      // validator: prop => ['leftToRight', 'bounceIn', 'bottomToTop'].includes(prop)
    }
  },
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="stylus" scoped>

.Expander__trigger
  position relative
  &:before {
      transition: opacity .1s linear, transform .35s ease-in-out;
      position: absolute;
      border-bottom: 1px solid currentColor;
      content: '';
      width: 100%;
      left: 0;
      bottom: 0;
  }
  &:not(:hover)::before {
      transform: scaleX(0);
      opacity: 0;
  }


.Expander
  &__trigger
    cursor pointer
    padding .7rem .5rem
    border-top 1px solid #efefef
    //transition all .4s
    //background #dee2e6
    &:hover
      color #477dca

    &-Icon
      transition transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)
      &.open
        stroke tomato
        transform rotate(180deg)

  &__body
    padding 1rem 1.5rem
    background #eff0f2 //#dee2e6 //#f1f1f1


.rightToLeft-enter-active
  animation rightToLeft .5s;
.rightToLeft-leave-active
  animation rightToLeft .5s reverse
@keyframes rightToLeft
  0%
    transform: translateX(100vw)
  50%
    transform: translateX(-2em)
  100%
    transform: translateX(0)


.leftToRight-enter-active
  animation leftToRight .5s;
.leftToRight-leave-active
  animation leftToRight .5s reverse
@keyframes leftToRight
  0%
    transform: translateX(-100vw)
  50%
    transform: translateX(2em)
  100%
    transform: translateX(0)


.bounceIn-enter-active
  animation bounceIn .3s;
.bounceIn-leave-active
  animation bottomToTop .2s reverse
@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.bottomToTop-enter-active
  animation bottomToTop .5s forwards;
.bottomToTop-leave-active
  animation bottomToTop .5s reverse
@keyframes bottomToTop
  0%
    opacity 0
    transform: translateY(100%)
  100%
    transform: translateY(0)
</style>

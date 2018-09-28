<template lang="pug">
mixin content_1()
    h3 Lorem ipsum dolor sit amet
    p Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis explicabo porro, voluptatum laborum cumque molestiae quibusdam accusamus sed, quam sint ducimus libero distinctio? Dolore laborum, quos dolorem recusandae deleniti quasi.
div
  h1 Expander

  .Tag base expander
  expander(title='base expander:rightToLeft')
    ol.textList
      li HERE expander Content

  .Tag expander animation:leftToRight
  expander(title='expander animation:leftToRight', animation='leftToRight')
    ol.textList
      li HERE expander Content

  .Tag expander animation:bounceIn
  expander(title='expander animation:bounceIn', animation='bounceIn')
    ol.textList
      li HERE expander Content

  .Tag expander animation:bottomToTop
  expander(title='expander animation:bottomToTop', animation='bottomToTop')
    ol.textList
      li HERE expander Content

  br
  h2 Accordion
  .Accordion
    expander(title='base expander:rightToLeft')
      +content_1()
    expander(title='expander animation:leftToRight', animation='leftToRight')
      +content_1()
    expander(title='expander animation:bounceIn', animation='bounceIn')
      +content_1()
    expander(title='expander animation:bottomToTop', animation='bottomToTop')
      +content_1()
  br
  br
</template>

<script>
import Expander from '~/components/Expander.vue'
export default {
  components: {
    Expander
  }
}
</script>

<template lang="pug">
.Wrap
  <divider title="Цвет" />
  #palette
    each clr in ['#ed5565','#26a69a','#3498db','#ff9800','#477dca','#dee2e6','#3c4858']
      figure
        div(style="width:5em;height:4em;background-color:"+clr)
        figcaption #{clr}
  <divider title="ShadowPoligon" />
  shadow-poligon

  .flex-row.items-start
    nav.Card
      each link in ['Mark as important','Create event','Restore contacts']
        a(href="#")= link
      a.active(href="#") Lorem ipsum
    nav.Card
      each item in [1,2,3,4,5]
        a(href="#") link_#{item}
    ul.Card
      li.active На Волне Yum.fm
      each item in ['Радио Best FM','Радио ENERGY','Rock FM 95.2','Радио ПАССАЖ','Радио Maximum','Авторадио','Зайцев FM']
        li #{item}

  <divider title="Calendar" />
  calendar
  hr.H1
  dropdown
  <divider title="Multifilter" />
  <multifilter-test />

  <divider title="Modal" />
  <modal-test />
  <divider title="Expander" />
  <expander-test />

  //- UI
  <ui-test />
</template>


<script>
import MultifilterTest from '~/components/MultifilterTest.vue'
import ModalTest from '~/components/ModalTest.vue'
import ExpanderTest from '~/components/ExpanderTest.vue'
import Divider from '~/components/Divider.vue'
import UiTest from '~/components/UiTest.vue'
import Dropdown from '~/components/Dropdown.vue'
import ShadowPoligon from '~/components/ShadowPoligon.vue'
import Calendar from '~/components/Calendar.vue'

export default {
  components: {
    UiTest,
    Divider,
    ModalTest,
    ExpanderTest,
    MultifilterTest,
    Dropdown,
    ShadowPoligon,
    Calendar
  },
  data() {
    return {}
  }
}
</script>

<style lang="stylus">
#palette
  display: flex;
  justify-content: center;
  text-align center
  figure
    margin: 1em;
</style>

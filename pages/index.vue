<template lang="pug">
.Wrap
  PaginationTest
  hr
  UiSelectTest
  <divider title="Цвет" />
  #palette
    each clr in ['#ed5565','#26a69a','#3498db','#ff9800','#477dca','#dee2e6','#C7CEDE','#3c4858','#34495e','#568DA6']
      figure
        div(style="width:5em;height:4em;background-color:"+clr)
        figcaption #{clr}
  <divider title="ShadowPoligon" />
  ShadowPoligon

  .Flex_wr
    .col
      .Tag nav>a
      nav.list-Card(style="display: inline-grid")
        each link in ['Mark as important','Create event','Restore contacts']
          a(href="#")= link
        a.active(href="#") Lorem ipsum
    .col
      .Tag nav>a
      nav.list-Card(style="display: inline-grid")
        each item in [1,2,3,4,5]
          a(href="#") link_#{item}
    .col
      .Tag ul>li
      ul.list-Card(style="display: inline-grid")
        li.active На Волне Yum.fm
        each item in ['Радио Best FM','Радио ENERGY','Rock FM 95.2','Радио ПАССАЖ','Радио Maximum','Авторадио','Зайцев FM']
          li #{item}

  <divider title="Calendar" />

  Calendar
  Calendar_month

  hr.H1
  Dropdown

  <divider title="Multifilter" />
  MultifilterTest
  <divider title="Modal" />
  ModalTest
  <divider title="Expander" />
  ExpanderTest

  //- UI
  UiTest

  <divider title="Иконки" />
  IconsTest
  br
  hr
  br
</template>


<script>
import UiSelectTest from '~/components/UiSelectTest.vue'
import MultifilterTest from '~/components/MultifilterTest.vue'
import ModalTest from '~/components/ModalTest.vue'
import ExpanderTest from '~/components/ExpanderTest.vue'
import Divider from '~/components/Divider.vue'
import UiTest from '~/components/UiTest.vue'
import Dropdown from '~/components/Dropdown.vue'
import ShadowPoligon from '~/components/ShadowPoligon.vue'
import IconsTest from '~/components/IconsTest.vue'

import Calendar from '~/components/Calendar/Calendar.vue'
import Calendar_month from '~/components//Calendar/Calendar_month.vue'

import PaginationTest from '~/components/Pagination/PaginationTest.vue'

export default {
  //layout: 'lite',
  components: {
    PaginationTest,
    UiTest,
    Divider,
    ModalTest,
    ExpanderTest,
    MultifilterTest,
    Dropdown,
    ShadowPoligon,
    Calendar,
    Calendar_month,
    UiSelectTest,
    IconsTest
  },
  data() {
    return {}
  }
}
</script>

<style lang="stylus">
#palette
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align center
  figure
    margin: 1em;
</style>

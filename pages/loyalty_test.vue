<template lang="pug">
.MainFullWidth


  Modal(
    :show.sync="showModal_Region"
  )
    label.field Название
      span
        input.lg
    label.field Описание
      textarea.lg
    label.field Image
      div(style="display: flex; flex-direction: column; align-items: flex-start;")
        input(type="file")
        img(src="https://imgplaceholder.com/240x180")



  Modal(
    :show.sync="showModal_setCard"
    position="rModal"
  )

    h2(slot='title') Карта &nbsp;
      b.brightStr {{curr_card.name}} / RU off-Line

    label.field Название
      input.lg(v-model="curr_card.name")
    label.field Описание
      textarea.lg
    //- label.field Расчёт
    //-   table
    //-     tr
    //-       each th in ['TH','TH']
    //-         th #{th}
    //-     each _,i in Array(10)
    //-       tr
    //-         td data_#{i+1}
    //-         td.td_buttonGroup
    //-           input(value="50", style="width:55px;text-align:center")
    label.field IMG карты
      input(type="file")
      img(src="https://imgplaceholder.com/240x180")

    fieldset
      legend Баллы
      //- .form-line
      //- | min &nbsp;
      //- input(
      //-   style="width:5em"
      //-   type="number")
      //- | &nbsp; max &nbsp;
      //- input(
      //-   style="width:5em"
      //-   type="number"
      //- )    margin-left: 1rem;
      p.flex.x_sb
        | min &nbsp;
        InputNumber
      div.flex.x_sb
        | max &nbsp;
        InputNumber
    label.field Срок действия
      span
        InputNumber
        | &nbsp; месяцев
      //- input(type="date", value="2019-01-08")




  Modal(
    :show.sync="showModal_setExtras"
  )
    h2(slot="title") categoryName &nbsp;
      b.brightStr RU off-Line

    .flex
      label.field Имя категории услуг
        input.lg(value="categoryName")
      label.field(style="margin-left: 1rem;") Действие
        select.lg
          option Action 1
          option Action 2
          option Action 3
          option Action 4
    label.field Описание
      textarea.lg Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo accusamus impedit cumque repudiandae tempora blanditiis, similique reiciendis explicabo.
    //- label.field Карточка услуги
    //-   input(type="file")
    //-   img(src="https://imgplaceholder.com/240x180")

    //- hr
    //- center
    //- h4 Подкатегории

    table
      tr
        each th in ['#','Name','Img','Value']
          th #{th}
      each _,i in Array(10)
        tr
          td
            .btn_icon.red
              img(src="https://icongr.am/feather/trash-2.svg?size=18&color=ffffff")

          each _,i in Array(3)
            td
              input
          //- td.td_buttonGroup
          //-   input(value="Name", style="width:70px;text-align:center")
          //- td.td_buttonGroup
          //-   input(value="Img", style="width:70px;text-align:center")
          //- td.td_buttonGroup
          //-   input(value="Value", style="width:70px;text-align:center")

    .btn
      img.icon(src="https://icongr.am/feather/folder-plus.svg?size=18&color=ffffff")
      | new


  Modal(:show.sync="showModal_CardExtras")

    //- h3
    //-   span.brightStr Регион RU off-Line
    h2(slot='title') categoryName + subName
      b.brightStr RU off-Line

    fieldset
      legend Подкатегории
      .checked-group
        each item,i in ['эконом','комфорт','Vip']
          label
            input(type='radio', name='radio')
            span.ripple #{item}
    //- .Flex_wr
    //-   .Card(
    //-     style="padding: 1em 1em .5em"
    //-   )
    //-     h4 Подкатегории
    //-     p.flex.x_sb.y_center эконом &nbsp;
    //-       SwitchTgl
    //-     p.flex.x_sb.y_center комфорт &nbsp;
    //-       SwitchTgl
    //-     p.flex.x_sb.y_center Vip &nbsp;
    //-       SwitchTgl


    label.field Описание услуги
      textarea.lg(
        style="width: 100%"
      ) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo accusamus impedit cumque repudiandae tempora blanditiis, similique reiciendis explicabo tenetur. Eligendi eveniet nobis dolorem molestiae deleniti reprehenderit laudantium, explicabo illo inventore
    //- label.field Цена услуги
    //-   span
    //-     input.lg(type="number", value="50")
    //-     | &nbsp; баллов
    label.field SubCategory
      div
        select.lg
          option SubCategory 1
          option SubCategory 2
          option SubCategory 3
          option SubCategory 4




  h1 Программа лояльности &nbsp;
    b.brightStr Регион RU off-Line &nbsp;
    .btn_icon.orange(@click="showModal_Region = true")
      img(src="https://icongr.am/feather/settings.svg?size=24&color=ffffff")
  .form-line
    span Регион &nbsp;
      select.lg
        option RU off-Line
        option RU on-Line
        option KZ off-Line
        option KZ on-Line

    .btn.lg Добавить карту
    .btn.lg Добавить услугу


  //- .table-responsive
  //-   .row.row_TH
  //-     .item Категории:

  //-     center.item(v-for="card in CARDS")
  //-       b {{card.name}} &nbsp;
  //-       //- .btn.outline.blue(@click="setCard(card)") setCard
  //-       .btn_icon.green(@click="setCard(card)")
  //-         img(src="https://icongr.am/feather/settings.svg?size=24&color=ffffff")

  //-   //- ===============
  //-   each item in ['Такси','Ресторан','Гостиница','Сауна']
  //-     .row
  //-       each _,i in Array(5)
  //-         if i === 0
  //-           .item
  //-             SwitchTgl
  //-             .btn_icon(@click="showModal_setExtras = true")
  //-               img(src="https://icongr.am/feather/settings.svg?size=24&color=ffffff")
  //-             .btn_icon.red
  //-               img(src="https://icongr.am/feather/trash-2.svg?size=24&color=ffffff")
  //-             | #{item}
  //-         else
  //-           .item.flex.x_sb.y_center
  //-             small
  //-               //- em(v-for="item in ['эконом, ','комфорт, ','Vip']") {{item}}
  //-             .btn_icon(@click="showModal_CardExtras = true")
  //-               img(src="https://icongr.am/feather/edit.svg?size=24&color=ffffff")
  //-             //- center.form-line
  //-             //-   SwitchTgl(:yes="false")
  //-             //-   .btn.outline(@click="showModal_CardExtras = true") set
  //- hr.H1



  .table-responsive
    //- .table_distance
    table.table_col.table_distance.table_striped
      tr
        th Категории:
        th(v-for="card in CARDS")
          | {{card.name}} &nbsp;
          .btn_icon.green(@click="setCard(card)")
            img(src="https://icongr.am/feather/settings.svg?size=18&color=ffffff")
      each item in ['Такси','Ресторан','Гостиница','Сауна']
        tr
          each _,i in Array(5)
            if i === 0
              td
                SwitchTgl
                .btn_icon(@click="showModal_setExtras = true")
                  img(src="https://icongr.am/feather/settings.svg?size=24&color=ffffff")
                .btn_icon.red
                  img(src="https://icongr.am/feather/trash-2.svg?size=24&color=ffffff")
                | #{item}
            else
              td
                small
                  //- em(v-for="item in ['эконом, ','комфорт, ','Vip']") {{item}}
                .btn_icon(@click="showModal_CardExtras = true")
                  img(src="https://icongr.am/feather/edit.svg?size=24&color=ffffff")


</template>




<script>
const CARDS = [
  { id: 'White', name: 'White' },
  { id: 'Silver', name: 'Silver' },
  { id: 'Gold', name: 'Gold' },
  { id: 'Black', name: 'Black' }
]

import Modal from '~/components/Modal.vue'
import SwitchTgl from '~/components/SwitchTgl.vue'
import InputNumber from '~/components/InputNumber.vue'
export default {
  components: {
    Modal,
    InputNumber,
    SwitchTgl
  },
  data() {
    return {
      CARDS: CARDS,
      curr_card: {},
      showModal_setCard: false,
      showModal_setExtras: false,
      showModal_CardExtras: false,
      showModal_Region: false
    }
  },
  methods: {
    setCard(card) {
      this.showModal_setCard = true
      this.curr_card = card
    }
  }
}
</script>




<style lang="stylus">
.brightStr
  color #000
  border-bottom .2em solid gold

.item
  padding .5em 1em

  &+&
    border-left 1px solid #ccc

.row_TH
  background #dee2e6 !important
  border-bottom none !important

.row
  &:hover
    background #FFF // beige + 20 //#EEE

  align-items center
  border-bottom 1px solid #ccc
  display grid
  // grid-template-columns: repeat(auto-fit, minmax(280px, auto))
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-columns repeat(5, 1fr)
  // grid-template-columns: minmax(200px, 3fr) 9fr;
  // grid-auto-rows: minmax(200px, auto)
  // grid-gap: 1em
</style>

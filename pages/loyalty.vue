<template lang="pug">
.MainFullWidth
  h1 Программа лояльности
  .form-line
    span Регион &nbsp;
      select.lg
        option RU off-Line
        option RU on-Line
        option KZ off-Line
        option KZ on-Line

    .btn.lg Добавить карту
    .btn.lg Добавить услугу


  //- position="rModal"
  //- mod="XL"
  Modal(
    :show.sync="showModal_TH"
    position="rModal"
    title="set CARD N"
  )
    .form-group
    label.field Статус карты
      input.lg
    label.field Описание
      textarea.lg

    label.field Расчёт
      table
        tr
          each th in ['TH','TH']
            th #{th}
        each _,i in Array(10)
          tr
            td data_#{i+1}
            td.td_buttonGroup
              input(value="50", style="width:55px;text-align:center")
    label.field IMG карты
      input(type="file")
      img(src="https://imgplaceholder.com/240x180")



  Modal(
    :show.sync="showModal_TD"
    position="lModal"
    title="Услуга"
  )


    label.field Имя услуги
      input.lg(value="title")
    label.field Описание
      textarea.lg Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo accusamus impedit cumque repudiandae tempora blanditiis, similique reiciendis explicabo.
    label.field Действие
      select.lg
        option Action 1
        option Action 2
        option Action 3
        option Action 4
    label.field Карточка услуги
      input(type="file")
      img(src="https://imgplaceholder.com/240x180")



  Modal(:show.sync="showModal_WTF", title="Услуга для статуса N")
    //- ul.textList
    //-   each item,i in [1,2,3,4,5]
    //-     li item #{item}

    .Flex_wr
      .Card(
        style="padding: 1em 1em .5em"
      )
        h4 Подкатегории
        p.flex.x_sb.y_center эконом &nbsp;
          SwitchTgl
        p.flex.x_sb.y_center комфорт &nbsp;
          SwitchTgl
        p.flex.x_sb.y_center Vip &nbsp;
          SwitchTgl
      .Card(
        style="padding: 1em 1em .5em"
      )
        h4 Регионы

        p.flex.x_sb.y_center RU off-Line &nbsp;
          SwitchTgl
        p.flex.x_sb.y_center RU on-Line &nbsp;
          SwitchTgl
        p.flex.x_sb.y_center KZ off-Line &nbsp;
          SwitchTgl
        p.flex.x_sb.y_center KZ on-Line &nbsp;
          SwitchTgl

    label.field Описание услуги
      textarea.lg(
        style="width: 100%"
      ) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo accusamus impedit cumque repudiandae tempora blanditiis, similique reiciendis explicabo tenetur. Eligendi eveniet nobis dolorem molestiae deleniti reprehenderit laudantium, explicabo illo inventore
    label.field Цена услуги
      span
        input.lg(type="number", value="50")
        | &nbsp; баллов






  .table-responsive
    .row.row_TH
      each item,i in ['','White','Silver','Gold','Black']
        if i === 0
          .item УСЛУГИ:
        //- else if i === 5
        //-   .item
        //-     .btn.lg Добавть карту
        else
          center.item
            b #{item} &nbsp;
            .btn.outline.blue(@click="showModal_TH = true") setCard

    //- ===============
    each item in ['Такси эконом','Такси комфорт','Такси VIP','Ресторан','Ресторан VIP','Сауна','Сауна VIP','Гостиница эконом','Гостиница комфорт','Гостиница VIP']
      .row
        each _,i in Array(5)
          if i === 0
            .item
              label
                .btn.flat.lg(@click="showModal_TD = true")
                  img(src="https://icongr.am/clarity/settings.svg")
                | #{item}
          //- else if i === 5
          //-   .item
          //-     .btn Добавть услугу
          else
            .item
              center.form-line
                SwitchTgl(:yes="false")
                .btn.outline.green(@click="showModal_WTF = true") WTF
                //- .btn.sm.outline More
                //- .btn.sm.outline More
                //- .btn.sm.outline More


</template>



<script>
import Modal from '~/components/Modal.vue'
import SwitchTgl from '~/components/SwitchTgl.vue'
export default {
  components: {
    Modal,
    SwitchTgl
  },
  data() {
    return {
      showModal_TH: false,
      showModal_TD: false,
      showModal_WTF: false
    }
  }
}
</script>




<style lang="stylus">
.item
  padding .5em 1em
  &+&
    border-left: 1px solid #ccc;


.row_TH
  background #dee2e6 !important
  border-bottom: none !important

.row
  &:hover
    background beige //#EEE
  align-items: center
  border-bottom: 1px solid #ccc;
  display: grid
  // grid-template-columns: repeat(auto-fit, minmax(280px, auto))
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-columns: repeat(5, 1fr);
  // grid-template-columns: minmax(200px, 3fr) 9fr;
  // grid-auto-rows: minmax(200px, auto)
  // grid-gap: 1em
</style>

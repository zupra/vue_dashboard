<template lang="pug">
.MainFullWidth
  h1 Loyalty
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
      label title
        input
      label description
        textarea
      .table-responsive
        table
          tr
            each _,i in Array(3)
              th thead_#{i+1}
          each _,i in Array(10)
            tr
              td data_#{i+1}
              td
                input(value="50", style="width:55px;text-align:center")
              td.td_buttonGroup
                .button-group
                  each styl,i in ['btn','btn fill red']
                    div(class=""+styl) action#{i+1}
      div карта
        br
        input(type="file")
        br
        img(src="https://imgplaceholder.com/240x180")



  Modal(
    :show.sync="showModal_TD"
    position="lModal"
    title="Стоимость услуги"
  )
    p Услуга стоит &nbsp;
      input(type="number", value="50")
      | &nbsp; баллов
    div карточка услуги
    input(type="file")
    br
    img(src="https://imgplaceholder.com/240x180")
    p Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo accusamus impedit cumque repudiandae tempora blanditiis, similique reiciendis explicabo tenetur. Eligendi eveniet nobis dolorem molestiae deleniti reprehenderit laudantium, explicabo illo inventore.


  Modal(:show.sync="showModal_WTF", title="Услуга для статуса N")
    ul.textList
      each item,i in [1,2,3,4,5]
        li item #{item}
    hr
    div карточка услуги
    input(type="file")
    br
    img(src="https://imgplaceholder.com/240x180")




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
                .btn.sm.outline More
                .btn.sm.outline More
                .btn.sm.outline More


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

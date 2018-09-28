<template lang="pug">
div
  h1 Модалки
  .form-line
    each item,i in ['Modal', 'Modal(toCenter)', 'Small Modal', 'Small(toCenter)', 'Large Modal', 'Right Modal', 'Left Modal']
      button.btn(@click="showModal_"+(i+1)+" = true") #{item}

  modal(:show.sync="showModal_1", title="Base Modal")
    p Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis explicabo porro, voluptatum laborum cumque molestiae quibusdam accusamus sed, quam sint ducimus libero distinctio? Dolore laborum, quos dolorem recusandae deleniti quasi.

  modal(:show.sync="showModal_2", mod="toCenter", title="Lorem ipsum dolor sit amet")
    p Blanditiis explicabo porro, voluptatum laborum cumque molestiae quibusdam accusamus sed, quam sint ducimus libero distinctio? Dolore laborum, quos dolorem recusandae deleniti quasi.


  modal(:show.sync="showModal_3", mod="SM")
    p Заголовок не был назначен, поэтому только тело
    h3 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    p Quod dignissimos voluptate iure eius cupiditate rem sed consequuntur itaque odio!

  modal(:show.sync="showModal_4", mod="SM toCenter", title="Small modal toCenter")
    p Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod dignissimos voluptate iure eius cupiditate rem sed consequuntur itaque odio. Assumenda dignissimos veritatis placeat nesciunt maiores vel fuga est odio magnam!

  modal(:show.sync="showModal_5", mod="XL", title='Окно для  «Широкого» контента')
    iframe(height='480', scrolling='no', title='Flexbox Overview', src='//codepen.io/dimaZubkov/embed/BZLqGv/?height=480&theme-id=0&default-tab=result&embed-version=2', frameborder='no', allowtransparency='true', allowfullscreen='true', style='width: 100%;')

  modal(:show.sync="showModal_6", position="rModal", title="Lorem ipsum dolor")
    h2 Lorem ipsum dolor sit amet consectetur adipisicing elit.
    p Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod dignissimos voluptate iure eius cupiditate rem sed consequuntur itaque odio. Assumenda dignissimos veritatis placeat nesciunt maiores vel fuga est odio magnam!
    h4 Magnam atque, accusamus deleniti, inventore pariatur voluptates eos officiis quasi officia magni reprehenderit ipsa nam ducimus, temporibus autem sunt odio quae iste.

  modal(:show.sync="showModal_7", position="lModal", title="Lorem ipsum dolor")
    h2 Lorem ipsum dolor sit amet consectetur adipisicing elit.
    p Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod dignissimos voluptate iure eius cupiditate rem sed consequuntur itaque odio. Assumenda dignissimos veritatis placeat nesciunt maiores vel fuga est odio magnam!
    h4 Magnam atque, accusamus deleniti, inventore pariatur voluptates eos officiis quasi officia magni reprehenderit ipsa nam ducimus, temporibus autem sunt odio quae iste.
  br
  .Tag modal from table
  .table-responsive
    table.table_col
      thead
        tr
          each _,i in Array(5)
            th thead_#{i+1}
      tbody
        each _,i in Array(2)
          tr
            each _,i in Array(4)
              td data_#{i+1}
            td.td_buttonGroup
              .button-group
                each styl,i in ['btn','btn fill red','btn fill green','btn fill orange']
                  div(class=""+styl, @click="showModal_"+(i+1)+" = true") вызвать модалку #{i+1}

</template>

<script>
import Modal from '~/components/Modal.vue'
export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal_1: false,
      showModal_2: false,
      showModal_3: false,
      showModal_4: false,
      showModal_5: false,
      showModal_6: false,
      showModal_7: false
    }
  }
}
</script>

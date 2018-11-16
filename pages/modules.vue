<template lang="pug">
.Wrap
  h1 Список моделей модели UserCards



  //.table-responsive
  table.table_hovered.table_striped.table_col
    tr
      each th in ['#','Поле','Название','Тип поля','Активное','Админка','Список','Поиск','Сортировка']
        th #{th}
    each _,i in Array(22)
      tr
        td
          i #{i+1}
        td thead_#{i+1}
          //- input(placeholder="placeholder_"+(i+1), disabled)
        td
          input.lg(placeholder="placeholder_"+(i+1))
        td
          select.lg
            each option in ["value_1", "value_2", "value_3", "value_4", "value_5"]
              option #{option}
          //- UiSelect(
          //-   name="ui_select"
          //-   placeholder="Выберите тип поля"
          //-   size="lg"
          //-   :options="options",
          //-   @option="OnSelect"
          //- )
        each _,i in Array(5)
          td.MY_TD
            SwitchTgl

</template>
<script>
const options = [
  {
    label: 'option_1',
    value: 1
  },
  {
    label: 'option_2',
    value: 2
  },
  {
    label: 'option_3',
    value: 3
  },
  {
    label: 'option_4',
    value: 4
  },
  {
    label: 'option_5',
    value: 5
  },
  {
    label: 'option_6',
    value: 6
  }
]
import SwitchTgl from '~/components/SwitchTgl.vue'
import UiSelect from '~/components/UiSelect.vue'
export default {
  components: {
    UiSelect,
    SwitchTgl
  },
  data() {
    return {
      selectedOption: {
        name: '',
        value: null
      },
      options: options
    }
  },
  methods: {
    OnSelect(option) {
      this.selectedOption = option
    }
    // OnOptionIdx(idx) {
    //   this.index = idx
    // }
  }
}
</script>

<style lang="stylus">
.MY_TD
  //width 1%
  width 6em
  text-align center
  //border-left 1px solid #dee2e6 //#c7cede

</style>

<template lang="pug">
.Wrap
  h1 USER

  HorizontalSort

  fieldset
    legend legend

    .checked-group
      each item in ['Активный','Администратор','Подтверждён','В черном списке',]
        label
          input(type='checkbox', name='checkbox', value='', checked )
          span.ripple  #{item}
      label
        input(type='checkbox', name='checkbox', value='')
        span.ripple Старбэт
    hr
    p
      | Активный &nbsp;
      SwitchTgl
      | &nbsp; Администратор &nbsp;
      SwitchTgl
      | &nbsp; Старбэт &nbsp;
      SwitchTgl
      | &nbsp; В черном списке &nbsp;
      SwitchTgl
      | &nbsp; Подтверждён &nbsp;
      SwitchTgl
    hr
    each item in ['Активный','Администратор','Старбэт','В черном списке','Подтверждён']
      label
        input(type='checkbox', name='checkbox', value=''+(i+1) )
        | #{item}
    hr
    label(v-for="item in LIST", @change="toggleActive(item)", :class="{ 'strike': !item.active}")
      input(type='checkbox', name='checkbox', :checked="item.active" )
      | {{item.name}}

  fieldset
    legend legend
    .field-group
      each item in ['Логин','Пароль','Группа','Имя','Фамилия','Отчество','Зал','Регион','Департамент']
        label #{item}
          input(placeholder=""+item)

  InpDate
  ul
    li(v-for="li in LI") {{li}}

  ul
    li(v-for="li in LI_2") {{li}}


</template>

<script>
const LIST = [
  {
    name: 'Активный',
    active: true
  },
  {
    name: 'Администратор',
    active: true
  },
  {
    name: 'Старбэт',
    active: false
  },
  {
    name: 'В черном списке',
    active: false
  },
  {
    name: 'Подтверждён',
    active: true
  }
]

const LI = [
  'Логин',
  'Пароль',
  'Группа',
  'Имя',
  'Фамилия',
  'Отчество',
  'Зал',
  'Регион',
  'Департамент',
  'Трудоустройство',
  'Оклад',
  'День рождения',
  'Гражданство',
  'Е-mail',
  'Место жительства',
  'Адрес регистрации',
  'Телефон',
  'Паспорт(SN)',
  'Испытательный срок',
  'Причина увольнения'
]

const LI_2 = [
  'Паспорт',
  'ИНН',
  'СНИЛС',
  'Вод.права',
  'Лиценз. на ТС',
  'Трудовое соглашение',
  'Договор',
  'Анкета',
  'Резюме',
  'Фото'
]

import InpDate from '~/components/Calendar/InpDate.vue'
import SwitchTgl from '~/components/SwitchTgl.vue'
import UiSelect from '~/components/UiSelect.vue'

import HorizontalSort from '~/components/Draggable/HorizontalSort.vue'
export default {
  components: {
    InpDate,
    UiSelect,
    SwitchTgl,
    //
    HorizontalSort
  },
  data() {
    return {
      LIST: LIST,
      LI: LI,
      LI_2: LI_2
    }
  },
  methods: {
    toggleActive: function(i) {
      i.active = !i.active
    }
  }
}
</script>


<style lang="stylus" scoped>
.strike
  text-decoration line-through
</style>

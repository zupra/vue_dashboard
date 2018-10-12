<template lang="pug">
fieldset
  legend UiSelect

  pre {{selectedOption}}

  h1 Vue custom SELECT
  p selectedOption: &nbsp;
    b {{selectedOption.name}}

  .flex-row
    .col
      .Tag size="sm"

      //- :index="index",
      //- @index="OnOptionIdx",
      ui-select(
        name="ui_select"
        :options="options",
        @option="OnSelect",
        size="sm"
      )
    .col
      .Tag base
      ui-select(
        name="ui_select"
        :options="options",
        @option="OnSelect"
      )
    .col
      .Tag size="lg"
      ui-select(
        name="ui_select"
        :options="options",
        @option="OnSelect",
        size="lg"
      )
    .col
      .Tag size="xl"
      ui-select(
        name="ui_select"
        :options="options",
        @option="OnSelect",
        size="xl"
      )

</template>

<script>
const options = [
  {
    label: 'Чак Норрис',
    value: 1
  },
  {
    label: 'Ванона Райдер',
    value: 2
  },
  {
    label: 'Саня ты в порядке',
    value: 3
  },
  {
    label: 'Лара Крофт',
    value: 4
  }
]

import UiSelect from '~/components/UiSelect.vue'
export default {
  components: {
    UiSelect
  },
  data() {
    return {
      selectedOption: {
        name: '',
        value: null
      },
      options: options
      // index: null
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

<style lang="stylus" scoped>

</style>

<template lang="pug">
fieldset
  legend UiSelect

  pre {{selectedOption}}

  h1 Vue custom SELECT
  p selectedOption:
    pre {{selectedOption}}


  //- .Flex_wr
  //-   .col
  //-     .Tag size="sm"
  //-     UiSelect(
  //-       :options="options",
  //-       size="sm"
  //-     )
  //-   .col
  //-     .Tag base
  //-     UiSelect(
  //-       :options="options",
  //-     )
  //-   .col
  //-     .Tag size="lg"
  //-     UiSelect(
  //-       :options="options",
  //-       size="lg"
  //-     )
  //-   .col
  //-     .Tag size="xl + ripple"
  //-     UiSelect(
  //-       :ripple="true"
  //-       :options="options",
  //-       size="xl"
  //-     )

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
    label: 'Саня сказал убрать',
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
      selectedOption: null,
      options: options
      // index: null
    }
  },
  methods: {
    // OnSelect(option) {
    //   this.selectedOption = option
    // }
    // OnOptionIdx(idx) {
    //   this.index = idx
    // }
  }
}
</script>

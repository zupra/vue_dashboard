<template lang="pug">
// pre {{iconsArr}}
// https://icongr.am/{library name}/{icon}.svg?[options]

.scrollable_50vh
  fieldset
    legend ИКОНКИ https://icongr.am/{library name}/{icon}.svg?[options]
    .form-line
      span
        | выбрать цвет &nbsp;
        input(type="color" v-model="color")
        | выбрать размер &nbsp;
        //input(type="number" v-model="size")
        InputNumber(
          :start="size",
          :min="12",
          :max="200",
          @number="size = $event"
        )

    .Flex_wr
      .IconTest_item(v-for="icon in iconsArr")
        img(:src="'https://icongr.am/material/' + icon + '.svg?size=' + size + '&color=' + color.slice(1)")
        p {{icon}}

</template>



<script>
const iconsArr = [
  'account',
  'account-alert',
  'account-box',
  'account-box-multiple',
  'account-box-outline',
  'account-card-details',
  'account-check',
  'account-child',
  'account-child-circle',
  'account-circle',
  'account-convert',
  'account-details',
  'account-edit',
  'account-group',
  'account-heart',
  'account-key',
  'account-location',
  'account-minus',
  'account-multiple',
  'account-multiple-check',
  'account-multiple-minus',
  'account-multiple-outline',
  'account-multiple-plus',
  'account-multiple-plus-outline',
  'account-network',
  'account-off',
  'account-outline',
  'account-plus',
  'account-plus-outline',
  'account-remove',
  'account-search',
  'account-search-outline',
  'account-settings',
  'account-star',
  'account-supervisor',
  'account-supervisor-circle',
  'account-switch'
]

import InputNumber from '~/components/InputNumber.vue'
export default {
  components: {
    InputNumber
  },
  data() {
    return {
      iconsArr: iconsArr,
      color: '#477dca',
      size: 44
    }
  }
}
</script>

<style lang="stylus">
.scrollable_50vh
  height: 50vh;
  overflow-y: auto;

.IconTest_item
  text-align: center;
  padding: 1em;
  margin: 1em;
  border: 1px solid #CCC;
</style>

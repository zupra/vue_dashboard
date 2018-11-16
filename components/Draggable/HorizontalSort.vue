

<template lang="pug">

div
  //- pre {{items}}

  SortableList(
    v-model="items"
    axis="x"
    @input="v => $emit('sort', v)"
  )
    SortableItem(
      v-for="(item, index) in items"
      :index="index"
      :key="item.k"
      :item="item.v"
    )

</template>





<script>
/*
import { ContainerMixin, ElementMixin } from 'vue-slicksort'
const SortableList = {
  mixins: [ContainerMixin],
  render: function(createElement) {
    return createElement('div', { class: 'SortableList' }, this.$slots.default)
  }
}
const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  render: function(createElement) {
    return createElement('div', 'Ничего не найдено.')
  }
}
*/

import SortableList from '~/components/Draggable/SortableList.vue'
import SortableItem from '~/components/Draggable/SortableItem.vue'

export default {
  components: {
    SortableList,
    SortableItem
  },
  props: {
    arr: {
      type: Array,
      default: () => ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
    }
  },
  data() {
    return {
      items: []
    }
  },
  // computed: {
  //   items() {
  //     return this.arr
  //   }
  // }
  watch: {
    arr(arr) {
      this.items = arr
    }
  }
}
</script>



<style lang="stylus">
.SortableList

  margin-bottom 1em

.SortableItem
  display: inline-block;
  white-space: nowrap;
  padding .5em .7em
  background #EEE
  margin 2px
  cursor grabbing
  //display: flex;

</style>

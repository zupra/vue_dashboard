<template>
  <div class="SortableItem">{{ item }}</div>
</template>

<script>
import { ElementMixin } from 'vue-slicksort'
export default {
  mixins: [ElementMixin],
  props: {
    item: {
      type: String,
      required: true
    }
  }
  // computed: {}
}
</script>

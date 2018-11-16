<template>
  <div class="SortableList">
    <slot />
  </div>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort'
export default {
  mixins: [ContainerMixin]
}
</script>

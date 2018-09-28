<template lang="pug">
div
  .btn(v-click-outside='hide', @click='toggle', v-show="!opened") Toggle
  b(v-show="opened") &nbsp; ЛЮБОЙ КЛИК ЗАКРОЕТ ОКНО
  ul.Card(v-show='opened')
    li.active На Волне Yum.fm
    each item in ['Радио Best FM','Радио ENERGY','Rock FM 95.2','Радио ПАССАЖ','Радио Maximum','Авторадио','Зайцев FM']
      li #{item}

</template>

<script>
export default {
  data() {
    return {
      opened: false
    }
  },

  mounted() {
    // prevent click outside event with popupItem.
    // this.popupItem = this.$el
  },

  methods: {
    toggle() {
      this.opened = true
    },

    hide() {
      this.opened = false
    }
  }
}
</script>

<template lang="pug">
.Pagination
  .button-group
    .btn(
      :disabled="currPage === 0"
      @click="currPage--;$emit('slice', {slice:sliceData,curr:currPage})"
    ) « Prev
    .Pagination_currPage
      b {{currPage+1}}/{{totalPagesCount}}
    .btn(
      :disabled="currPage >= totalPagesCount -1"
      @click="currPage++;$emit('slice', {slice:sliceData,curr:currPage})"
    ) Next »
</template>

<script>
export default {
  props: {
    qty: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 1
    },
    setPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currPage: 0
    }
  },
  computed: {
    // currPage() {
    //   return this.setPage
    // },
    totalPagesCount() {
      return Math.floor(this.qty / this.perPage)
    },
    sliceData() {
      return [this.currPage * this.perPage, this.perPage * (this.currPage + 1)]
    }
  },
  methods: {
    // minus() {},
    // plus() {}
  }
}
</script>

<style lang="stylus">
.Pagination
  text-align center
  &_currPage
    display: flex
    user-select none
    width 4em
    b
      margin auto

</style>

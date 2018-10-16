<template lang="pug">

.Pagination

  .Pagination_Content
    template(v-for="item in DataSlice")
      slot(:itemData="item")



  .Pagination_Actions
    span
      | perPage &nbsp;
      InputNumber(
        :start="perPage",
        :step="4"
        :min="1",
        :max="120"
        @number="self_perPage = $event"
      )

    .button-group
      .btn(
        :disabled="currPage === 0"
        @click="currPage--"
      ) « Prev
      .Pagination_Actions_currPage
        b {{currPage+1}}/{{totalPagesCount}}
      .btn(
        :disabled="currPage >= totalPagesCount -1"
        @click="currPage++"
      ) Next »
</template>

<script>
import InputNumber from '~/components/InputNumber.vue'
export default {
  components: {
    InputNumber
  },
  props: {
    Data: {
      required: true,
      type: Array
    },
    currPage: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      self_perPage: this.perPage
    }
  },
  computed: {
    totalPagesCount() {
      return Math.floor(this.Data.length / this.self_perPage)
    },
    _slice() {
      return [
        this.currPage * this.self_perPage,
        this.self_perPage * (this.currPage + 1)
      ]
    },
    DataSlice() {
      return this.Data.slice(...this._slice)
    }
  }
}
</script>

<style lang="stylus">
.Pagination
  &_Content
    display flex
    flex-wrap wrap
    justify-content center

  &_Actions
    display: flex;
    justify-content: space-between;
    background: #efefef;
    padding: 1em;
    &_currPage
      display: flex
      user-select none
      width 4em
      b
        margin auto

</style>

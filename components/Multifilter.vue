<template lang="pug">

.Multifilter
  .Multifilter-search
    input.Search.lg(v-model="keyword", placeholder="Искать в списке")

  .Multifilter-list
    label(v-for="item in filteredData", :key="item")
      input(type="checkbox", name="checkboxGroup", :value="item", v-model="selected" )
      span(v-html="mark(item)")
    .ifNull(v-show="filteredData.length == 0", @click="keyword=''") не найдено
  .Multifilter-footer
    .Selected
      i(v-for="item,i in selected" @click="selected.splice(i,1)") {{' '+item}}
    .btn(:disabled="!selected.length") ОК

</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
    // item: []!
  },
  data() {
    return {
      keyword: '',
      selected: []
    }
  },
  computed: {
    filteredData() {
      return this.options.filter(item => {
        return item.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }
  },
  methods: {
    mark(word) {
      const regex = new RegExp('(' + this.keyword + ')', 'gi')
      return word.replace(regex, '<mark>$1</mark>')
    }
  }
}
</script>

<style lang="stylus">


.Multifilter
  box-shadow: 0 1px 8px rgba(0,0,0,.25);
  width 240px

  &-search
  &-footer
    padding .7em
  &-search
    input
      width 100%
  &-footer
    padding-top .3em
    overflow: auto;
    .btn
      margin-top: .5em;
      float right
  &-list
    padding .5em 0
    border-top 1px solid #EEE
    border-bottom 1px solid #EEE

    max-height: 240px;
    overflow-y: scroll;

    line-height 1.8em
    &:before
      content ''

    //!TODO
    label
      display block
      &:hover
        color #477dca
        background #efefef

.Multifilter
  .ifNull
    cursor pointer
    text-align center
    color blueviolet
    text-decoration underline

  .Selected
    font-size 10px
    i
      border 1px solid #dee2e6
      background #dee2e6
      display inline-block
      padding 0 3px
      line-height 1.6em
      border-radius 4px
      cursor pointer
      margin-right 3px
      margin-top 3px
      position relative
      &:before
        position absolute
        right -.3em
        top -.7em
        content '✘'
      &:hover
        background #EEE
        &:before
          color #ed5565



</style>

<template lang="pug">

.BigSelect
  .BigSelect_search
    .Search-hasReset
      .Search_Reset(v-show="keyword", @click="keyword=''")
      input.Search.lg(v-model="keyword", placeholder="Искать в списке")

  .BigSelect_list
    label(v-for="item in filteredData", :key="item")
      input(type="checkbox", name="checkboxGroup", :value="item", v-model="selected" )
      span(v-html="mark(item)")
    .ifNull(v-show="filteredData.length == 0", @click="keyword=''") не найдено
  .BigSelect_footer
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

.BigSelect
  background #FFF
  box-shadow: 0 1px 8px rgba(0,0,0,.25);
  width 240px

  &_search
  &_footer
    padding .7em
  &_search
    input
      width 100%
  &_footer
    padding-top 5px
    overflow: auto;
    .btn
      margin-top: .5em;
      float right
  &_list
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

.BigSelect
  .ifNull
    cursor pointer
    text-align center
    color blueviolet
    text-decoration underline

  .Selected
    font-size 10px
    i
      border 2px solid #dee2e6
      //background #dee2e6
      display inline-block
      padding 0 3px
      line-height 1.6em
      border-radius 4px
      cursor pointer
      margin-right 3px
      margin-top 3px
      position relative
      &:before
        content ""
        position absolute
        right -5px
        top -6px
        width 10px
        height 10px
        //border-radius 50%
        background #FFF url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><g stroke='#ed5565' stroke-width='4' stroke-linecap='round'><line x1='3' y1='3' x2='17' y2='17'/><line x1='3' y1='17' x2='17' y2='3'/></g></svg>") center/60% no-repeat
      &:hover
        background #EEE

</style>

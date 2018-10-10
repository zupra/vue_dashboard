<template lang="pug">
//- (v-click-outside="isOpen=false")
.Ui-select
  input.Ui-select_input(:class="[size]", :value="!selectedOption ? 'Please select an item' : selectedOption.label", readonly, @click="isOpen=true")

  transition(name="select")
    ul.Ui-select_list.Card(v-show="isOpen")
      li(v-for="(option,i) in options", @click="setOption(option,i)", :class="{selected:i==selectedItem}")
        | {{ option.label }}
</template>

<script>
export default {
  props: {
    options: {
      required: true,
      type: Array // { label: String, value: Any}
    },
    name: {
      required: true,
      type: String
    },
    // index: {
    //   type: [Number],
    //   default: null
    // },
    size: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedOption: null, //this.index ? this.options[this.index] : null,
      selectedItem: null, //this.index
      isOpen: false
    }
  },
  // computed: {
  //   selectedItem() {
  //     return this.index
  //   },
  //   selectedOption() {
  //     return this.options[this.index] && null
  //   }
  // },
  created() {
    // this.selectedOption = this.selected
    window.addEventListener('click', this.close)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.close)
  },
  methods: {
    setOption(option, i) {
      this.selectedItem = i
      this.selectedOption = option
      this.$emit('option', {
        name: this.name,
        value: option.value
      })
      // this.$emit('index', i)
      this.isOpen = false
    },
    close(e) {
      //console.log('this.$el ', this.$el)
      if (!this.$el.contains(e.target)) this.isOpen = false
    }
  }
}
</script>

<style lang="stylus">

// delay for rippleEffect
.select-leave-active
  transition opacity .5s

.Ui-select
  user-select none
  display inline-block
  position relative
  &_input
    background #fff url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='12'><polygon points='0,0 12,0 6,12' fill='orange'/></svg>") 100% no-repeat;
    cursor pointer
    padding-right: 22px !important

  &_list
    margin 0 //reset .Card
    position absolute
    background #FFF
    width 100%

  // ul
  //   position absolute
  //   background #FFF
  //   width 100%
  //   box-shadow 0 .2em 1.4em 0 rgba(0, 0, 0, 0.2)
  // li
  //   white-space: nowrap; /* Запрещаем перенос строк */
  //   overflow: hidden; /* Обрезаем все, что не помещается в область */
  //   text-overflow: ellipsis; /* Добавляем многоточие */

  //   cursor pointer
  //   color #477dca
  //   border-top 1px solid #EFEFEF

  //   padding 0 1em
  //   line-height: 2.4
  //   &.selected
  //     color #000
  //   &:hover
  //     background #f9f9f9
</style>

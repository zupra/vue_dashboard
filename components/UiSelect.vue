<template lang="pug">
//- (v-click-outside="isOpen=false")
.Ui-select
  input.Ui-select_input(:class="[size]", :value="!selectedOption ? placeholder : selectedOption.label", readonly, @click.stop="isOpen=true")

  transition(name="select")
    ul.Ui-select_list.listNav_Card(v-show="isOpen")
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
    size: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Выберите элемент'
    }
    // index: {
    //   type: [Number],
    //   default: null
    // }
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
    document.body.addEventListener('click', this.close)
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.close)
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
  transition opacity .3s

.Ui-select
  user-select none
  display inline-block
  position relative
  &_input
    background #fff url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='12'><polygon points='0,0 12,0 6,12' fill='orange'/></svg>") 100% no-repeat;
    cursor pointer
    padding-right: 22px !important

  &_list
    //reset .Card
    margin 0
    position absolute
    z-index 1
    width 100%

</style>

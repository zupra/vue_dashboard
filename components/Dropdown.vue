<template lang="pug">

//- v-click-outside='closeDropDown',
.Dropdown(
  v-click-outside='closeDropDown',
  aria-haspopup="true"
)
  .Dropdown_dt(@click="toggleDropDown")
    slot(name="btn", @click="toggleDropDown")

  .Dropdown_dd(v-show="isOpen")
    slot


</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropDown() {
      console.log('CLK')
      this.isOpen = !this.isOpen
    },
    closeDropDown() {
      this.isOpen = false
    }
  }
}
</script>

<style lang="stylus">
.Dropdown
  margin: 0.35em;

  position relative
  display: inline-block;
  &_dd
    position: absolute;
    z-index 1

    //asCard
    background: #fff;
    box-shadow: 0 1px 8px rgba(0,0,0,0.25);

.Dropdown_dd > *
  margin 0

</style>

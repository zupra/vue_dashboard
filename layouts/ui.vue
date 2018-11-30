<template lang="pug">

#layout
  #topNav
    #burger
      svg(
          @click="showSidebar = !showSidebar",
          width='90',
          height='44',
        )
        rect(x="14", y="6", width="30", height="32", fill="rgba(255, 255, 255, .5)", stroke='gold', stroke-width='2')
        g(stroke='midnightblue', stroke-width='2')
          path(d='M5,14 L32,14')
          path(d='M5,22 L26,22')
          path(d='M5,30 L20,30')
        text(v-if="!showSidebar", x="39",y="28") Nav
        polyline(v-else, points="50,10 36,22 50,34", fill="whitesmoke")

    div
      button(@click="logOut") выйти
      Dropdown(openTo="toLeft")
        button(slot="btn") Radio
        Radio

  transition(name="slideSidebar")
    #sidebar(v-show="showSidebar")
      .scrollableArea

        nav
          nuxt-link(to="/")
            svg(width="26", height="24")
              path(d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z")
            | Home

        nav
          a(
            v-for="hash,i in ['Цвет','MaskedInput','SwitchTgl','Dropdown','UiSelect','BigSelect_many','Card','Pagination','Calendar','ShadowPoligon','Modal','Expander','Buttons','Checkbox-Radio','Input-EL','Table','Typography','Иконки']",
            :href="`/UI#${hash}`"
            :key="i"
            :class="{'nuxt-link-exact-active':i == hashActive}"
            @click="hashActive = i"
          ) {{hash}}

  #main
    .scrollableArea
      <nuxt/>



</template>


<script>
import Radio from '~/components/Radio.vue'
import Dropdown from '~/components/Dropdown.vue'

export default {
  //middleware: 'user',
  components: {
    Radio,
    Dropdown
  },
  data() {
    return {
      hashActive: null,
      showSidebar: true
    }
  },
  //computed: {},
  methods: {
    logOut() {
      this.$store.commit('user/logOut')
      this.$router.push('/login')
    }
  }
}
</script>

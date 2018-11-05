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


    //- breadcrumbs
    div
      button(@click="logOut") выйти
      Dropdown(openTo="toLeft")
        button(slot="btn") Radio
        Radio
      //- Dropdown(
      //-   openTo="toLeft"
      //- )
      //-   button(slot="btn") Dropdown table toLeft
      //-   table.table_distance
      //-     tr
      //-       each _,i in Array(5)
      //-         th thead_#{i+1}
      //-     each _,i in Array(3)
      //-       tr
      //-         each _,i in Array(5)
      //-           td data_#{i+1}
    //- .btn(@click="$store.state.user.token = ''") выйти


    //- .button-group
    //-   each item in ['Войти','Настройки','Профиль']
    //-     .btn #{item}



  transition(name="slideSidebar")
    #sidebar(v-show="showSidebar")
      .scrollableArea

        nav
          nuxt-link(to="/") Home/logo

        nav
          a(
            v-for="hash in ['Calendar','Pagination','Цвет','ShadowPoligon','Multifilter','Modal','Expander','Form','Table']",
            :href="`/UI#${hash}`"
          ) {{hash}}
        

        nav
          h4 backNav
          //- :to="{path: '/'+rout.url, props: {title: rout.link}}",
          //- :to="`/${rout.url}`",
          nuxt-link(
            v-for="rout in backNav",
            :to="'/'+rout.url",
            :key="rout.name"
          ) {{rout.link}}

        nav
          h4 мои страницы
          nuxt-link(v-for="link in pages", :to="link.url", :key="link.url" ) {{link.name}}
        nav
          h3 test megaMenu
          each _,i in Array(30)
            a(href="#") link #{i+1}
        br




  #main
    .scrollableArea
      <nuxt/>



</template>


<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import Radio from '~/components/Radio.vue'
import Dropdown from '~/components/Dropdown.vue'

export default {
  //middleware: 'user',
  components: {
    Radio,
    Breadcrumbs,
    Dropdown
  },
  data() {
    return {
      pages: [
        { url: '/UI', name: 'UI test' },
        { url: '/notice', name: 'Notice list' },
        { url: '/valid', name: 'Валидация форм' },
        { url: '/grid', name: 'Grid' },
        { url: '/protect', name: 'protection' }
      ],
      showSidebar: true
    }
  },
  computed: {
    backNav() {
      return this.$store.state.user.mainNav
    }
  },
  methods: {
    logOut() {
      this.$store.commit('user/logOut')
      this.$router.push('/login')
    }
  }
}
</script>



<style lang="stylus">
@import '~@/assets/__var.styl'

$zIndex = 10

.slideSidebar-enter-active, 
.slideSidebar-leave-active
  transition transform .4s
.slideSidebar-enter, 
.slideSidebar-leave-active
  transform translateX(-100%) // - 24em

#layout
  display flex

  /* хром, сафари */
  &::-webkit-scrollbar
    width 0
  /* ie 10+ */
  &
    -ms-overflow-style none

$sidebar()
  @media (max-width: 800px)
    position absolute
    z-index $zIndex
  width 220px


#sidebar, #main
  height 100vh

#main
  // !!!
  // min-width: 375px;
  flex 1
  width 100%
  overflow hidden
  background #f7f7f7

#sidebar
  $sidebar()
  padding-top 3em
  background $header
  color $header_text

  nav
    padding 1em
  a
    display block
    padding .5em 0

#topNav
  position fixed
  top 0
  left 0
  width 100%
  z-index $zIndex + 1
  height 44px
  background #777
  display flex
  justify-content space-between
  align-items center
  padding-right 6px

#burger
  display flex
  &:hover polyline
    fill yellow
  svg
    margin auto
    cursor pointer
    user-select none
</style>

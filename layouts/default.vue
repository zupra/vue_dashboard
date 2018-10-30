<template lang="pug">

#layout
  #topNav
    //- .btn#burger(@click="showSidebar = !showSidebar") ≡
    //- #burger.btn
    //-   svg(
    //-       @click="showSidebar = !showSidebar",
    //-       width='28',
    //-       height='20',
    //-     )
    //-     g(stroke='midnightblue', stroke-width='2')
    //-       path(d='M0,2 L28,2')
    //-       path(d='M0,10 L21,10')
    //-       path(d='M0,18 L14,18')
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
    .btn(@click="logOut") выйти
    //- .btn(@click="$store.state.user.token = ''") выйти


    //- .button-group
    //-   each item in ['Войти','Настройки','Профиль']
    //-     .btn #{item}



  transition(name="slideSidebar")
    #sidebar(v-show="showSidebar")
      .scrollableArea

        nav
          nuxt-link(to="/") Home/logo

        <radio />

        nav
          h4 backNav
          nuxt-link(
            v-for="link in backNav",
            :to="'/'+link.url",
            :key="link.name"
          ) {{link.name}}

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

export default {
  //middleware: 'user',
  components: {
    Radio,
    Breadcrumbs
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
      //console.error('logOut')
      this.$store.commit('user/logOut')
      this.$router.push('/login')
    }
  }
}
</script>



<style lang="stylus">
@import '~@/assets/__var.styl'

$zIndex = 10

.slideSidebar-enter-active, .slideSidebar-leave-active
  transition transform .4s

.slideSidebar-enter, .slideSidebar-leave-active
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
  overflow hidden
  width 100%
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
  // background #3498db
  // border-radius .3em

  // background #696969
  display flex

  &:hover polyline
    fill yellow

svg
  margin auto
  cursor pointer
  user-select none
</style>

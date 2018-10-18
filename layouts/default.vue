<template lang="pug">

#layout
  #topNav
    // .btn#burger(@click="showSidebar = !showSidebar") ≡
    #burger
      svg(
          @click="showSidebar = !showSidebar",
          width='90',
          height='44',
        )
        rect(x="14", y="6", width="30", height="32", fill="rgba(255, 255, 255, .5)", stroke='gold', stroke-width='2')
        g(stroke='midnightblue', stroke-width='2')
          path.d1(d='M5,14 L32,14')
          path.d2(d='M5,22 L26,22')
          path.d3(d='M5,30 L20,30')
        text(v-if="!showSidebar", x="39",y="28") Nav
        polyline(v-else, points="50,10 36,22 50,34", fill="whitesmoke")


    //- breadcrumbs
    .button-group
      each item in ['Войти','Настройки','Профиль']
        .btn #{item}



  transition(name="slideSidebar")
    #sidebar(v-show="showSidebar")
      .scrollableArea

        nav
          nuxt-link(to="/") Home/logo

        <radio />


        nav
          h4 СТРАНИЦЫ
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
  components: {
    Radio,
    Breadcrumbs
  },
  data() {
    return {
      pages: [
        { url: '/testData', name: 'страница testData' },
        { url: '/page_test_form_validate', name: 'Валидация форм' },
        { url: '/pageGridData', name: 'pageGridWidget' }
      ],
      showSidebar: true
    }
  },
  methods: {}
}
</script>



<style lang="stylus">

@import '~@/assets/__var.styl'
$zIndex = 10


.slideSidebar-enter-active
.slideSidebar-leave-active
  transition transform .4s
.slideSidebar-enter
.slideSidebar-leave-active
  transform translateX(-100%) //- 24em



#layout
  display flex
  /* хром, сафари */
  &::-webkit-scrollbar { width: 0; }
  /* ie 10+ */
  & { -ms-overflow-style: none; }

$sidebar()
  @media (max-width 800px)
    position absolute
    z-index: $zIndex
  width 220px

#sidebar
#main
  height: 100vh

#main
  //!!!
  //min-width: 375px;
  
  flex: 1
  overflow: hidden
  width: 100%
  background #f7f7f7


#sidebar
  $sidebar()
  padding-top: 3em

  background $header
  color $header_text

  nav
    padding: 1em
  //.nuxt-link-active
  .nuxt-link-exact-active
    color #3498db // #FFF
    font-weight: bold
  a
    display: block
    padding: .5em 0



#topNav
  position fixed
  top 0
  left: 0
  width: 100%
  z-index: $zIndex + 1;
  height: 44px;
  background: #777

  display flex
  justify-content space-between
  align-items center

#burger
  display flex
  //background #696969
  &:hover polyline
    fill yellow


  svg
    margin auto
    cursor pointer
    user-select none

</style>

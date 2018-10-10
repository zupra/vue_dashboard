<template lang="pug">

#layout
  #topNav
    // .btn#burger(@click="showSidebar = !showSidebar") ≡
    #burger
      svg(
          @click="showSidebar = !showSidebar",
          width='90',
          height='44',
          style="cursor:pointer;user-select:none;"
        )
        rect(x="14", y="6", width="32", height="32", fill="rgba(255, 255, 255, .7)", stroke='gold', stroke-width='2')
        use(xmlns:xlink='http://www.w3.org/1999/xlink', xlink:href='#burgerSVG')
        text(x="40",y="28") Menu
    svg(style='display: none', viewbox='0 0 44 44', xmlns='http://www.w3.org/2000/svg')
      symbol#burgerSVG
        g(stroke='#444', stroke-width='2')
          path.d1(d='M5,14 L32,14')
          path.d2(d='M5,22 L26,22')
          path.d3(d='M5,30 L20,30')
    //- breadcrumbs
    .button-group
      each item in ['Войти','Настройки','Профиль']
        .btn #{item}



  transition(name="slide")
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
        { url: '/pagePreFetchData', name: 'pagePreFetchData' },
        { url: '/pageGridData', name: 'pageGridWidget' }
      ],
      showSidebar: true
    }
  },
  methods: {}
}
</script>



<style lang="styl">

$blue = #2D3A4B
$zIndex = 10



.slide-enter-active
.slide-leave-active
  transition transform .4s
.slide-enter
.slide-leave-active
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
  flex: 1
  overflow: hidden
  width: 100%
  background #f7f7f7

/*
.scrollableArea
  height: 100%
  overflow-y: auto
  /* хром, сафари */
  &::-webkit-scrollbar { width: 0; }
  /* ie 10+ */
  & { -ms-overflow-style: none; }
*/

#sidebar
  $sidebar()
  padding-top: 3em

  //background-color #F3F3F4 //#f7f7f7
  //box-shadow: 0 1em 7em -2em #000
  background #3c4858

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
  z-index: 5;
  height: 3em;
  background: #777
  //box-shadow: 0 5px 7px 0 rgba(#999,.2);

  //padding .5em 1em
  display flex
  justify-content space-between
  align-items center

#burger
  display flex
  svg
    margin auto



</style>

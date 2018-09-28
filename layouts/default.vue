<template lang="pug">

#layout
  .btn.xl#burger(@click="showSidebar = !showSidebar") ≡
  transition(name="slide")
    #sidebar(v-show="showSidebar")
      .scrollableArea

        nav
          nuxt-link(to="/") Home/logo

        .radio
          .title
            | Радио
            .audioControl(v-show="activeStation != null" @click="stop()", :class="{pause: !isPause}")
          ul.Card
            li(v-for="(item, index) in stations", :class='{ active : index == activeStation }', @click="playItem(item.src, index)") {{item.title}}
          audio(ref="audio", src="")

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
// import AudioSvg from '~/static/img/audio.svg'
// import Logo from '~/components/Logo.vue'

const stations = [
  {
    title: 'На Волне Yum.fm',
    src: 'http://yumfm.hostingradio.ru:8020/yumfm128.mp3'
  },
  {
    title: 'Радио ENERGY',
    src: 'http://ic2.101.ru:8000/v1_1'
  },
  {
    title: 'Rock FM 95.2',
    src: 'http://nashe.streamr.ru/rock-128.mp3'
  },
  {
    title: 'Радио ПАССАЖ',
    src: 'http://listen.radiopassazh.ru/hd'
  },
  {
    title: 'Авторадио',
    src: 'http://den.101.ru:4000/ar_78_01'
  },
  {
    title: 'Зайцев FM',
    src: 'http://radio.zaycev.fm:9002/ZaycevFM(128)'
  }
]

export default {
  data() {
    return {
      pages: [
        { url: '/testData', name: 'страница testData' },
        { url: '/pagePreFetchData', name: 'pagePreFetchData' },
        { url: '/pageGridData', name: 'pageGridWidget' }
      ],
      showSidebar: true,

      stations: stations,
      activeStation: null,
      isPause: false
    }
  },
  methods: {
    playItem(src, i) {
      this.$refs.audio.src = src
      this.activeStation = i
      this.go()
    },
    stop() {
      if (!this.isPause) {
        this.isPause = true
        this.$refs.audio.pause()
      } else {
        this.go()
      }
    },
    go() {
      this.isPause = false
      this.$refs.audio.play()
    }
  }
}
</script>



<style lang="styl">

$blue = #2D3A4B
$zIndex = 10

#burger
  position: fixed
  left 10px
  top 10px
  z-index: $zIndex+1
  &:before
    content: ''


.slide-enter-active
.slide-leave-active
  transition transform .4s
.slide-enter
.slide-leave-active
  transform translateX(-100%) //- 24em



#layout
  display flex

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
  padding-top: 4em
  // &:before
  //   content: ''
  //   display: block
  //   height: 56px //4em
  //   background-color: #254858
  //   border-bottom: 2px groove #607D8B //rgba(#FFF, .3);

  background-color #f7f7f7 // $blue
  // box-shadow 0 0 15px #262831
  box-shadow: 0 1em 7em -2em #000
  // color #FFF

  nav
    padding: 1em
  //.nuxt-link-active
  .nuxt-link-exact-active
    color #3498db // #FFF
    font-weight: bold
  a
    display: block
    padding: .5em 0

.radio
  .title
    display: flex
    justify-content: space-between
    font-size 1.4em
    padding .7em 1em
    background: #dee2e6;
#audio
  padding: 1em
  display: flex
  justify-content: space-between
.audioControl
  width 1.4em
  height 1.4em
  border-radius 50%
  cursor pointer
  background  #bed4e3 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><polygon points='5,0 24,12 5,24' fill='white'></polygon></svg>") no-repeat center/50%
  &:hover
    border 6px solid rgba(#000, .2)
  &.pause
    background lightsalmon url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect x='0' y='0' width='8' height='20' fill='white'></rect><rect x='12' y='0' width='8' height='20' fill='white'></rect></svg>") no-repeat center/50%

</style>

<template lang="pug">
.Radio
  .Radio_head
    .audioControl(@click="toggle()", :class="isPause ? 'pause' : 'active' ")
  ul.Card
    li(v-for="(item, index) in stations", :class='{ active : index == activeStation }', @click="playItem(item.src, index)") {{item.title}}
  audio(ref="audio", src="")
  
</template>
<script>
//https://www.radiobells.com/all/
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
    title: 'Vocal House Radio',
    src: 'http://vocaltrance.fm:8000/deep_128'
  },
  {
    title: 'Зайцев FM',
    src: 'http://radio.zaycev.fm:9002/ZaycevFM(128)'
  }
]
export default {
  data() {
    return {
      stations: stations,
      activeStation: null,
      isPause: true,
      notStarted: true
    }
  },
  methods: {
    playItem(src, i) {
      if (i == this.activeStation) return
      this.$refs.audio.src = src
      this.activeStation = i
      this.go()
    },
    toggle() {
      if (this.notStarted) {
        this.notStarted = false
        this.playItem(stations[0].src, 0)
        this.go()
      } else if (!this.isPause) {
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

<style lang="stylus">
.Radio
  &_head
    background: #4281A4
    padding: .5em
    margin 0 1em -1em



.audioControl
  //border 0
  cursor pointer
  width 54px
  height 54px
  border-radius 50%
  margin auto
  background #1abc9c url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><polygon points='5,0 24,12 5,24' fill='white'></polygon></svg>") no-repeat center
  &:hover
  //&.active
    border 4px solid #EEE
  &.pause
    background #FE938C url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect x='0' y='0' width='8' height='20' fill='white'></rect><rect x='12' y='0' width='8' height='20' fill='white'></rect></svg>") no-repeat center  
</style>

<template lang="pug">
.Radio
  .Radio_head
    canvas#audioCanvas(ref="canvas")
    .audioControl(@click="toggle()", :class="isPause ? 'pause' : 'active' ")
  ul.listNav
    li(v-for="(item, index) in stations", :class='{ active : index == activeStation }', @click="playItem(item.src, index)") {{item.title}}
  audio(ref="audio", src="", crossorigin="")

</template>
<script>
//https://www.radiobells.com/all/
const stations = [
  {
    title: 'Deep House',
    src: 'http://www.radio-nice.ru:5110/radio'
  },
  {
    //https://www.radiobells.com/deephouse/svoefm/
    title: 'СВОЕFM',
    src: 'http://92.53.66.194:8000/59287225e7ee620007ac2e22'
  },
  {
    title: 'DFM Deep',
    src: 'http://icecast.radiodfm.cdnvideo.ru/st24.mp3'
  },
  {
    title: 'Future House',
    src: 'http://air2.radiorecord.ru:805/fut_320'
  },
  {
    title: 'На Волне Yum.fm',
    src: '//yumfm.hostingradio.ru:8020/yumfm128.mp3'
  },
  {
    title: 'Радио ENERGY',
    src: '//ic2.101.ru:8000/v1_1'
  },
  {
    title: 'Rock FM 95.2',
    src: '//nashe.streamr.ru/rock-128.mp3'
  },
  {
    title: 'Радио ПАССАЖ',
    src: '//listen.radiopassazh.ru/hd'
  },
  {
    title: '[RCM]DEEP',
    src: 'http://95.213.237.115:8000/rcm'
  },
  {
    //https://www.radiobells.com/deephouse/soundparkdeep/
    title: 'Sound Park Deep ',
    src: 'http://163.172.155.86:8000/5a9e67804c40a40007e2b155'
  }
]

const SHOW = (audio, canvas) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  //if (!AudioContext) return
  const audioContext = new AudioContext()

  const source = audioContext.createMediaElementSource(audio)

  const analyser = audioContext.createAnalyser()
  source.connect(analyser)
  source.connect(audioContext.destination)

  const waveform = new Float32Array(analyser.frequencyBinCount)
  analyser.getFloatTimeDomainData(waveform)
  !(function updateWaveform() {
    requestAnimationFrame(updateWaveform)
    analyser.getFloatTimeDomainData(waveform)
  })()

  //canvas
  const canvasContext = canvas.getContext('2d')
  canvas.width = 188
  canvas.height = 70
  canvasContext.strokeStyle = '#FFF'

  !(function drawOscilloscope() {
    requestAnimationFrame(drawOscilloscope)
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    canvasContext.beginPath()
    for (let i = 0; i < waveform.length; i++) {
      const x = i
      const y = (0.5 + waveform[i] / 2) * canvas.height
      if (i == 0) {
        canvasContext.moveTo(x, y)
      } else {
        canvasContext.lineTo(x, y)
      }
    }
    canvasContext.stroke()
  })()
}

export default {
  data() {
    return {
      stations: stations,
      activeStation: null,
      isPause: true,
      notStarted: true
    }
  },
  // mounted() {
  //   SHOW(this.$refs.audio, this.$refs.canvas)
  // },
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
#audioCanvas
  height: 100%
  width: 100%
.Radio
  //padding 0 1em 1em
  &_head
    //margin 0 1em -1em
    height 70px
    background: #4281A4
    position relative
.audioControl
  position: absolute;
  left 50%
  top 50%
  transform translate(-50%, -50%)
  cursor pointer
  width 54px
  height 54px
  border-radius 50%
  background rgba(#FE938C, .5) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect x='0' y='0' width='8' height='20' fill='white'></rect><rect x='12' y='0' width='8' height='20' fill='white'></rect></svg>") no-repeat center
  &:hover
    border 4px solid #EEE
    background-color #FE938C
  &.pause
    background #1abc9c url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><polygon points='5,0 24,12 5,24' fill='white'></polygon></svg>") no-repeat center


</style>

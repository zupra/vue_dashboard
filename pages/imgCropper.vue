

<template lang="pug">
//- https://github.com/xyxiao001/vue-cropper
.Wrap
  h1 image Cropper

  .resizeEl
    VueCropper(
      ref="cropper"
      :img="option.img"
      :outputSize="option.size"
      :outputType="option.outputType"
      :info="true"
      :full="option.full"
      :canMove="option.canMove"
      :canMoveBox="option.canMoveBox"
      :fixedBox="option.fixedBox"
      :original="option.original"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :centerBox="option.centerBox"
      :high="option.high"
      :infoTrue="option.infoTrue"
      @realTime="realTime"
      @imgLoad="imgLoad"
      @cropMoving="cropMoving"
      :enlarge="option.enlarge"
    )
  .form-line
    label.btn(for='uploads') upload
    input#uploads(
      type='file',
      style='display:none',
      accept='image/png, image/jpeg, image/gif, image/jpg',
      @change='uploadImg($event, 1)'
    )
    button.btn(@click='startCrop', v-if='!crap') start
    button.btn(@click='stopCrop', v-else='') stop

    button.btn(@click='clearCrop') clear
    button.btn(@click='refreshCrop') refresh
    button.btn(@click='changeScale(1)') +
    button.btn(@click='changeScale(-1)') -
    button.btn(@click='rotateLeft') rotateLeft
    button.btn(@click='rotateRight') rotateRight
    //- button.btn(@click="finish('base64')") preview(base64)
    //- button.btn(@click="finish('blob')") preview(blob)


  .form-line
    each option in ['original','high','full','infoTrue','canMove','canMoveBox','fixedBox','autoCrop','centerBox','enlarge']
      label
        input(type='checkbox', v-model='option.'+option)
        | #{option}

    hr
    each f in ['jpeg','png','webp']
      label
        input(type='radio', name='type', value=''+f, v-model='option.outputType')
        | #{f}

    .btn(@click="down('base64')") download(base64)
    .btn(@click="down('blob')") download(blob)
    a(:href="downImg" download="demo.png" ref="downloadDom")

  fieldset
    legend preview result
    .show-preview(:style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}")
      div(:style='previews.div')
        img(:src='previews.url', :style='previews.img')


  table
    tr
      th name
      th Features
      th Detail
      th value

    tr
      td img
      td Picture address
      td null
      td url address || base64 || blob
    tr
      td outputSize
      td quality of the generated image
      td 1
      td 0.1 - 1
    tr
      td outputType
      td format of the generated image
      td jpg (jpg need jpeg)
      td jpeg || png || webp
    tr
      td info
      td Crop box size information
      td true
      td true || false
    tr
      td canScale
      td Whether the image allows the wheel to zoom
      td true
      td true || false
    tr
      td autoCrop
      td Whether to generate a screenshot box by default
      td false
      td true || false
    tr
      td autoCropWidth
      td Default generation of screenshot frame width
      td parent's 80%
      td 0~max
    tr
      td autoCropHeight
      td Default generation of screenshot frame Height
      td parent's 80%
      td 0~max
    tr
      td fixed
      td Whether to open the screenshot frame width and height fixed ratio
      td true
      td true | false
    tr
      td fixedNumber
      td The aspect ratio of the screenshot box
      td [1 : 1]
      td [width : height]
    tr
      td full
      td Screenshot of whether to output the original map scale
      td false
      td true | false
    tr
      td fixedBox
      td Fixed screenshot frame size is not allowed to change
      td false
      td true | false
    tr
      td canMove
      td Whether the uploaded image can be moved
      td true
      td true | false
    tr
      td canMoveBox
      td Can the screenshot box be dragged?
      td true
      td true | false
    tr
      td original
      td Upload images are rendered in raw scale
      td false
      td true | false
    tr
      td centerBox
      td Is the screenshot box restricted to the image?
      td false
      td true | false
    tr
      td high
      td Is it proportional to the dpi output of the device?
      td true
      td true | false
    tr
      td infoTrue
      td
        | True to show the true output image width and height false show the width of the screenshot frame
      td false
      td true | false
    tr
      td maxImgSize
      td Limit the maximum width and height of the image
      td 2000
      td 0-max
    tr
      td enlarge
      td Picture output ratio multiplier based on screenshots
      td 1
      td 0-max(Don't be too big.)


</template>


<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },

  data() {
    return {
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      option: {
        img: 'https://zupra.github.io/test/filter.jpg',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        //
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 150,
        centerBox: false,
        high: true,
        cropData: {},
        enlarge: 1
      },
      downImg: '#'
    }
  },
  methods: {
    startCrop() {
      this.crap = true
      this.$refs.cropper.startCrop()
    },
    stopCrop() {
      this.crap = false
      this.$refs.cropper.stopCrop()
    },
    clearCrop() {
      this.$refs.cropper.clearCrop()
    },
    refreshCrop() {
      this.$refs.cropper.refresh()
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    /*
    finish(type) {
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = 'about:blank'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    */
    //
    realTime(data) {
      this.previews = data
    },
    down(type) {
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data)
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data])
            window.navigator.msSaveBlob(blobObject, 'demo.png')
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click()
            })
          }
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data])
            window.navigator.msSaveBlob(blobObject, 'demo.png')
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click()
            })
          }
        })
      }
    },
    uploadImg(e, num) {
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('.gif,jpeg,jpg,png,bmp')
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          //
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // reader.readAsDataURL(file)
      reader.readAsArrayBuffer(file)
    },
    imgLoad(msg) {
      console.log(msg)
    },
    cropMoving(data) {
      this.option.cropData = data
    }
  }
}
</script>

<style lang="stylus">
.resizeEl
  resize both
  overflow auto

  border 1px solid #000
  height 60vh
  max-width 100%
  position relative
  &:after
    content ''
    position absolute
    right 0
    bottom 0
    height 24px
    width 24px
    cursor move
    background url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z'/></svg>"), linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 55%, #3498db 56%)
</style>

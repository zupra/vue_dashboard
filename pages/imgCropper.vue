<template lang="pug">
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
      @realTime="realTime"
    )
  .form-line
    button.btn(@click='changeImg') changeImg
    label.btn(for='uploads') upload
    input#uploads(
      type='file',
      style='position:absolute; clip:rect(0 0 0 0);',
      accept='image/png, image/jpeg, image/gif, image/jpg',
      @change='uploadImg($event, 1)'
    )
    button.btn(@click='startCrop', v-if='!crap') start
    button.btn(@click='stopCrop', v-else='') stop

    button.btn(@click='clearCrop') clear
    //- button.btn(@click='refreshCrop') refresh
    button.btn(@click='changeScale(1)') +
    button.btn(@click='changeScale(-1)') -
    //- button.btn(@click='rotateLeft') rotateLeft
    //- button.btn(@click='rotateRight') rotateRight
    button.btn(@click="finish('base64')") preview(base64)
    button.btn(@click="finish('blob')") preview(blob)
    a.btn(@click="down('base64')") download(base64)
    a.btn(@click="down('blob')") download(blob)

    .form-line
      label
        input(type='checkbox', v-model='option.original')
        | original
      label
        input(type='checkbox', v-model='option.canMove')
        | canMove
      label
        input(type='checkbox', v-model='option.canMoveBox')
        | canMoveBox
      label
        input(type='checkbox', v-model='option.fixedBox')
        | fixedBox
      label
        input(type='checkbox', v-model='option.full')
        | full
      hr
      label
        input(type='radio', name='type', value='jpeg', v-model='option.outputType')
        | jpg
      label
        input(type='radio', name='type', value='png', v-model='option.outputType')
        | png
      label
        input(type='radio', name='type', value='webp', v-model='option.outputType')
        | webp

  fieldset
    legend preview result
    .show-preview(:style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}")
      div(:style='previews.div')
        img(:src='previews.url', :style='previews.img')


</template>


<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },

  data: function() {
    return {
      crap: false,
      previews: {},
      lists: [
        {
          img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
        },
        {
          img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
        }
      ],
      option: {
        img: 'https://zupra.github.io/test/filter.jpg',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: false
      },
      downImg: '#'
    }
  },
  methods: {
    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
    },
    startCrop() {
      // start
      this.crap = true
      this.$refs.cropper.startCrop()
    },
    stopCrop() {
      //  stop
      this.crap = false
      this.$refs.cropper.stopCrop()
    },
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop()
    },
    //
    realTime(data) {
      this.previews = data
    },
    finish(type) {
      //
      var test = window.open('about:blank')
      test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          var test = window.open('')
          test.location.href = window.URL.createObjectURL(data)
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          test.location.href = data
        })
      }
    },

    down(type) {
      // event.preventDefault()
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
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
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

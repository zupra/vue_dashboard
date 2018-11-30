<template lang="pug">
.MainFullWidth

  Modal(
    :show.sync="showModal_setExtras"
  )
    pre {{currExtras}}


  Modal(
    :show.sync="showModal_setCat"
  )
    h1 set category


  Modal(:show.sync="showModal_setCard", position="rModal")
    template(v-if="currCard")
      div(slot='title') Карта &nbsp;
        b.brightStr {{currCard.name}} - {{curr_region.name}}
      form(@submit.prevent)
        label.field Название
          input.lg(v-model="currCard.name")
        label.field Описание
          textarea.lg(v-model="currCard.description")
        label.field IMG карты
          input(
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
          )
          figure
            img(
              style="width: 100%;"
              :src="previewImg ? previewImg.src : currCard.preview ? `${currCard.preview}` : 'https://imgplaceholder.com/730x467'"
            )
            figcaption(
              v-if="previewImg"
            )
              p name: {{previewImg.name}}, size: {{previewImg.size}}, type: {{previewImg.type}}
              .btn.outline.red(
                @click.prevent="resetUploadImg"
              ) reset Upload IMG
        fieldset
          legend Баллы
          p.flex.x_sb min &nbsp;
            InputNumber(
              :start="currCard.points_min"
              @number="currCard.points_min = $event"
            )
          div.flex.x_sb max &nbsp;
            InputNumber(
              :start="currCard.points_max"
              @number="v => currCard.points_max = v"
            )
        label.field Срок действия
          span
            InputNumber(
              :start="currCard.expires"
              @number="v => currCard.expires = v"
            )
            | &nbsp; месяцев
        hr
        .form-line
          button(
            type="submit"
            @click="setCard(currCard)"
          )
            img.icon(
              :src="spinner_setCard ? '/_nuxt/static/img/spinner_btn.svg' : 'https://icongr.am/feather/refresh-cw.svg?size=22&color=ffffff'"
            )
            | Обновить
          .btn(@click="showModal_setCard = false") Закрыть
          .btn.fill.red(@click="delCard(currCard.cardid)") Удалить
      //- reset modal actions
      div(slot='actions')


  pre newCard:{{newCard}}


  h1 Программа лояльности &nbsp;
    b.brightStr Регион {{curr_region.name}} &nbsp;
    .btn_icon.orange(@click="showModal_Region = true")
      img(src="https://icongr.am/feather/settings.svg?size=24&color=ffffff")


  .form-line
    //- span Регион &nbsp;
    //-   select.lg(v-model="platformid")
    //-     option(
    //-       v-for="option in regions"
    //-       :selected="option.platformid == platformid"
    //-     ) {{option.name}}

    UiSelect(
      :ripple="true",
      :options="region_UiSelect",
      :selected="region_UiSelectSelected",
      @option="v =>platformid=v.value",
      size="lg"
    )

    .btn.lg(
      @click="init_currCard(newCard)"
    ) Добавить карту
    .btn.lg Добавить услугу

  .table-responsive
    table.table_col.table_distance.table_striped
      tr
        th Категории:
        th(
          v-for="card in cards",
          style="min-width: 150px"
        )
          | {{card.name}} &nbsp;
          .btn_icon.green(@click="init_currCard(card, true)")
            img(src="https://icongr.am/feather/settings.svg?size=18&color=ffffff")

      tr(v-for="(category, i) in categories")
        td.flex.x_sb.y_center
          div.flex
            SwitchTgl
            .btn_icon(@click="showModal_setCat = true")
              img(src="https://icongr.am/feather/settings.svg?size=24&color=ffffff")
            .btn_icon.red
              img(src="https://icongr.am/feather/trash-2.svg?size=24&color=ffffff")
            | #{item}
          b(
            style="line-height:1; white-space: nowrap;"
          ) {{category.name}}

        td(v-for="td,j in extras[i]")
          .btn_icon(@click="init_currExtras(td)")
            img(src="https://icongr.am/feather/edit.svg?size=24&color=ffffff")
          small(
            style="color: #ed5565"
          )
            i {{td.subcategory_name}}
          pre extras[{{i}}].item[{{j}}]:{{td}}

</template>




<script>
import Modal from '~/components/Modal.vue'
import SwitchTgl from '~/components/SwitchTgl.vue'
import InputNumber from '~/components/InputNumber.vue'
import UiSelect from '~/components/UiSelect.vue'
export default {
  components: {
    Modal,
    InputNumber,
    SwitchTgl,
    UiSelect
  },
  data() {
    return {
      //platformid, cards, categories, regions
      file: null,
      previewImg: null,
      newCard: {
        // cardid: "14",
        // fileid: "90",
        // preview: ".jpg",
        // alias: "white",
        platformid: '1',
        name: 'New Card',
        description: 'New Card description',
        points_min: '100',
        points_max: '300',
        expires: '5'
      },
      currCard: null, //{}
      currExtras: null, //{}
      showModal_setCard: false,
      spinner_setCard: false,
      showModal_setExtras: false,
      showModal_setCat: false,

      // showModal_CardExtras: false,
      showModal_Region: false
    }
  },
  async asyncData({ app, params }) {
    let { data } = await app.$axios.$get(
      'http://betclub.com/atlas/loyalty/list/'
    )
    return { ...data }
  },
  computed: {
    curr_region() {
      return this.regions.filter(item => item.platformid == this.platformid)[0]
    },
    region_UiSelect() {
      return this.regions.map(item => ({
        label: item.name,
        value: item.platformid
      }))
    },
    region_UiSelectSelected() {
      const { name, platformid } = this.curr_region
      return { label: name, value: platformid }
    }
  },
  watch: {
    platformid(val) {
      this.newCard.platformid = val
    },
    showModal_setCard(val) {
      //!~~val
      if (val !== true) {
        this.currCard = null
      }
    }
  },
  methods: {
    changeRegion() {
      const data = JSON.stringify({ platformid: this.platformid })
      this.$axios
        .$post('http://betclub.com/atlas/loyalty/list', data)
        .then(res => {
          this.regions = res.data.regions
        })
    },
    init_currCard(obj, get) {
      this.showModal_setCard = true
      this.currCard = obj
      get && this.__getFullCurrCard()
    },
    init_currExtras(obj) {
      this.showModal_setExtras = true
      this.currExtras = obj
      this.__getFullCurrExtras(obj)
    },

    __getFullCurrExtras(param) {
      const data = JSON.stringify(param)
      this.$axios
        .$post('http://betclub.com/atlas/loyalty/subs', data)
        .then(res => {
          const data = res.data
          this.currExtras = { ...data }
        })
    },
    __getFullCurrCard() {
      const data = JSON.stringify({
        platformid: this.curr_region.platformid,
        cardid: this.currCard.cardid
      })
      this.$axios
        .$post('http://betclub.com/atlas/loyalty/cards', data)
        .then(res => {
          const data = res.data
          this.currCard = { ...data }
        })
    },

    handleFileUpload(e) {
      /*
      this.file = this.$refs.fileInput.files[0]
      console.log(e)
      console.log(this.$refs)
      */
      const files = e.target.files || e.dataTransfer.files
      if (!files) return
      // MIME
      if (files[0].type.match('image.*')) {
        this.createImage(files[0])
        this.file = files[0]
      }
    },
    createImage(file) {
      const reader = new FileReader()
      reader.onload = e => {
        this.previewImg = {
          src: e.target.result,
          name: file.name,
          type: file.type,
          size: ~~(file.size / 1024) + 'кб'
        }
      }
      reader.readAsDataURL(file)
    },
    resetUploadImg() {
      this.$refs.fileInput.value = ''
      this.previewImg = null
      this.file = null
    },
    //newCard_setCard
    setCard(Card) {
      this.spinner_setCard = true
      let formData = new FormData()
      let API = Card.cardid ? 'edit' : 'add'
      for (let key in Card) {
        formData.append(key, Card[key])
      }
      formData.append('file', this.file)
      this.$axios
        .$post(`http://betclub.com/atlas/loyalty/cards/${API}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          //console.log('SUCCESS!!')
          const notice = {
            type: 'success',
            title: 'setCard',
            body: res.message,
            id: +new Date()
          }
          this.$emit('notice', notice)

          this.updateList()
          //setTimeout(() => (this.spinner_setCard = false), 700)
          this.spinner_setCard = false
        })
        .catch(() => console.log('FAILURE!!'))
    },
    delCard(id) {
      const data = JSON.stringify({
        cardid: id
      })
      this.$axios
        .$post('http://betclub.com/atlas/loyalty/cards/delete', data)
        .then(res => {
          alert('Удалено')
          this.updateList()
        })
    },
    updateList: async function() {
      let { data } = await this.$axios.$get(
        'http://betclub.com/atlas/loyalty/list/'
      )
      this.$data = Object.assign(this.$data, data)
    }
  }
}
</script>




<style lang="stylus">

.brightStr
  color: #000;
  border-bottom: .2em solid gold



</style>

<template lang="pug">

#layout
  #topNav
    #burger(@click="showSidebar = !showSidebar")
      svg(
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
          nuxt-link(to="/")
            svg(width="26", height="24")
              path(d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z")
            | Home

        nav
          h4 backNav
          //- :to="{path: '/'+rout.url, query:{title:rout.link}}",
          //- :to="`/${rout.url}`",
          //- :key="rout.name"
          nuxt-link(
            v-for="rout in backNav",
            :to="'/'+rout.link",
            :key="rout.link"
          ) {{rout.name}}

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
import Radio from '~/components/Radio.vue'
import Dropdown from '~/components/Dropdown.vue'

export default {
  // middleware: 'user',
  components: {
    Radio,
    Dropdown
  },
  data() {
    return {
      pages: [
        { url: '/UI', name: 'UI doc' },
        { url: '/imgCropper', name: 'image Cropper' },
        { url: '/notice', name: 'Notice list' },
        { url: '/valid', name: 'Валидация форм' },
        { url: '/grid', name: 'Grid' },
        { url: '/modules', name: 'modules' },
        { url: '/user', name: 'user(редактирование)' },
        { url: '/loyalty', name: 'Лояльность' },
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

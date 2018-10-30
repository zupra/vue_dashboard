<template lang="pug">

form.Card.Card_form(
  @submit.prevent="logIn"
  role="form"
)
  Notification(:notice="notice")
  input.lg(
    type="search"
    placeholder="Логин",
    v-model="user.login"
  )
  input.lg(
    placeholder="Пароль",
    v-model="user.password"
  )
  button.btn(:disabled="Object.values(user).includes('')")
    //- img.spinner_btn(src="~static/img/spinner_btn.svg")
    | Отправить

  //pre(style="max-height: 200px;overflow: scroll") response:{{response}}

</template>

<script>
import Notification from '~/components/Notification.vue'
export default {
  layout: 'blank',
  components: {
    Notification
  },
  data() {
    return {
      user: {
        login: '',
        password: ''
      },
      //response: {},
      notice: {}
    }
  },
  methods: {
    logIn() {
      //?login=79991002001&password=qwerty
      const URL = 'http://betclub.com/atlas/auth/login'
      const { login, password } = this.user

      this.$axios
        .$post(URL, {
          login: login,
          password: password
        })
        .then(response => {
          //this.response = response
          if (!response.result) {
            this.notice = {
              type: 'danger',
              title: 'Ошибка авторизации',
              body: response.message,
              id: +new Date()
            }
          } else {
            const { token, main_nav } = response.data
            this.$store.commit('user/logIn', token)
            //this.$store.commit('user/setMainNav', main_nav)
            this.$router.push('/')

            //!TODO: fake
            this.$axios
              .get(`/mainNav`)
              .then(res =>
                this.$store.commit('user/setMainNav', res.data.main_nav)
              )
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.spinner_btn
  position absolute
  left 10px
  top 50%
  transform translateY(-50%)
</style>

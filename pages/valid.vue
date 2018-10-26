<template lang="pug">
.Wrap
  form(@submit.prevent="validateBeforeSubmit")
    .form-group_validate
      label firstName
        input.lg(
          v-model="user.firstName",
          v-validate="'required'",
          name="firstName",
          :class="{ 'is-invalid': errors.has('firstName') }"
        )
        .error(v-if="errors.has('firstName')") {{ errors.first('firstName') }}

      label lastName
        input.lg(
          v-model="user.lastName",
          v-validate="'required'",
          name="lastName",
          :class="{ 'is-invalid': errors.has('lastName') }"
        )
        .error(v-if="errors.has('lastName')") {{ errors.first('lastName') }}

      label email
        input.lg(
          v-model="user.email",
          v-validate="'required|email'",
          name="email",
          :class="{ 'is-invalid': errors.has('email') }"
        )
        .error(v-if="errors.has('email')") {{ errors.first('email')}}

      label password
        input.lg(
          v-model="user.password",
          v-validate="{ required: true, min: 6 }",
          name="password",
          :class="{ 'is-invalid': errors.has('password') }"
        )
        .error(v-if="errors.has('password')") {{ errors.first('password') }}

    button.btn(:disabled="errors.any()") Отправить


</template>


<script>
//- import Logo from '~/components/Logo.vue'
export default {
  //components: {},
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      submitted: false
    }
  },
  inject: ['$validator'],
  methods: {
    validateBeforeSubmit(e) {
      this.$validator
        .validateAll()
        .then(isValid => console.log(isValid))
        .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="stylus">

.form-group_validate
  display flex
  flex-direction column
  margin-bottom 2em

  input
    display block
    width 220px

  label
    position relative
    margin-bottom 2em

  .error
    position absolute
    font-size 0.8rem
    color red

  .is-invalid
    border-color red !important


</style>

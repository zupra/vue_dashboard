<template lang="pug">
.Wrap
  form(@submit.prevent="handleSubmit")
    .form-group
      //- label firstName
      input(
        v-model="user.firstName",
        v-validate="'required'",
        name="firstName",
        :class="{ 'is-invalid': submitted && errors.has('firstName') }"
      )
      .error(v-if="submitted && errors.has('firstName')") errors
      //- label lastName
      input(
        v-model="user.lastName",
        v-validate="'required'",
        name="lastName",
        :class="{ 'is-invalid': submitted && errors.has('lastName') }"
      )
      //- label email
      input(
        v-model="user.email",
        v-validate="'required|email'",
        name="email",
        :class="{ 'is-invalid': submitted && errors.has('email') }"
      )
      .error(v-if="submitted && errors.has('firstName')") errors
      //- label password
      input(
        v-model="user.password",
        v-validate="{ required: true, min: 6 }",
        name="password",
        :class="{ 'is-invalid': submitted && errors.has('password') }"
        )
    .btn Отправить


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
  mounted() {
    console.dir(this.$validator)
  },
  methods: {
    handleSubmit(e) {
      //this.submitted = true
      this.$validator.validate().then(valid => {
        if (!valid) {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
        }
      })
    }
  }
}
</script>

<style>
</style>

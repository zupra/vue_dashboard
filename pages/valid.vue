<template lang="pug">
.Wrap
  form(@submit.prevent="validateBeforeSubmit")
    label.field firstName

      span
        input(
          v-model="user.firstName",
          v-validate="'required'",
          name="firstName",
          :class="{ 'is-invalid': errors.has('firstName') }"
        )
      .error(v-if="errors.has('firstName')") {{ errors.first('firstName') }}

    label.field lastName
      input.lg(
        v-model="user.lastName",
        v-validate="'required'",
        name="lastName",
        :class="{ 'is-invalid': errors.has('lastName') }"
      )
      .error(v-if="errors.has('lastName')") {{ errors.first('lastName') }}

    label.field email
      input.lg(
        v-model="user.email",
        v-validate="'required|email'",
        name="email",
        :class="{ 'is-invalid': errors.has('email') }"
      )
      .error(v-if="errors.has('email')") {{ errors.first('email')}}

    label.field password
      input.lg(
        v-model="user.password",
        v-validate="{ required: true, min: 6 }",
        name="password",
        :class="{ 'is-invalid': errors.has('password') }"
      )
      .error(v-if="errors.has('password')") {{ errors.first('password') }}

    //- .field
    //-   each _,i in Array(3)
    //-     label
    //-       input(
    //-         type='checkbox', 
    //-         v-model="user.checkbox_group", 
    //-         v-validate="'required'",
    //-         name="checkbox_group",
    //-       )
    //-       | Option #{i+1}
    //-   .error(v-if="errors.has('checkbox_group')") {{ errors.first('checkbox_group') }}

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
        password: '',

        checkbox_group: '',
        radio_group: ''
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

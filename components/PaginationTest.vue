<template lang="pug">
.PaginationTest
  .flex-row
    .Card(v-for="User in Users")
      .User
        .User_body
          img(:src='User.picture.medium')

          //- dl
          //-   dt DT
          //-   dd DD
          //-   dt DT
          //-   dd DD

        .divActions
          .btn.flat actions
          .btn ОК



  //- @slice="OnUsersSlice"
  pagination(
    :qty="12"
  )

</template>

<script>
import Pagination from '~/components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      Users: []
    }
  },
  created() {
    fetch('https://randomuser.me/api/?results=12')
      .then(resp => resp.json())
      .then(data => (this.Users = data.results))
  },
  //computed: {},
  methods: {
    //OnUsersSlice() {}
  }
}
</script>

<style lang="stylus">

.User
  width 200px
  &_body
    padding 1em

</style>

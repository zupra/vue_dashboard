<template lang="pug">
.PaginationTest

  InputNumber(
    :start="perPage",
    :min="1",
    :max="120",
    @number="perPage = $event"
  )
  transition-group(mode="out-in", name="pagination", class="Flex_wr")
    .Card(
      v-for="User,i in UsersSlice",
      :key="User.cell"
    )
      .User
        img(:src='User.picture.medium')
        div
          p.User_name {{User.name.first}} {{User.name.last}}
          small {{User.phone}}
        dl.User_dl
          dt location
          dd.FixH {{User.location.timezone.description}}
            //- hr
            //- | {{User.location.coordinates.latitude}}/{{User.location.coordinates.longitude}}
          dt registered
          dd {{User.registered.date.split('T')[0]}}
          dt login
          dd {{User.login.username}}
      .btnActions
        .btn.flat action
        .btn ОК


  Pagination(
    :qty="Users.length",
    :perPage="perPage",

    :setPage="setPage",
    @slice="sliceFromTo = $event.slice;setPage = $event.curr"
  )

</template>

<script>
import InputNumber from '~/components/InputNumber.vue'
import Pagination from '~/components/Pagination.vue'

const perPage = 4
export default {
  components: {
    InputNumber,
    Pagination
  },
  data() {
    return {
      Users: [],
      perPage: perPage,
      setPage: 5,
      sliceFromTo: [0, perPage]
    }
  },
  computed: {
    UsersSlice() {
      return this.Users.slice(...this.sliceFromTo)
    }
  },
  created() {
    fetch('https://randomuser.me/api/?results=120')
      .then(resp => resp.json())
      .then(data => (this.Users = data.results))
  }
}
</script>

<style lang="stylus">

.pagination-leave-active
// .pagination-leave-to
  opacity: 0;
  position: absolute;
.pagination-enter-active
  transition: transform .7s, opacity .3s
.pagination-enter

  opacity: 0;
  transform: translateY(-10px)


.User
  height 180px
  padding 1em
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 80px 100px;
  line-height 1
  &_name
    height 2em
    text-transform capitalize
  &_dl
    display: grid;
    grid-gap: 5px 10px;
    grid-template-columns: 60px 120px;

    font-size .8rem
    dt
      color #999
      text-align right
  .FixH
    height 3em
</style>

<template lang="pug">
.PaginationTest

  Pagination(
    :Data="Users"
    :perPage="4"
  )
    .Card(slot-scope="slotProps")
      //- pre {{slotProps}}
      .User
        img(:src='slotProps.itemData.picture.medium')
        div
          p.User_name {{slotProps.itemData.name.first}} {{slotProps.itemData.name.last}}
          small {{slotProps.itemData.phone}}
        dl.User_dl
          dt location
          dd.FixH {{slotProps.itemData.location.timezone.description}}
            //- hr
            //- | {{slotProps.itemData.location.coordinates.latitude}}/{{slotProps.itemData.location.coordinates.longitude}}
          dt registered
          dd {{slotProps.itemData.registered.date.split('T')[0]}}
          dt login
          dd {{slotProps.itemData.login.username}}
      .btnActions
        .btn.flat action
        .btn ОК

  Pagination(
    :Data="[865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924]"
    :perPage="4"
  )
    .Card(slot-scope="slotProps")
      //- pre {{slotProps.itemData}}
      img(
        height="160"
        width="240"
        :src="'https://picsum.photos/240/160?image='+slotProps.itemData"
      )
      .btnActions
        .btn.flat.red action
        .btn ОК

</template>

<script>
import Pagination from '~/components/Pagination/Pagination.vue'

const perPage = 4
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

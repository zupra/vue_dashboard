<template lang="pug">
.Wrap

  notification(:notice="notice")

  img(src="~/static/img/spinner.svg")
  h1 TEST notification
  .btn.outline.red(@click="getUsers") Fetch Users
  pre {{Users}}

</template>


<script>
const TEST = [
  {
    title: 'Notification title',
    body:
      'Magnam explicabo repellat blanditiis, aperiam beatae eos dolor voluptas eveniet!',
    type: 'success'
  },
  {
    title: 'Notification title',
    body: 'Culpa distinctio, deleniti hic dolores officia quo?',
    type: 'danger'
  },
  {
    title: 'Notification title',
    body:
      'Repellendus quod aliquid ad, quae harum similique facilis aliquam! Unde explicabo est odit sit.',
    type: 'warning'
  },
  {
    title: 'Notification title',
    body:
      'Labore id praesentium necessitatibus corporis odit ratione quos eum delectus porro, eos suscipit cum earum officia expedita deleniti. Laborum itaque libero rerum!',
    type: 'primary'
  },
  {
    title: 'Notification title',
    body:
      'Vitae corporis fugit aspernatur praesentium impedit iste eaque adipisci ratione, animi porro libero deserunt, est dolore omnis ullam. Quod nobis incidunt cum.',
    type: 'info'
  },
  {
    title: 'Notification title',
    body:
      'Ducimus minima obcaecati tempore eaque libero aliquam commodi natus rerum cupiditate, doloribus culpa vitae dolorum?',
    type: 'danger'
  },
  {
    title: 'Notification title',
    body:
      'Dolorum deserunt alias officia atque dolor, voluptas harum. Inventore reiciendis reprehenderit provident!',
    type: 'primary'
  }
]
function randomInt(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  rand = Math.floor(rand)
  return rand
}

import Notification from '~/components/Notification.vue'
export default {
  components: {
    Notification
  },
  data() {
    return {
      // Notification
      interval: '',
      notice: {},
      //
      Users: []
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      let index = randomInt(0, 6)
      // console.log(index)
      this.notice = { ...TEST[index], id: +new Date() }
    }, randomInt(100, 5000))
    console.dir(this)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    getUsers() {
      fetch('//jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(data => (this.Users = data))
    }
  }
}
</script>

<style>
</style>

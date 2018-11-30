<template lang="pug">
.Notification(v-show="Stack.length")
  svg#closeAll(@click="Stack=[]", width='20', height='20', viewBox='0 0 20 20', stroke-width='2')
    line(x1='3', y1='3', x2='17', y2='17')
    line(x1='3', y1='17', x2='17', y2='3')
  .scrollableArea(@click.self="Stack=[]")
    transition-group(name="list")
      .Notice(v-for="(note,i) in Stack" :key="note.id" :class="note.type")
        svg.closeCard(@click="Stack.splice(i, 1)", width='20', height='20', viewBox='0 0 20 20', stroke-width='2')
          line(x1='3', y1='3', x2='17', y2='17')
          line(x1='3', y1='17', x2='17', y2='3')
        i.type(:class="note.type") {{note.type}}
        .title {{note.title}}
        .body {{note.body}}

</template>

<script>
export default {
  props: {
    notice: {
      type: Object, //type, title, body, id(for key)
      required: true
      // validator: prop => [].includes(prop)
    }
  },
  data() {
    return {
      Stack: []
    }
  },
  watch: {
    notice(notice) {
      //this.$set(notice, "id", +new Date());
      this.Stack.push(notice)
    },
    Stack() {
      this.Stack.length > 9 && this.Stack.splice(0, 1)
    }
  },
  beforeDestroy() {
    this.Stack = []
  }
}
</script>

<style lang="stylus" scoped>

.list-enter-active
  transition: all 1s
.list-leave-active
  transition: all .3s
.list-enter
.list-leave-to
  opacity: .3;
  // transform: translateY(200px)
  // transform: translate(120%, -100%)
  transform: translateX(120%)


$success = #03a9f4; // #1a7bb9
$danger = #ec4758;
$warning = #f7a54a;
$primary = #18a689;
$info = #21b9bb;

//http://designmodo.github.io/Flat-UI/
// $success = #27ad60;
// $primary = #1abc9c;
// $danger = #e74c3c;
// $warning = #f1c40f;
// $info = #3498db;



.scrollableArea
  cursor pointer //not-allowed no-drop

#closeAll
.closeCard
  cursor: pointer;
  position: absolute;
#closeAll
  z-index 101
  stroke: #FFF;
  left: -10px;
  background: #ff9800
  transition transform .3s
  &:hover

    transform scale(1.2) translateY(10%)
    //outline 4px solid #ff9800 //rgba(#FFF, .8)
    //border-radius .2em
    //background gold
    //stroke: #444;
.closeCard
  stroke: #CCC;
  top: 0.5em;
  right: 0.5em;
  &:hover
    stroke: #000;


.Notification
  height: 100vh;
  width: 320px;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  user-select: none;

  background: rgba(#dee2e6, .5);



.Notice {
  cursor default
  border-radius: 5px;
  background: #FFF;

  padding: .2em 0 1em 1em;
  position: relative;
  margin: 1rem;

}

.title {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.2rem;
  line-height: 1
  margin-bottom: 0.5rem;
}

.body {
  line-height: 1.2;
  color: #333;
  font-size: 90%;
}


.Notice {
  border-left: 0.5em solid transparent;

  &.success {
    border-left-color: $success;
  }

  &.danger {
    border-left-color: $danger;
  }

  &.warning {
    border-left-color: $warning;
  }

  &.primary {
    border-left-color: $primary;
  }

  &.info {
    border-left-color: $info;
  }
}

.type {
  font-size: 80%;

  &.success {
    color: $success;
  }

  &.danger {
    color: $danger;
  }

  &.warning {
    color: $warning;
  }

  &.primary {
    color: $primary;
  }

  &.info {
    color: $info;
  }
}
</style>

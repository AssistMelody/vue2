<template>
  <div class="hello">
    <h1>{{ info.fileUrl }}</h1>
    <!-- <h2>{{ count }}</h2>
    <h3>{{ data.name }}</h3>
    <h3>x:{{ x }},y:{{ y }}</h3>
    <button @click="add">+</button>
    <h4>{{ isShow }}</h4>
    <button @click="set(!isShow)">{{ isShow ? '隐藏' : '显示' }}</button> -->
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from '@vue/composition-api'
import { useMouse, useBoolean, useUploadSubtitle } from './hooks'

export default defineComponent({
  props: {
    msg: {
      type: String
    }
  },
  setup(props, { emit }) {
    console.log(props)
    const { x, y } = useMouse()
    const count = ref(0)
    const data = reactive({
      name: 'zhangsan'
    })
    const [isShow, { set }] = useBoolean(true)

    watch(count, (nv, ov) => {
      console.log(ov, nv)
      emit('test', nv)
    })
    const info = useUploadSubtitle()

    return {
      count,
      data,
      x,
      y,
      isShow,
      set,
      info
    }
  },
  methods: {
    add() {
      this.data.name = Math.random()
      this.count++
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

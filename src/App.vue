<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue 2.6.js App" @test="test" />
    <FileUpload />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import FileUpload from './components/FileUpload.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    FileUpload
  },
  methods: {
    test() {
      console.log('test')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

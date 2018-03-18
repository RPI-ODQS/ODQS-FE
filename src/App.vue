<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

body {
  background-color: rgb(222, 222, 222);
  padding: 0;
  margin: 0;
}

/* override vue-easytable */
.table-title {
  font-weight: bold;
  word-break: keep-all !important;
  display: inline-block;
  padding: 0 3px;
  vertical-align: middle;
  word-break: break-all;
  overflow: hidden;
  line-height: 1.2em;
}
</style>

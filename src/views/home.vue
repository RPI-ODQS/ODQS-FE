<template>
  <div class="home">
    <top-bar></top-bar>
    <div id="home-container"></div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    TopBar: topbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home-container {
  float: left;
  margin-top: 10px;
  width: 100%;
  height: 1000px;
  background-color: white;
}
</style>


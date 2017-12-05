<template>
  <div class="notfound">
    <top-bar></top-bar>
    <div class="notfound-container">
      <h1 class="notfound-message">404 Not Found ...</h1>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'notfound',
  data () {
    return {
    }
  },
  components: {
    TopBar: topbar
  }
}
</script>

<style scoped>
.notfound-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 96vw;
  height: calc(97vh - 80px);
  background-color: white;
}

.notfound-message {
  margin-top: 10vh;
}
</style>


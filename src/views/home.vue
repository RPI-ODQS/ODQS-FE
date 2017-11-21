<template>
  <div class="home">
    <top-bar></top-bar>
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
h1, h2 {
  font-weight: normal;
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


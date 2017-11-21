<template>
  <div class="sos">
    <top-bar></top-bar>
    <h1>404 Not Found</h1>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'sos',
  data () {
    return {
    }
  },
  components: {
    TopBar: topbar
  }
}
</script>

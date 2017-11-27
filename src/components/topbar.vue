<template>
<div id="topbar">
  <header>
    <img class="logo" src="../assets/logo.png">
    <span class="title" :span="10">RPI Online System</span>
  </header>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#topbar {
  text-align: left;
  background-color: white;
  height: 80px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
}

.logo {
  float: left;
  margin-top: 15px;
  margin-left: 40px;
  width: 50px;
  height: 50px;
}

.title {
  float: left;
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
}
</style>
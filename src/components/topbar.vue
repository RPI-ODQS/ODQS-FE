<template>
<div id="topbar">
  <header>
    <el-row>
      <el-col class="col" :span="2">
        <img class="logo" src="../assets/logo.png">
      </el-col>
      <el-col class="col title" :span="10">RPI Online System</el-col>
      <el-col class="col" :span="6"></el-col>
      <el-col class="col" :span="6"></el-col>
    </el-row>
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
  padding-left: 10%;
  padding-right: 10%;
  margin-bottom: 20px;
  text-align: left;
  background-color: white;
  height: 80px;
}

.logo {
  margin-top: 15px;
  margin-left: 30%;
  width: 50px;
  height: 50px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
}
</style>
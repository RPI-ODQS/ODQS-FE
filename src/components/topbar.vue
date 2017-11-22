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
  text-align: left;
  background-color: white;
  height: 80px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
}

.logo {
  float: right;
  margin-top: 15px;
  margin-right: 10%;
  width: 50px;
  height: 50px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
}
</style>
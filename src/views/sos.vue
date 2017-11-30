<template>
  <div class="sos">
    <top-bar></top-bar>
    <div id="sos-control-bar">
      <div class="sos-control-bar-title">Building: {{ buildingName }}</div>
      <div class="sos-control-bar-subtitle">System Operation Status</div>
      <el-button class="sos-control-bar-button">Refresh</el-button>
      <el-button class="sos-control-bar-button">Export</el-button>
      <el-button class="sos-control-bar-button">Show Selected</el-button>
      <el-button class="sos-control-bar-button">Show Photos</el-button>
    </div>
    <div id="tabs-container">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="SOS Data List" name="first">
          <sos-data-list/>
        </el-tab-pane>
        <el-tab-pane label="SOS Details" name="second">
          <sos-details/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'
import sosDataList from '../components/sos/sos-data-list'
import sosDetails from '../components/sos/sos-details'

export default {
  name: 'sos',
  data () {
    return {
      activeTab: 'first',
      buildingName: 'B1'
    }
  },
  components: {
    TopBar: topbar,
    SosDataList: sosDataList,
    sosDetails: sosDetails
  }
}
</script>

<style scoped>
#tabs-container {
  float: left;
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  height: calc(96vh - 80px);
  width: 70vw;
  background-color: white;
  overflow: scroll;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#sos-control-bar {
  float: left;
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  width: 23vw;
  height: calc(96vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.sos-control-bar-title {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 24px;
  text-align: left;
}

.sos-control-bar-subtitle {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 18px;
  text-align: left;
  margin-bottom: 3vh;
}

.sos-control-bar-button {
  width: 80%;
  margin: 1vh 0;
}
</style>


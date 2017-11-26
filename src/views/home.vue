<template>
  <div class="home">
    <top-bar></top-bar>
    <div id="choose-building-container">
      <div id="choose-building-title">Please Choose a Building:</div>
      <el-table :data="buildingList"
        height="490"
        highlight-current-row
        @current-change="handleBuildingSelect">
        <el-table-column
          type="index" width="50" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="name" label="Building Name" align="center" header-align="center">
        </el-table-column>
      </el-table>
    </div>
    <div id="choose-table-container">
      <div id="choose-table-title">Please Choose a Data Table:</div>
      <div class="chooose-table-button-container">
        <img class="img-button" src="../assets/icons/config.png"/>
        <span class="img-button-hint">MSC</span>
      </div>
      <div class="chooose-table-button-container">
        <img class="img-button" src="../assets/icons/parameters.png"/>
        <span class="img-button-hint">OPI</span>
      </div>
      <div class="chooose-table-button-container">
        <img class="img-button" src="../assets/icons/status.png"/>
        <span class="img-button-hint">SOS</span>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'home',
  data () {
    return {
      currentRow: null,
      buildingList: [
        {
          name: 'B1'
        }, {
          name: 'B2'
        }, {
          name: 'B3'
        }, {
          name: 'B4'
        }, {
          name: 'B5'
        }, {
          name: 'B6'
        }, {
          name: 'B7'
        }, {
          name: 'B8'
        }, {
          name: 'B9'
        }, {
          name: 'B10'
        }, {
          name: 'B11'
        }, {
          name: 'B12'
        }
      ]
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    handleBuildingSelect (val) {
      this.currentRow = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#choose-building-container {
  margin-top: 10px;
  margin-left: 1.5%;
  padding: 1%;
  float: left;
  width: 46%;
  background-color: white;
}

#choose-building-title, #choose-table-title {
  margin-left: 15px;
  font-size: 24px;
  text-align: left;
}

#choose-table-container {
  margin-top: 10px;
  margin-left: 1%;
  padding: 1%;
  float: left;
  width: 46%;
  height: 520px;
  background-color: white;
}

.img-button {
  padding: 30px;
  height: 70px;
  width: 70px;
  border-radius: 20px;
  background-color: whitesmoke;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.img-button:hover {
  background-color: white;
}

.chooose-table-button-container {
  margin: 25% 5%;
  height: 130px;
  width: 130px;
  float: left;
}
</style>


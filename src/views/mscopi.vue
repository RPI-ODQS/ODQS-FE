<template>
  <div class="mscopi">
    <top-bar></top-bar>
    <div id="mscopi-operation-container">
      <div id="current-building-info" class="opc-info data-table-title">Building: {{ currentBuilding }}</div>
      <div id="type-info" class="opc-info data-table-subtitle">{{ type }}</div>
      <el-button class="mscopi-button">Edit</el-button>
      <el-button class="mscopi-button">Refresh</el-button>
      <el-button class="mscopi-button">Export</el-button>
    </div>
    <div id="data-field-container">
      <div id="data-table-container">
        <el-table :data="dataTable"
          highlight-current-row
          @current-change="handleDataRowSelect">
          <el-table-column
            type="index" width="50" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="dataField" label="Data Field" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="value" label="Value" align="center" header-align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'mscopi',
  data () {
    return {
      type: 'Mechanical Mystem Configurations',
      currentBuilding: 'B1',
      dataTable: [
        {
          dataField: 'testField',
          value: '233'
        }
      ]
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    handleDataRowSelect (val) {
      this.currentBuilding = val
    }
  }
}
</script>

<style scoped>
#data-field-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 70vw;
  height: calc(96vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  overflow: scroll;
}

#data-table-container {
  height: calc(96vh - 110px);
  overflow: scroll;
}

#mscopi-operation-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 23vw;
  height: calc(96vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.data-table-title {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 24px;
  text-align: left;
}

.data-table-subtitle {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 18px;
  text-align: left;
  margin-bottom: 3vh;
}

.mscopi-button {
  margin: 1vh 0;
  width: 80%;
}
</style>

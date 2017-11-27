<template>
  <div class="mscopi">
    <top-bar></top-bar>
    <div id="data-field-container">
      <div id="data-table-title">{{ type }} Data Table</div>
      <el-table :data="dataTable"
        height="490"
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
    <div id="operation-container">
      <div id="current-building-info" class="opc-info">{{ currentBuilding }}</div>
      <div id="type-info" class="opc-info">{{ type }}</div>
      <el-button>Edit</el-button>
      <el-button>Refresh</el-button>
      <el-button>Export</el-button>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'mscopi',
  data () {
    return {
      type: 'MSC',
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
      this.currentRow = val
    }
  }
}
</script>

<style scoped>
#data-field-container {
  margin-top: 10px;
  margin-left: 1%;
  padding: 1%;
  float: left;
  width: 60%;
  background-color: white;
}

#operation-container {
  margin-top: 10px;
  margin-left: 1%;
  padding: 1%;
  float: left;
  width: 33%;
  height: 520px;
  background-color: white;
}

#data-table-title {
  margin-left: 15px;
  font-size: 24px;
  text-align: left;
}
</style>

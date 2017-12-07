<template>
  <div class="sos-data-list">
    <div class="sos-data-list-title">Select Data Field:</div>
    <el-form id="sos-data-select-form"
          ref="selectedForm"
          :model="selectedForm"
          label-position="left"
          label-width="100px">
      <el-form-item class="sos-data-form-item" label="Temperature">
        <el-checkbox-group v-model="selectedForm.temperature">
          <el-checkbox label="Temperature 1" name="temperature"></el-checkbox>
          <el-checkbox label="Temperature 2" name="temperature"></el-checkbox>
          <el-checkbox label="Temperature 3" name="temperature"></el-checkbox>
          <el-checkbox label="Temperature 4" name="temperature"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="sos-data-form-item" label="Flow">
        <el-checkbox-group v-model="selectedForm.flow">
          <el-checkbox label="Flow 1" name="flow"></el-checkbox>
          <el-checkbox label="Flow 2" name="flow"></el-checkbox>
          <el-checkbox label="Flow 3" name="flow"></el-checkbox>
          <el-checkbox label="Flow 4" name="flow"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="sos-data-form-item" label="Pressure">
        <el-checkbox-group v-model="selectedForm.pressure">
          <el-checkbox label="Pressure 1" name="pressure"></el-checkbox>
          <el-checkbox label="Pressure 2" name="pressure"></el-checkbox>
          <el-checkbox label="Pressure 3" name="pressure"></el-checkbox>
          <el-checkbox label="Pressure 4" name="pressure"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="sos-data-form-item" label="Pressure">
        <el-checkbox-group v-model="selectedForm.current">
          <el-checkbox label="Current 1" name="current"></el-checkbox>
          <el-checkbox label="Current 2" name="current"></el-checkbox>
          <el-checkbox label="Current 3" name="current"></el-checkbox>
          <el-checkbox label="Current 4" name="current"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="sos-data-form-item" label="Time">
        <el-date-picker
          v-model="selectedForm.timeRange"
          type="datetimerange"
          placeholder="选择时间范围">
        </el-date-picker>
        <el-button type="primary">Search</el-button>
      </el-form-item>
    </el-form>
    <div id="sos-data-list-result">
      <line-chart
        :chart-data="chartData"
        :options="chartOptions"
        :height="220"
      />
    </div>
  </div>
</template>

<script>
import LineChart from '../charts/line-chart'

export default {
  name: 'sos-data-list',
  data () {
    return {
      selectedForm: {
        temperature: [],
        flow: [],
        pressure: [],
        current: [],
        timeRange: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      buildingName: 'B1',
      chartData: {
        labels: [
          'January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Search Result',
            backgroundColor: '#f87979',
            data: [
              40, 20, 30, 40,
              20, 50, 40, 30,
              40, 60, 30, 50
            ]
          }
        ]
      },
      chartOptions: {
      }
    }
  },
  components: {
    LineChart
  }
}
</script>

<style scoped>
#sos-data-list-left-container {
  float: left;
  width: 60vw;
}

.sos-data-list-title {
  margin-left: 15px;
  font-size: 24px;
  text-align: left;
}

.sos-data-list-subtitle {
  margin-left: 15px;
  font-size: 18px;
  text-align: left;
  margin-bottom: 5vh;
}

#sos-data-select-form {
  margin-left: 15px;
  margin-top: 20px;
  text-align: left;
}

.sos-data-form-item {
  margin-top: 10px;
  margin-bottom: 10px;
}

#sos-data-list-right-container {
  width: 33vw;
  padding: 0 2vw;
  background-color: white;
  overflow: scroll;
}

.sos-data-list-button {
  margin: 1vh 0;
  width: 90%;
}

#sos-data-list-result {
  margin-top: 50px;
}
</style>

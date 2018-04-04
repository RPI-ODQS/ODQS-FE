<template>
  <div class="sos-data-list">
    <div class="sos-data-list-title">Select Data Field:</div>
    <el-form id="sos-data-select-form"
      ref="selectedForm"
      :model="selectedForm"
      label-position="left"
      label-width="100px"
      v-loading="isLoadingHeader"
    >
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
      <el-form-item class="sos-data-form-item" label="Current">
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
        <el-button
          type="primary"
          @click="onClickSearch"
        >
          Search
        </el-button>
      </el-form-item>
    </el-form>
    <div id="sos-data-list-result">
      <line-chart
        :chart-data="temperatureChartData"
        :options="chartOptions"
        :height="220"
      />
    </div>

    <div id="invisiable-link-container">
      <a
        id="invisiable-link"
        ref="csv"
        :href="csvLink"
      >
        ##
      </a>
    </div>

  </div>
</template>

<script>
import LineChart from '../charts/line-chart'

export default {
  name: 'sos-data-list',
  data () {
    return {
      buildingName: null,
      buildingId: null,
      csvLink: null,
      isLoadingHeader: false,
      sosHeader: null,
      selectedForm: {
        temperature: [],
        flow: [],
        pressure: [],
        current: [],
        timeRange: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      temperatureChartData: {
        labels: [
          'January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Temperture 1',
            backgroundColor: 'RGBA(188, 223, 250, 0.25)',
            data: [
              40, 20, 30, 40,
              20, 50, 40, 30,
              40, 60, 30, 50
            ]
          }, {
            label: 'Temperture 2',
            backgroundColor: 'RGBA(103, 182, 244, 0.25)',
            data: [
              20, 50, 80, 60,
              50, 30, 20, 60,
              20, 70, 20, 70
            ]
          }, {
            label: 'Temperture 3',
            backgroundColor: 'RGBA(179, 158, 217, 0.25)',
            data: [
              10, 40, 70, 20,
              30, 30, 30, 70,
              20, 40, 50, 60
            ]
          }, {
            label: 'Temperture 4',
            backgroundColor: 'RGBA(79, 110, 251, 0.25)',
            data: [
              40, 50, 60, 70,
              60, 50, 30, 20,
              20, 30, 50, 60
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
  },
  methods: {
    async export () {
      let request = {
        auth: this.$store.state.authInfo,
        params: {
          buildingId: 1,
          sensorsIds: {
            temperature: ['temperature 1'],
            flow: [],
            pressure: [],
            current: []
          },
          timeFrom: '2017-10-10 1',
          timeTo: '2017-10-11 11'
        }
      }
      try {
        let res = await this.$http.get('/sos/csv', request)
        this.csvLink = this.$http.defaults.baseURL + res.data.url.substr(1)
        this.$nextTick(() => { document.getElementById('invisiable-link').click() })
      } catch (err) {
        console.log(err)
      }
    },
    async getSosHeader () {
      // this.isLoadingHeader = true
      try {
        let request = {
          auth: this.$store.state.authInfo,
          params: {
            buildingId: this.buildingId
          }
        }
        console.log(request)
        let res = await this.$http.get('/sos/header', request)
        console.log(res)
        // this.isLoadingHeader = false
      } catch (err) {
        console.log(err)
        // this.isLoadingHeader = false
      }
    },
    async onClickSearch () {
      let request = {
        auth: this.$store.state.authInfo,
        params: {
          buildingId: 1,
          timeFrom: '2017-12-20 10',
          timeTo: '2017-12-20 11'
        }
      }
      try {
        let res = await this.$http.get('/sos/data', request)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  created: function () {
    this.building = this.$route.query.name
    this.buildingId = this.$route.query.id

    this.getSosHeader()
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

#invisiable-link-container {
  /* visibility: hidden; */
  height: 0;
  overflow: hidden;
}
</style>

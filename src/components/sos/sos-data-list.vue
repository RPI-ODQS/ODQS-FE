<template>
  <div class="sos-data-list">
    <div class="sos-data-list-title">Select Data Field:</div>
    <el-form id="sos-data-select-form"
      ref="selectedForm"
      :model="selectedForm"
      label-position="left"
      label-width="70px"
      v-loading="isLoadingHeader"
    >
      <el-form-item class="sos-data-form-item" label="Current">
        <el-checkbox-group v-model="selectedForm.current">
          <el-checkbox
            v-for="(item, index) in sosHeader.Current"
            :key="index"
            :label="item"
            name="current"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="sos-data-form-item" label="Flow">
        <el-checkbox-group v-model="selectedForm.flow">
          <el-checkbox
            v-for="(item, index) in sosHeader.Flow"
            :key="index"
            :label="item"
            name="flow"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
       <el-form-item class="sos-data-form-item" label="Pressure">
        <el-checkbox-group v-model="selectedForm.pressure">
          <el-checkbox
            v-for="(item, index) in sosHeader.Pressure"
            :key="index"
            :label="item"
            name="pressure"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
       <el-form-item class="sos-data-form-item" label="Switch">
        <el-checkbox-group v-model="selectedForm.switch">
          <el-checkbox
            v-for="(item, index) in sosHeader.Switch"
            :key="index"
            :label="item"
            name="switch"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="sos-data-form-item" label="Temperature">
        <el-checkbox-group v-model="selectedForm.temperature">
          <el-checkbox
            v-for="(item, index) in sosHeader.Temperature"
            :key="index"
            :label="item"
            name="temperature"
          ></el-checkbox>
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
        v-for="(item, index) in chartNames"
        :key="index"
        :chart-data="chartData[item]"
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
      sosHeader: {
        Current: [],
        Flow: [],
        Pressure: [],
        Switch: [],
        Temperature: []
      },
      selectedForm: {
        current: [],
        flow: [],
        pressure: [],
        switch: [],
        temperature: [],
        timeRange: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },

      // chart
      colors: [
        'RGBA(188, 223, 250, 0.25)',
        'RGBA(103, 182, 244, 0.25)',
        'RGBA(179, 158, 217, 0.25)',
        'RGBA(79, 110, 251, 0.25)'
      ],
      chartNames: [
        'Temperature'
      ],
      chartLabels: [],
      chartData: {
        Temperature: {
          labels: [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
          ],
          datasets: [
            {
              label: 'Temperture 1',
              data: [
                40, 20, 30, 40,
                20, 50, 40, 30,
                40, 60, 30, 50
              ]
            }, {
              label: 'Temperture 2',
              data: [
                20, 50, 80, 60,
                50, 30, 20, 60,
                20, 70, 20, 70
              ]
            }
          ]
        }
      },
      chartOptions: {}
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
      this.isLoadingHeader = true
      try {
        let request = {
          auth: this.$store.state.authInfo,
          params: {
            buildingId: this.buildingId
          }
        }
        let res = await this.$http.get('/sos/header', request)
        for (let key in res.data.current) {
          this.sosHeader.Current.push(key)
        }
        for (let key in res.data.Flow) {
          this.sosHeader.Flow.push(key)
        }
        for (let key in res.data.pressure) {
          this.sosHeader.Pressure.push(key)
        }
        for (let key in res.data.switch) {
          this.sosHeader.Switch.push(key)
        }
        for (let key in res.data.temperature) {
          this.sosHeader.Temperature.push(key)
        }
        this.isLoadingHeader = false
      } catch (err) {
        console.log(err)
        this.isLoadingHeader = false
      }
    },
    async onClickSearch () {
      console.log(this.selectedForm)
      let [from, to] = [...this.selectedForm.timeRange].map(value => `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()}`)
      let request = {
        auth: this.$store.state.authInfo,
        params: {
          buildingId: this.buildingId,
          timeFrom: from,
          timeTo: to
        }
      }
      try {
        let res = await this.$http.get('/sos/data', request)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    generateLabels (from, timeStep, n) {
      // TODO
      for (let i = 0; i < n; ++i) {
        this.chartLabels.push(from + timeStep * i)
      }
    },
    // content: [{label: xxx, data: xxx}]
    generateChart (type, content) {
      let label = this.chartLabels
      this.chartData[type] = {
        labels: label,
        datasets: content
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
.el-checkbox {
  margin-left: 30px;
}

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

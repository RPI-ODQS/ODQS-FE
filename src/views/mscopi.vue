<template>
  <div class="mscopi">
    <!-- Top Bar component -->
    <top-bar/>

    <!-- Left Part: Contorller -->
    <div id="controller-container">
      <div
        id="current-building-info"
        class="opc-info data-table-title"
      >
        Building: {{ mscForm.buildingName }}
      </div>
      <div
        id="type-info"
        class="opc-info data-table-subtitle"
      >
        {{ type }}
      </div>
      <el-button
        class="mscopi-button"
        @click="onClickSave"
      >
        Save
      </el-button>
      <el-button
        class="mscopi-button"
        @click="onClickRefresh"
      >
        Refresh
      </el-button>
      <el-button
        class="mscopi-button"
        @click="onClickExport"
      >
        Export
      </el-button>
    </div>

    <!-- Right Part: Data Field -->
    <div
      id="data-field-container"
      v-loading="isLoadingForm"
    >
      <!-- Form of Mechanical Mystem Configurations -->
      <el-form
        class="form"
        ref="mscForm"
        :model="mscForm"
        label-width="100px"
        v-if="type === 'Mechanical System Configurations'"
      >
        <el-form-item
          class="form-item"
          label="Address"
        >
          <el-input
            v-model="mscForm.address"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="City">
          <el-input
            v-model="mscForm.city"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Zip Code">
          <el-input
            v-model="mscForm.zipCode"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Active">
          <el-switch
            active-text=""
            inactive-text=""
            v-model="mscForm.isActive"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Starting Date">
          <el-input
            v-model="mscForm.dateStart"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Brand">
          <el-input
            v-model="mscForm.waterHeaterBrand"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Capacity">
          <el-input
            v-model="mscForm.waterHeaterCapacity"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Efficiency"
        >
          <el-input
            v-model="mscForm.waterHeaterRatedEfficiency"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Storage"
        >
          <el-input
            v-model="mscForm.storageCapacity"
            :disabled="!isEditing"
          />
        </el-form-item>
      </el-form>

      <v-table
        class="opi-table1"
        is-horizontal-resize
        style="width:100%"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :columns="opiColumns1"
        :table-data="opiTableData1"
        :cell-edit-done="opiCellEditDone1"
      />

      <!-- Form of Optimizing Input Parameters -->
      <v-table
        is-horizontal-resize
        style="width:100%"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :columns="opiColumns"
        :table-data="opiTableData"
        :cell-edit-done="opiCellEditDone"
        v-if="type === 'Optimizing Input Parameters'"
      />

    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'mscopi',
  data () {
    return {
      type: '',
      isEditing: false,
      isLoadingForm: false,
      mscForm: {
        id: null,
        buildingName: null,
        address: null,
        city: null,
        zipCode: null,
        isActive: null,
        dateStart: null,
        waterHeaterBrand: null,
        waterHeaterCapacity: null,
        waterHeaterRatedEfficiency: null,
        storageCapacity: null
      },
      opiColumns: [
        {
          field: 'hour',
          title: 'Hour',
          width: 30,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        }, {
          field: 'hotWaterDemand',
          title: 'Hot Water Demand',
          width: 130,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'electricityPrice',
          title: 'Electricity Price',
          width: 130,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'ambientTemperature',
          title: 'Ambient Temperature',
          width: 130,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'demandResponse',
          title: 'Demand Response',
          width: 130,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'solarGeneration',
          title: 'Solar Generation',
          width: 130,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }
      ],
      opiTableData: [],
      opiColumns1: [
        {
          field: 'optimizationType',
          title: 'Optimization Type',
          width: 150,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'parameter1',
          title: 'parameter 1',
          width: 150,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'parameter2',
          title: 'Parameter 2',
          width: 150,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }
      ],
      opiTableData1: [
        {
          optimizationType: '',
          parameter1: '',
          parameter2: ''
        }
      ],
      opiForm: {
        systemDemand: [
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null
        ],
        electricityPrice: [
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null
        ],
        ambientTemperature: [
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null
        ],
        solarEnergyOutput: [
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null
        ],
        demandResponse: [
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null,
          null, null, null, null, null, null
        ],
        isReqForWP: false,
        inputVar1: null,
        inputVar2: null,
        inputVar3: null
      }
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    handleDataRowSelect (val) {
      this.mscForm.buildingName = val
    },
    onClickSave () {
      // TODO: send data to BE
      if (this.type === 'Mechanical System Configurations') {

      } else {
        this.isLoadingForm = true
        this.$http.post('/update/opi', this.opiForm, {
          auth: {
            username: this.$store.state.userInfo.token,
            password: 'unused'
          }
        })
        .then(res => {
          this.isLoadingForm = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingForm = false
        })
      }
    },
    onClickRefresh () {
      this.refreshData()
    },
    onClickExport () {},
    refreshData () {
      if (this.type === 'Mechanical System Configurations') {
        this.isLoadingForm = true
        this.$http.get('/msc', {
          params: {
            id: this.mscForm.id
          },
          auth: {
            username: this.$store.state.userInfo.token,
            password: 'unused'
          }
        })
        .then(res => {
          this.mscForm = res.data
          this.isLoadingForm = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingForm = false
        })
      } else {
        this.isLoadingForm = true
        this.$http.get('/opi', {
          params: {
            id: this.$route.query.id
          },
          auth: {
            username: this.$store.state.userInfo.token,
            password: 'unused'
          }
        })
        .then(res => {
          console.log(res)
          // this.opiForm = res.data
          this.isLoadingForm = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingForm = false
        })
      }
    },
    // callback
    opiCellEditDone (newValue, oldValue, rowIndex, rowData, field) {
      this.opiTableData[rowIndex][field] = newValue
    },
    opiCellEditDone1 (newValue, oldValue, rowIndex, rowData, field) {
      this.opiTableData1[rowIndex][field] = newValue
    },
    generateDefaultOpiData () {
      for (let i = 1; i <= 24; ++i) {
        this.opiTableData.push({
          hour: i,
          hotWaterDemand: '',
          electricityPrice: '',
          ambientTemperature: '',
          demandResponse: '',
          solarGeneration: ''
        })
      }
    }
  },
  created: function () {
    this.type = this.$route.query.type
    this.mscForm.id = this.$route.query.id
    this.mscForm.buildingName = this.$route.query.name

    this.generateDefaultOpiData()
    this.refreshData()
  }
}
</script>

<style scoped>
#data-field-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 72vw;
  height: calc(98vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  overflow: scroll;
}

.data-table-container {
  height: calc(98vh - 110px);
  overflow: scroll;
}

#controller-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 25vw;
  height: calc(98vh - 80px);
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

.form {
  margin-top: 5vh;
  text-align: left;
}

.short-form-item {
  float: left;
  width: 50%;
}

.opi-form-tag {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 5px;
}

.opi-data-array-input-item {
  width: 15%;
  float: left;
  margin-right: 1%;
  margin-bottom:5px;
}

.opi-table1 {
  margin-bottom: 2vh;
}
</style>

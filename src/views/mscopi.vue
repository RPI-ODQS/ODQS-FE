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
        Building: {{ buildingName }}
      </div>
      <div
        id="type-info"
        class="opc-info data-table-subtitle"
      >
        {{ type }}
      </div>

      <el-button
        class="mscopi-button"
        v-for="(item, index) in ['Save', 'Refresh', 'Export', 'Edit']"
        :key="index"
        @click="onClick(item)"
        v-if="type === 'Mechanical System Configurations' || item !== 'Edit'"
      >
        {{ item }}
      </el-button>
    </div>

    <!-- Right Part: Data Field -->
    <div
      id="data-field-container"
      v-loading="isLoadingForm"
    >
      <!-- Form of Mechanical System Configurations -->
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

      <!-- Form of Optimizing Input Parameters -->
      <v-table
        class="opi-table"
        is-horizontal-resize
        style="width:100%"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :columns="opiColumns2"
        :table-data="opiTableData2"
        :cell-edit-done="opiCellEditDone2"
        v-if="type === 'Optimizing Input Parameters'"
      />

      <v-table
        class="opi-table"
        is-horizontal-resize
        style="width:100%"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :columns="opiColumns1"
        :table-data="opiTableData1"
        :cell-edit-done="opiCellEditDone"
        v-if="type === 'Optimizing Input Parameters'"
      />
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'
import opiTableConfig from '../metadata/easytable/config'
import formFactory from '../models/formFactory'

export default {
  name: 'mscopi',
  data () {
    return {
      type: '',
      buildingId: null,
      buildingName: null,
      isEditing: false,
      isLoadingForm: false,

      // msc data model
      mscForm: formFactory.getInitMscForm(),

      // opi data models
      opiColumns1: opiTableConfig.getOpiTable1Title(),
      opiColumns2: opiTableConfig.getOpiTable2Title(),
      opiTableData1: [],
      opiTableData2: [],
      opiForm: {  // receive data form
        // buildId: null,
        // time: null,
        // hotWater: [],
        // elePrice: [],
        // ambTemperature: [],
        // solarEnergyOutput: [],
        // demandResponseScaler: [],
        // type: null,
        // input1: null,
        // input2: null
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
    onClick (op) {
      switch (op) {
        case 'Save':
          this.onClickSave()
          break
        case 'Refresh':
          this.onClickRefresh()
          break
        case 'Export':
          this.onClickExport()
          break
        case 'Edit':
          this.onClickEdit()
          break
      }
    },
    onClickSave () {
      // TODO: send data to BE
      if (this.type === 'Mechanical System Configurations') {
        this.isLoadingForm = true
        this.mscForm.buildingId = this.buildingId
        this.$http.put('/buildings', this.mscForm, {
          auth: this.$store.state.authInfo
        })
        .then(res => {
          console.log(res)
          this.isLoadingForm = false
          this.isEditing = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingForm = false
          this.isEditing = false
        })
      } else {
        this.isLoadingForm = true
        this.convertOpiFormat(1, [this.opiTableData1, this.opiTableData2])
        console.log(this.opiForm)
        this.$http.post('/update/opi', this.opiForm, {
          auth: {
            username: this.$store.state.userInfo.token,
            password: 'unused'
          }
        })
        .then(res => {
          console.log(res)
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
    onClickEdit () {
      this.isEditing = true
    },
    init () {
      this.mscForm = {}
      this.opiForm = {}
      this.opiTableData1 = []
      this.opiTableData2 = []
    },
    refreshData () {
      this.init()
      if (this.type === 'Mechanical System Configurations') {
        // MSC Req
        this.isLoadingForm = true
        this.$http.get('/msc', {
          params: {
            id: this.$route.query.id
          },
          auth: this.$store.state.authInfo
          // {
          //   username: this.$store.state.userInfo.token,
          //   password: 'unused'
          // }
        })
        .then(res => {
          this.mscForm = res.data
          console.log(res.data)
          this.isLoadingForm = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingForm = false
        })
      } else {
        // OPI Req
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
          this.opiForm = res.data
          this.convertOpiFormat(0, this.opiForm)
          this.isLoadingForm = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingForm = false
        })
      }
    },

    // type === 0: convert the result from the server; input = this.opiForm
    // type === 1: convert the client data model; input = [this.opiTableData1, this.opiTableData2]
    convertOpiFormat (type, input) {
      if (type === 0) {
        for (let i = 0; i < 24; ++i) {
          this.opiTableData1.push({
            hour: i,
            hotWaterDemand: input.hotWater[i],
            electricityPrice: input.elePrice[i],
            ambientTemperature: input.ambTemperature[i],
            demandResponse: input.demandResponseScaler[i],
            solarGeneration: input.solarEnergyOutput[i]
          })
        }
        this.opiTableData2.push({
          optimizationType: input.type,
          parameter1: input.input1,
          parameter2: input.input2
        })
      } else {
        let oldTime = this.opiForm.time
        let oldBuildingId = this.this.$route.query.id
        this.opiForm = formFactory.getInitOpiForm()
        this.opiForm.time = oldTime
        this.opiForm.buildingId = oldBuildingId
        for (let i = 0; i < 24; ++i) {
          this.opiForm.hotWater[i] = this.handleUndefinedValue(input[0][i].hotWaterDemand)
          this.opiForm.electricityPrice[i] = this.handleUndefinedValue(input[0][i].electricityPrice)
          this.opiForm.ambientTemperature[i] = this.handleUndefinedValue(input[0][i].ambientTemperature)
          this.opiForm.demandResponse[i] = this.handleUndefinedValue(input[0][i].demandResponse)
          this.opiForm.solarEnergyOutput[i] = this.handleUndefinedValue(input[0][i].solarGeneration)
        }
        this.opiForm.type = input[1][0].optimizationType
        this.opiForm.inputVar1 = input[1][0].parameter1
        this.opiForm.inputVar2 = input[1][0].parameter2
      }
    },
    handleUndefinedValue (input) {
      if (input) {
        return input
      } else {
        return ''
      }
    },

    // DIY my vue-easytables
    opiCellEditDone (newValue, oldValue, rowIndex, rowData, field) {
      this.opiTableData1[rowIndex][field] = newValue
    },
    opiCellEditDone2 (newValue, oldValue, rowIndex, rowData, field) {
      this.opiTableData2[rowIndex][field] = newValue
    }
  },
  created: function () {
    this.type = this.$route.query.type
    this.buildingId = this.$route.query.id
    this.buildingName = this.$route.query.name
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

.opi-table {
  margin-bottom: 2vh;
}
</style>

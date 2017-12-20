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
        @click="onClickEdit"
        v-if="!isEditing"
      >
        Edit
      </el-button>
      <el-button
        class="mscopi-button"
        @click="onClickSave"
        v-if="isEditing"
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
    <div id="data-field-container">
      <!-- Form of Mechanical Mystem Configurations -->
      <el-form
        class="form"
        ref="mscForm"
        :model="mscForm"
        label-width="100px"
        v-if="type === 'Mechanical System Configurations'"
        v-loading="isLoadingMscForm"
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
      <el-form
        class="form"
        ref="opiForm"
        :model="opiForm"
        v-if="type === 'Optimizing Input Parameters'"
        v-loading="isLoadingMscForm"
      >
        <div class="opi-form-tag">System Demand</div>
        <el-form-item>
          <el-input
            v-for="(item, index) in opiForm.systemDemand"
            :key="index"
            class="opi-data-array-input-item"
            :v-model="item"
            :disabled="!isEditing"
          />
        </el-form-item>
        <div class="opi-form-tag">Electricity Price</div>
        <el-form-item>
          <el-input
            v-for="(item, index) in opiForm.electricityPrice"
            :key="index"
            class="opi-data-array-input-item"
            :v-model="item"
            :disabled="!isEditing"
          />
        </el-form-item>
        <div class="opi-form-tag">Ambient Temperature</div>
        <el-form-item>
          <el-input
            v-for="(item, index) in opiForm.ambientTemperature"
            :key="index"
            class="opi-data-array-input-item"
            :v-model="item"
            :disabled="!isEditing"
          />
        </el-form-item>
        <div class="opi-form-tag">Solar Energy Output</div>
        <el-form-item>
          <el-input
            v-for="(item, index) in opiForm.solarEnergyOutput"
            :key="index"
            class="opi-data-array-input-item"
            :v-model="item"
            :disabled="!isEditing"
          />
        </el-form-item>
        <div class="opi-form-tag">Demand Response Scaler</div>
        <el-form-item>
          <el-input
            v-for="(item, index) in opiForm.demandResponse"
            :key="index"
            class="opi-data-array-input-item"
            :v-model="item"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Req for WP"
          label-width="100px"
        >
          <el-switch
            active-text=""
            inactive-text=""
            v-model="opiForm.isReqForWP"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Input Var1"
          label-width="100px"
        >
          <el-input
            v-model="opiForm.inputVar1"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Input Var2"
          label-width="100px"
        >
          <el-input
            v-model="opiForm.inputVar2"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Input Var3"
          label-width="100px"
        >
          <el-input
            v-model="opiForm.inputVar3"
            :disabled="!isEditing"
          />
        </el-form-item>
      </el-form>
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
      isLoadingMscForm: false,
      isLoadingOpiForm: false,
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
    onClickEdit () {
      this.isEditing = true
    },
    onClickSave () {
      // TODO: send data to BE
      this.isEditing = false
      if (this.type === 'Mechanical System Configurations') {

      } else {
        this.isLoadingOpiForm = true
        this.$http.post('/update/opi', this.opiForm, {
          auth: {
            username: this.$store.state.userInfo.token,
            password: 'unused'
          }
        })
        .then(res => {
          this.isLoadingOpiForm = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingOpiForm = false
        })
      }
    },
    onClickRefresh () {
      this.refreshData()
    },
    onClickExport () {},
    refreshData () {
      if (this.type === 'Mechanical System Configurations') {
        this.isLoadingMscForm = true
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
          this.isLoadingMscForm = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingMscForm = false
        })
      } else {
        this.isLoadingOpiForm = true
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
          this.isLoadingOpiForm = false
        })
        .catch(err => {
          console.log(err)
          this.isLoadingOpiForm = false
        })
      }
    }
  },
  created: function () {
    this.type = this.$route.query.type
    this.mscForm.id = this.$route.query.id
    this.mscForm.buildingName = this.$route.query.name

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
  width: 70vw;
  height: calc(96vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  overflow: scroll;
}

.data-table-container {
  height: calc(96vh - 110px);
  overflow: scroll;
}

#controller-container {
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
</style>

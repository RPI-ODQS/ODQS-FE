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
        v-if="type === 'Mechanical Mystem Configurations'"
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
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Starting Date">
          <el-input
            v-model="mscForm.startingDate"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Brand">
          <el-input
            v-model="mscForm.equipmentBrand"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Capacity">
          <el-input
            v-model="mscForm.equipmentCapacity"
            :disabled="!isEditing"
          />
        </el-form-item>
        <el-form-item
          class="short-form-item"
          label="Efficiency">
          <el-input
            v-model="mscForm.ratedEfficiency"
            :disabled="!isEditing"
          />
        </el-form-item>
      </el-form>

      <!-- Form of Optimizing Input Parameters -->
      <el-form
        ref="opiForm"
        :model="opiForm"
        label-width="80px"
        v-if="type === 'Optimizing Input Parameters'"
      >
        <!-- <el-form-item
          class="short-form-item"
          label="System Demand">
          <el-input v-model="opiForm.systemDemand"></el-input>
        </el-form-item> -->
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
      mscForm: {
        buildingId: null,
        buildingName: null,
        address: null,
        city: null,
        zipCode: null,
        isActive: null,
        startingDate: null,
        equipmentBrand: null,
        equipmentCapacity: null,
        ratedEfficiency: null
      },
      opiForm: {

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
    },
    onClickRefresh () {},
    onClickExport () {}
  },
  created: function () {
    this.type = this.$route.query.type
    this.mscForm.buildingId = this.$route.query.id
    this.mscForm.buildingName = this.$route.query.name
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
</style>

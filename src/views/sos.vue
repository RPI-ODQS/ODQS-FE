<template>
  <div class="sos">
    <top-bar></top-bar>
    <div id="sos-control-bar">
      <div class="sos-control-bar-title">Building: {{ buildingName }}</div>
      <div class="sos-control-bar-subtitle">{{ displayInfo }}</div>
      <el-button
        class="sos-control-bar-button"
        v-if="activeTab !== 'Photo'"
      >
        Refresh
      </el-button>
      <el-button
        class="sos-control-bar-button"
        v-if="activeTab !== 'Photo'"
        @click="onClickExport"
      >
        Export
      </el-button>
      <el-button
        class="sos-control-bar-button"
        v-if="activeTab !== 'Photo'"
        @click="onClickUpload"
      >
        Upload
      </el-button>
      <el-button
        class="sos-control-bar-button"
        v-if="activeTab === 'Photo'"
      >
        Take Photo
      </el-button>
      <el-button
        class="sos-control-bar-button"
        v-if="activeTab === 'Photo'"
      >
        Download
      </el-button>
      <el-button
        class="sos-control-bar-button"
        v-if="activeTab === 'Photo'"
      >
        Delete
      </el-button>
    </div>
    <div id="tabs-container">
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-click="handleSwitch"
      >
        <el-tab-pane label="SOS Data List" name="DataList">
          <sos-data-list ref="sdl"/>
        </el-tab-pane>
        <el-tab-pane label="SOS Photo" name="Photo">
          <sos-photo/>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- upload dialog -->
    <el-dialog
      title="Upload"
      :visible.sync="uploadDialogVisible"
      width="60%"
    >
      <el-upload
        drag
        action="/sos/update"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drag your file here，or <em>click to upload</em></div>
        <div class="el-upload__tip" slot="tip">Upload SOS CSV</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import topbar from '../components/topbar'
import sosDataList from '../components/sos/sos-data-list'
import sosPhoto from '../components/sos/sos-photo'

export default {
  name: 'sos',
  data () {
    return {
      activeTab: 'DataList',  // 'DataList' or 'Photo'
      buildingName: null,
      buildingId: null,
      displayInfo: 'System Operation Status',
      uploadDialogVisible: false
    }
  },
  components: {
    TopBar: topbar,
    SosDataList: sosDataList,
    sosPhoto: sosPhoto
  },
  methods: {
    handleSwitch (tab, event) {
      if (tab.name === 'DataList') {
        this.displayInfo = 'System Operation Status'
      } else {
        this.displayInfo = 'Web Camera'
      }
    },
    onClickExport () {
      this.$refs.sdl.export()
    },
    onClickUpload () {
      this.uploadDialogVisible = true
    }
  },
  created: function () {
    this.buildingName = this.$route.query.name
    this.buildingId = this.$route.query.id
  }
}
</script>

<style scoped>
#tabs-container {
  float: left;
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  height: calc(98vh - 80px);
  width: 72vw;
  background-color: white;
  overflow: scroll;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#sos-control-bar {
  float: left;
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  width: 25vw;
  height: calc(98vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  overflow: scroll;
}

.sos-control-bar-title {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 24px;
  text-align: left;
}

.sos-control-bar-subtitle {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 18px;
  text-align: left;
  margin-bottom: 3vh;
}

.sos-control-bar-button {
  width: 80%;
  margin: 1vh 0;
}
</style>


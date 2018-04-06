<template>
  <div class="com">
    <top-bar></top-bar>
    <div id="com-control-bar">
      <div class="com-control-bar-title">Building: {{ buildingName }}</div>
      <div class="com-control-bar-subtitle">{{ displayInfo }}</div>
      <el-button
        class="com-button"
        @click="onClickAddButton"
      >
        Add
      </el-button>
      <el-button
        class="com-button"
        @click="onClickSave"
      >
        Save
      </el-button>
    </div>

    <div
      class="com-table-container"
      v-loading="isLoading"
    >
      <v-table
        is-horizontal-resize
        style="width:100%"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :columns="comColumns"
        :table-data="comTableData"
        :show-vertical-border="false"
        :cell-edit-done="cellEditDone"
      />

      <el-pagination
        id="com-pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        :total="dataStorage.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'com',
  data () {
    return {
      buildingId: null,
      buildingName: null,
      isLoading: false,
      displayInfo: null,
      comColumns: [
        {
          field: 'time',
          title: 'Command Time',
          width: 160,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true
        }, {
          field: 'type',
          title: 'Type',
          width: 60,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'parameterVar1',
          title: 'Parameter 1',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'parameterVar2',
          title: 'Parameter 2',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'actionTime',
          title: 'Action Time',
          width: 160,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'status',
          title: 'Status',
          width: 80,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }
      ],
      currentPage: 1,
      pageSize: 20,
      dataStorage: [],
      comTableData: [],
      newCommands: []
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    onClickExport () {},

    // page
    handleCurrentChange (val) {
      this.getDataOfPage(val)
    },

    // callback
    cellEditDone (newValue, oldValue, rowIndex, rowData, field) {
      this.comTableData[rowIndex][field] = newValue
    },

    getDataOfPage (pageNumber) {
      let startFrom = (pageNumber - 1) * this.pageSize
      let itemNumber = this.dataStorage.length - startFrom
      itemNumber = itemNumber < this.pageSize ? itemNumber : this.pageSize
      this.comTableData = []
      for (let i = startFrom; i < startFrom + itemNumber; ++i) {
        this.comTableData.push(this.dataStorage[i])
      }
    },

    async getHistoryCommand () {
      let request = {
        auth: this.$store.state.authInfo,
        params: {
          buildingId: this.buildingId
        }
      }
      this.isLoading = true
      try {
        let res = await this.$http.get('/command', request)
        this.dataStorage = res.data.res
        this.getDataOfPage(1)
      } catch (err) {
        console.error(err)
      }
      this.isLoading = false
    },

    onClickAddButton () {
      let id = this.buildingId
      let curDate = new Date()
      let formatedDate = `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()}`
      let formatedTime = `${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}`
      this.dataStorage.push({
        buildingId: id,
        time: `${formatedDate} ${formatedTime}`,
        type: '',
        parameterVar1: '',
        parameterVar2: '',
        actionTime: '',
        status: ''
      })
      this.currentPage = Math.floor(this.dataStorage.length / this.pageSize) + 1
      this.getDataOfPage(this.currentPage)
      this.newCommands.push(this.dataStorage[this.dataStorage.length - 1])
    },

    async onClickSave () {
      this.isLoading = true
      for (let i = 0; i < this.newCommands.length; ++i) {
        try {
          let request = this.newCommands[i]
          let res = await this.$http.post('/command', request, { auth: this.$store.state.authInfo })
          this.newCommands[i] = null
          if (res.data.status !== 'success') {
            throw res.data.status
          }
        } catch (err) {
          console.log(err)
        }
      }
      this.$notify({
        title: 'Success',
        message: 'COM Data Saved'
      })
      this.newCommands = []
      this.currentPage = Math.floor(this.dataStorage.length / this.pageSize) + 1
      this.isLoading = false
    }
  },
  created () {
    this.buildingName = this.$route.query.name
    this.buildingId = this.$route.query.id

    this.getHistoryCommand()
  }
}
</script>

<style scoped>
#com-control-bar {
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

.com-table-container {
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

.com-control-bar-title {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 24px;
  text-align: left;
}

.com-control-bar-subtitle {
  margin-left: 10px;
  margin-top: 5px;
  font-size: 18px;
  text-align: left;
  margin-bottom: 3vh;
}

.com-button {
  margin: 1vh 0;
  width: 80%;
}

#com-pagination {
  margin-top: 30px;
}
</style>


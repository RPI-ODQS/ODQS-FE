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
      >
        Save
      </el-button>
    </div>

    <div class="com-table-container">
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
      displayInfo: null,
      comColumns: [
        {
          field: 'commandTime',
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
          field: 'parameter1',
          title: 'Parameter 1',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
          isEdit: true,
          isResize: true
        }, {
          field: 'parameter2',
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
      comTableData: [
        {
          commandTime: '01/01/2018  14:00:00',
          type: '1',
          parameter1: '0.5',
          parameter2: '0.6',
          actionTime: '01/01/2018  10:00:30',
          status: '1'
        }
      ]
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    onClickExport () {},

    // callback
    cellEditDone (newValue, oldValue, rowIndex, rowData, field) {
      this.comTableData[rowIndex][field] = newValue
    },

    async getHistoryCommand () {
      let request = {
        auth: this.$store.state.authInfo,
        param: {
          buildingId: this.buildingId
        }
      }
      try {
        let res = await this.$http.get('/command', request)
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    },

    onClickAddButton () {
      let curDate = new Date()
      let formatedDate = `${curDate.getMonth() + 1}/${curDate.getDate()}/${curDate.getFullYear()} `
      let formatedTime = `${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}`
      this.comTableData.push({
        commandTime: formatedDate + formatedTime,
        type: '',
        parameter1: '',
        parameter2: '',
        actionTime: '',
        status: ''
      })
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
</style>


<template>
  <div class="home">
    <top-bar/>
    <div id="choose-building-container">
      <div id="choose-building-title">Please Choose a Building:</div>
      <div id="table-container">
        <el-table
          :data="buildingList"
          highlight-current-row
          @current-change="handleBuildingSelect"
          v-loading="isLoadingBuildings"
        >
          <el-table-column
            prop="id"
            label="Building Id"
            width="120"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="name"
            label="Building Name"
            align="center"
            header-align="center"
          />
        </el-table>
      </div>
    </div>
    <div id="choose-table-container">
      <div id="choose-table-title">Please Choose a Data Table:</div>
      <el-button
        class="choose-table-button"
        @click="onClickMscopi('Mechanical System Configurations')"
      >
        MSC
      </el-button>
      <el-button
        class="choose-table-button"
        @click="onClickMscopi('Optimizing Input Parameters', currentRow)"
      >
        OPI
      </el-button>
      <el-button
        class="choose-table-button"
        @click="onClickSos"
      >
        SOS
      </el-button>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'home',
  data () {
    return {
      currentRow: null,
      isLoadingBuildings: false
    }
  },
  computed: {
    buildingList () {
      return this.$store.state.buildingList
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    handleBuildingSelect (val) {
      this.currentRow = val
    },
    onClickMscopi (type) {
      if (this.currentRow === null) {
        // TODD: Error
        this.$notify({
          title: 'Debug Message',
          message: 'Please Choose a Building First'
        })
      } else {
        this.$router.push(`/mscopi?type=${type}&id=${this.currentRow.id}&name=${this.currentRow.name}`)
      }
    },
    onClickSos () {
      if (this.currentRow === null) {
        // TODD: Error
        this.$notify({
          title: 'Debug Message',
          message: 'Please Choose a Building First'
        })
      } else {
        this.$router.push(`/sos?buildingId=${this.currentRow.id}&building=${this.currentRow.name}`)
      }
    }
  },
  created: function () {
    this.isLoadingBuildings = true
    this.$http.get('/buildings', {
      auth: {
        username: this.$store.state.userInfo.token,
        password: 'unused'
      }
    })
    .then(res => {
      this.$store.commit('updateBuildingList', res.data.buildings)
      this.isLoadingBuildings = false
    })
    .catch(err => {
      console.log(err)
      this.isLoadingBuildings = false
    })

    // this.$http.get('/sos/csv', {
    //   auth: {
    //     username: this.$store.state.userInfo.token,
    //     password: 'unused'
    //   },
    //   params: {
    //     buildingId: 1,
    //     sensorsIds: {
    //       temperature: ['Temperature 1'],
    //       flow: [],
    //       pressure: [],
    //       current: []
    //     },
    //     timeFrom: '2017-10-10 1',
    //     timeTo: '2017-10-11 11'
    //   }
    // })
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#choose-building-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 70vw;
  height: calc(97vh - 80px);
  background-color: white;
}

#table-container {
  width: 70vw;
  height: calc(97vh - 120px);
  overflow: scroll;
}

#choose-building-title, #choose-table-title {
  margin-left: 15px;
  font-size: 24px;
  text-align: left;
  margin-bottom: 3vh;
}

#choose-table-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 23vw;
  height: calc(97vh - 80px);
  background-color: white;
}

.choose-table-button {
  width: 80%;
  margin-top: 2vh;
  margin-left: 0;
}
</style>


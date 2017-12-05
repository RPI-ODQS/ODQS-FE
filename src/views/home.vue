<template>
  <div class="home">
    <top-bar></top-bar>
    <div id="choose-building-container">
      <div id="choose-building-title">Please Choose a Building:</div>
      <div id="table-container">
        <el-table
          :data="buildingList"
          highlight-current-row
          @current-change="handleBuildingSelect">
          <el-table-column
            type="index"
            width="50"
            align="center"
            header-align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Building Name"
            align="center"
            header-align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div id="choose-table-container">
      <div id="choose-table-title">Please Choose a Data Table:</div>
      <div class="chooose-table-button-container">
        <img class="img-button"
          src="../assets/icons/config.png"
          @click="onClickMscopi('Mechanical Mystem Configurations')" />
        <span class="img-button-hint">MSC</span>
      </div>
      <div class="chooose-table-button-container">
        <img class="img-button"
          src="../assets/icons/parameters.png"
          @click="onClickMscopi('Optimizing Input Parameters', currentRow)" />
        <span class="img-button-hint">OPI</span>
      </div>
      <div class="chooose-table-button-container">
        <img class="img-button"
          src="../assets/icons/status.png"
          @click="onClickSos" />
        <span class="img-button-hint">SOS</span>
      </div>
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
      buildingList: [
        {
          name: 'B1'
        }, {
          name: 'B2'
        }, {
          name: 'B3'
        }, {
          name: 'B4'
        }, {
          name: 'B5'
        }, {
          name: 'B6'
        }, {
          name: 'B7'
        }, {
          name: 'B8'
        }, {
          name: 'B9'
        }, {
          name: 'B10'
        }, {
          name: 'B11'
        }, {
          name: 'B12'
        }
      ]
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
        this.$router.push(`/mscopi?type=${type}&building=${this.currentRow.name}`)
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
        this.$router.push(`/sos?building=${this.currentRow.name}`)
      }
    }
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
  width: 42vw;
  height: calc(97vh - 80px);
  background-color: white;
}

#table-container {
  width: 42vw;
  height: calc(97vh - 120px);
  overflow: scroll;
}

#choose-building-title, #choose-table-title {
  margin-left: 15px;
  font-size: 24px;
  text-align: left;
}

#choose-table-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 51vw;
  height: calc(97vh - 80px);
  background-color: white;
}

.img-button {
  padding: 2vw;
  height: 7vw;
  width: 7vw;
  border-radius: 20px;
  background-color: whitesmoke;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.img-button:hover {
  background-color: white;
}

.chooose-table-button-container {
  margin: 20vh 2vw;
  height: 13vw;
  width: 13vw;
  float: left;
}
</style>


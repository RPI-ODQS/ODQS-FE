<template>
  <div class="management">
    <top-bar></top-bar>
    <div id="management-user-data-container">
      <div class="management-title">Choose a User:</div>
      <el-button class="management-button">Add User</el-button>
      <el-button class="management-button">Delete</el-button>
      <div class="management-table-container">
        <el-table :data="dataTable"
            highlight-current-row
            @current-change="handleDataRowSelect">
          <el-table-column type="selection" width="50" header-align="center" />
          <el-table-column
            prop="userId" label="User ID" width="70" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="userName" label="User Name" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="userLevel" label="User Level" align="center" header-align="center">
          </el-table-column>
          <el-table-column label="Operation" width="100" header-align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="editRow(scope.$index, dataTable)"
                type="text" size="small">
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div id="management-user-accessible-buildings-container">
      <div class="management-title">Accessible Buildings:</div>
      <el-button class="management-button">Add Building</el-button>
      <el-button class="management-button">Delete</el-button>
      <div class="management-table-container">
        <el-table :data="accessibleBuildings">
          <el-table-column type="selection" width="50" header-align="center" />
          <el-table-column
            prop="buildingId" label="User ID" width="70" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="buildingName" label="User Name" align="center" header-align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'management',
  data () {
    return {
      type: 'User Management Data',
      currentUser: '',
      dataTable: [
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        },
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        },
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        },
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        },
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        },
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        },
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        },
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        },
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        }
      ],
      accessibleBuildings: [
        { buildingId: 1, buildingName: 'B1' }
      ]
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    handleDataRowSelect (val) {
      this.currentUser = val
    },
    editRow (index, table) {

    }
  }
}
</script>

<style scoped>
.management-title {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 24px;
  text-align: left;
  margin-bottom: 1vh;
}

.management-button {
  float: left;
  margin: 0 1vw 2vh 1vw;
}

#management-user-data-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 53vw;
  height: calc(96vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#management-user-accessible-buildings-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 40vw;
  height: calc(96vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.management-table-container {
  width: 100%;
  height: calc(96vh - 200px);
  overflow: scroll;
}
</style>

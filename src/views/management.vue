<template>
  <div class="management">
    <top-bar/>
    <div id="management-user-data-container">
      <div class="management-title">Choose a User:</div>
      <el-button
        class="management-button"
      >
        Add User
      </el-button>
      <el-button
        class="management-button"
      >
        Delete
      </el-button>
      <div class="management-table-container">
        <el-table
          :data="userList"
          highlight-current-row
          @current-change="handleDataRowSelect"
        >
          <el-table-column
            type="selection"
            width="50"
            header-align="center"
          />
          <el-table-column
            prop="userId"
            label="User ID"
            width="70"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="userName"
            label="User Name"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="userLevel"
            label="User Level"
            align="center"
            header-align="center"
          />
          <el-table-column
            label="Operation"
            width="100"
            header-align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="editUser(scope.$index)"
                type="text"
                size="small"
              >
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div id="management-user-accessible-buildings-container">
      <div class="management-title">Accessible Buildings:</div>
      <el-button
        class="management-button"
        @click="addBuilding"
      >
        Add Building
      </el-button>
      <el-button
        class="management-button"
      >
        Delete
      </el-button>
      <div class="management-table-container">
        <el-table :data="accessibleBuildings">
          <el-table-column
            type="selection"
            width="50"
            header-align="center"
          />
          <el-table-column
            prop="buildingId"
            label="Building ID"
            width="100"
            align="center"
            header-align="center"
          />
          <el-table-column
            prop="buildingName"
            label="Building Name"
            align="center"
            header-align="center"
          />
        </el-table>
      </div>
    </div>

    <!-- Dialog: edit user info -->
    <el-dialog
      :title="editUserTitle"
      :visible.sync="isEditUserDialogVisable"
    >
      <el-form
        class="editUserInfoDialogForm"
        :model="userInfoForm"
        label-width="110px"
      >
        <el-form-item label="Name">
          <el-input
            v-model="userInfoForm.username"
          />
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            type="password"
            v-model="userInfoForm.password"
          />
        </el-form-item>
        <el-form-item label="Level">
          <el-radio-group v-model="userInfoForm.level">
            <el-radio :label="1">Super Admin</el-radio>
            <el-radio :label="2">Admin</el-radio>
            <el-radio :label="3">User</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          @click="isEditUserDialogVisable = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="isEditUserDialogVisable = false"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <!-- Dialog: edit building -->
    <el-dialog
      :title="editBuildingTitle"
      :visible.sync="isEditBuildingDialogVisable"
    >
      <el-table
        :data="buildingInfoTable"
      >
        <el-table-column
            type="selection"
            width="50"
            header-align="center"
        />
        <el-table-column
          prop="id"
          label="ID"
          width="180"
          header-align="center"
        />
        <el-table-column
          prop="name"
          label="Name"
          header-align="center"
        />
      </el-table>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          @click="isEditBuildingDialogVisable = false"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="isEditBuildingDialogVisable = false"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'management',
  data () {
    return {
      type: 'User Management Data',
      currentUser: null,
      userList: [
        {
          userId: 1,
          userName: 'hhk',
          userLevel: 'User'
        }, {
          userId: 2,
          userName: 'zmy',
          userLevel: 'User'
        }, {
          userId: 3,
          userName: 'crh',
          userLevel: 'User'
        }, {
          userId: 4,
          userName: 'zzq',
          userLevel: 'User'
        }, {
          userId: 5,
          userName: 'wyz',
          userLevel: 'User'
        }, {
          userId: 6,
          userName: 'lys',
          userLevel: 'User'
        }, {
          userId: 7,
          userName: 'www',
          userLevel: 'User'
        }
      ],
      accessibleBuildings: [
        { buildingId: 1, buildingName: 'B1' }
      ],

      isEditUserDialogVisable: false,
      editUserTitle: null,
      userInfoForm: {
        username: null,
        password: null,
        level: null
      },

      isEditBuildingDialogVisable: false,
      editBuildingTitle: null,
      buildingInfoTable: [
        { id: 1, name: 'B1' }
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
    editUser (index) {
      const levelMap = {
        'Super Admin': 1,
        'Admin': 2,
        'User': 3
      }
      this.editUserTitle = 'Editing User: ' + this.userList[index].userName
      this.userInfoForm.username = this.userList[index].userName
      this.userInfoForm.password = '********'
      this.userInfoForm.level = levelMap[this.userList[index].userLevel]
      this.isEditUserDialogVisable = true
    },
    addBuilding () {
      if (this.currentUser === null) {
        this.$notify({
          title: 'Warning',
          message: 'Please Choose a User First'
        })
      } else {
        this.editBuildingTitle = 'Add Building for ' + this.currentUser.userName
        this.isEditBuildingDialogVisable = true
      }
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
  height: calc(97vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#management-user-accessible-buildings-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 40vw;
  height: calc(97vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.management-table-container {
  width: 100%;
  height: calc(97vh - 200px);
  overflow: scroll;
}

.editUserInfoDialogForm {
  text-align: left;
}
</style>

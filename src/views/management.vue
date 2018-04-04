<template>
  <div class="management">
    <top-bar/>
    <div id="management-user-data-container">
      <div class="management-title">Choose a User:</div>
      <el-button
        class="management-button"
        v-for="(item, index) in ['Add User', 'Delete']"
        :key="index"
        @click="onClick(item)"
      >
        {{ item }}
      </el-button>
      <div class="management-table-container">
        <el-table
          :data="userList"
          highlight-current-row
          @current-change="handleUserRowSelect"
          @selection-change="handleUserSelectionChange"
          v-loading="isLoadingUsers"
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
            prop="role"
            label="User role"
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
                @click="onClickEditUser(scope.$index)"
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
        @click="onClickAddBuilding"
      >
        Add Building
      </el-button>
      <el-button
        class="management-button"
        @click="onClickDeleteBuilding"
      >
        Delete
      </el-button>
      <div class="management-table-container">
        <el-table
          :data="accessibleBuildings"
          @selection-change="handleBuildingSelectionChange"
          v-loading="isAccessibleBuildingsLoading"
        >
          <el-table-column
            type="selection"
            width="50"
            header-align="center"
          />
          <el-table-column
            prop="id"
            label="Building ID"
            width="100"
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
        <el-form-item label="role">
          <el-radio-group v-model="userInfoForm.role">
            <el-radio
              v-for="(item, index) in ['Super Admin', 'Admin', 'User']"
              :key="index"
              :label="index + 1"
            >
              {{ item }}
            </el-radio>
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
          @click="onClickConfirmEditUserDialog"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <!-- Dialog: edit building -->
    <el-dialog
      :title="editBuildingTitle"
      :visible.sync="isEditBuildingDialogVisable"
      v-loading="isDialogLoading"
    >
      <el-table
        :data="buildingInfoTable"
        @selection-change="handleAddBuildingSelectionChange"
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
          @click="onClickAddBuildingConfirm"
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
      isLoadingUsers: false,
      currentUser: null,
      currentSelectedUsers: [],
      currentSelectedBuildings: [],
      currentSelectedAddBuildings: [],
      userList: [],
      accessibleBuildings: [
        // {
        //   id: 1,
        //   name: 'B1'
        // }
      ],

      isEditUserDialogVisable: false,
      editUserTitle: null,
      userInfoForm: {
        username: null,
        password: null,
        role: null,
        buildingList: []
      },

      isEditBuildingDialogVisable: false,
      editBuildingTitle: null,
      buildingInfoTable: [],

      isDialogLoading: false,
      isAccessibleBuildingsLoading: false
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    onClick (type) {
      let switchObj = {
        'Add User': () => { this.onClickAddUser() },
        'Delete': () => { this.onClickDeleteUser() }
      }
      switchObj[type]()
    },
    // User
    handleUserRowSelect (val) {
      this.currentUser = val
      this.refreshUserBuildingList()
    },
    handleUserSelectionChange (val) {
      this.currentSelectedUsers = val
    },
    onClickAddUser () {
      this.editUserTitle = 'Add User'
      this.isEditUserDialogVisable = true
    },
    onClickEditUser (index) {
      this.editUserTitle = 'Edit User: ' + this.userList[index].userName
      this.userInfoForm.username = this.userList[index].userName
      this.userInfoForm.password = '********'
      this.userInfoForm.role = this.userList[index].role
      this.userInfoForm.userId = this.userList[index].userId
      this.userInfoForm.buildingList = this.userList[index].buildingList
      this.isEditUserDialogVisable = true
    },
    onClickConfirmEditUserDialog () {
      // filter invalid input
      if (this.editUserTitle === 'Add User') {
        this.$http.put('/user', {
          username: this.userInfoForm.username,
          password: this.userInfoForm.password,
          role: this.userInfoForm.role,
          buildingList: []
        }, {
          auth: this.$store.state.authInfo
        })
        .then((res) => {
          this.$notify({
            title: 'Success',
            message: 'Add User'
          })
          this.getAllUsers()
          this.isEditUserDialogVisable = false
        })
      } else {
        // edit user
        console.log(this.userInfoForm)
        this.$http.post('/update/user', {
          userId: this.userInfoForm.userId,
          newUsername: this.userInfoForm.username,
          newPassword: this.userInfoForm.password === '********' ? '' : this.userInfoForm.password,
          role: this.userInfoForm.role,
          newBuildingList: this.userInfoForm.buildingList
        }, {
          auth: this.$store.state.authInfo
        })
        .then(res => {
          console.log(res)
          this.$notify({
            title: 'Success',
            message: 'Edit User'
          })
          this.getAllUsers()
          this.isEditUserDialogVisable = false
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    onClickDeleteUser () {
      if (this.currentSelectedUsers.length > 0) {
        this.$http.delete('/user', {
          auth: this.$store.state.authInfo,
          params: {
            userId: this.currentSelectedUsers[0].userId
          }
        })
        .then(res => {
          console.log(res)
          this.$notify({
            title: 'Success',
            message: 'Delete User'
          })
          this.getAllUsers()
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    async getAllUsers () {
      this.isLoadingUsers = true
      try {
        let res = await this.$http.get('/user', {
          auth: this.$store.state.authInfo,
          params: { conditions: '' }
        })
        this.userList = res.data.users
        this.isLoadingUsers = false
        console.log(this.userList)
        return Promise.resolve()
      } catch (err) {
        this.isLoadingUsers = false
        return Promise.reject(err)
      }
    },

    async getUsersBuildings () {
      try {
        let res = await this.$http.get('/user', {
          auth: this.$store.state.authInfo,
          params: { conditions: '' }
        })
        for (let user of res.data.users) {
          if (user.userId === this.currentUser.userId) {
            this.currentUser.buildingList = user.buildingList
          }
        }
        console.log(this.currentUser.buildingList)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },

    // Building
    refreshUserBuildingList () {
      // console.log(this.currentUser.buildingList)
      this.accessibleBuildings = this.currentUser.buildingList
    },
    handleBuildingSelectionChange (val) {
      this.currentSelectedBuildings = val
    },
    handleAddBuildingSelectionChange (val) {
      this.currentSelectedAddBuildings = val
    },
    onClickAddBuilding () {
      if (this.currentUser === null) {
        this.$notify({
          title: 'Warning',
          message: 'Please Choose a User'
        })
      } else {
        this.editBuildingTitle = `Add Building for ${this.currentUser.userName}`
        this.isEditBuildingDialogVisable = true
      }
    },
    async onClickAddBuildingConfirm () {
      let newBuildingList = new Set()
      for (let item of this.currentUser.buildingList) {
        newBuildingList.add(Number(item.id))
      }
      for (let item of this.currentSelectedAddBuildings) {
        newBuildingList.add(Number(item.id))
      }
      console.log([...newBuildingList])
      let updateUserReqBody = {
        userId: this.currentUser.userId,
        newUsername: this.currentUser.userName,
        newPassword: '',
        role: this.currentUser.role,
        newBuildingList: [...newBuildingList]
      }
      try {
        this.isDialogLoading = true
        await this.$http.post('/update/user',
                              updateUserReqBody,
                              { auth: this.$store.state.authInfo })
        await this.getUsersBuildings()
        this.refreshUserBuildingList()
        this.isDialogLoading = false
        this.isEditBuildingDialogVisable = false
        this.$notify({
          title: 'Success',
          message: 'Edit User Buiilding'
        })
      } catch (err) {
        console.log(err)
        this.isEditBuildingDialogVisable = false
      }
    },
    async onClickDeleteBuilding () {
      if (!this.currentUser) {
        return
      }
      let newBuildingList = new Set()
      for (let item of this.currentUser.buildingList) {
        newBuildingList.add(Number(item.id))
      }
      for (let item of this.currentSelectedBuildings) {
        newBuildingList.delete(Number(item.id))
      }
      let updateUserReqBody = {
        userId: this.currentUser.userId,
        newUsername: this.currentUser.userName,
        newPassword: '',
        role: this.currentUser.role,
        newBuildingList: [...newBuildingList]
      }
      try {
        this.isAccessibleBuildingsLoading = true
        await this.$http.post('/update/user',
                              updateUserReqBody,
                              { auth: this.$store.state.authInfo })
        await this.getUsersBuildings()
        this.refreshUserBuildingList()
        this.isAccessibleBuildingsLoading = false
        this.$notify({
          title: 'Success',
          message: 'Delete User Buiilding'
        })
      } catch (err) {
        console.log(err)
        this.isEditBuildingDialogVisable = false
      }
    },
    getIdFromSelectedList (selected) {
      let resultList = []
      for (let i = 0; i < selected.length; ++i) {
        resultList.push(selected[i].id)
      }
      return resultList
    }
  },
  created: function () {
    this.getAllUsers()
    this.buildingInfoTable = this.$store.state.buildingList
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
  width: 55vw;
  height: calc(99vh - 80px);
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

#management-user-accessible-buildings-container {
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1vh 1vw;
  float: left;
  width: 42vw;
  height: calc(99vh - 80px);
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

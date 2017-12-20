<template>
  <div id="topbar">
    <header>
      <img
        class="logo"
        src="../assets/logo.png"
        @click="onClickLogoOrTitle"
      >
      <span
        class="title"
        @click="onClickLogoOrTitle"
      >
        RPI Online System
      </span>
      <el-button
        class="topbar-button"
        type="text"
        @click="onClickLogout"
        v-if="isLogin"
      >
        Logout
      </el-button>
      <el-button
        class="user-management topbar-button"
        type="text"
        @click="onClickManagement"
        v-if="isAdmin && isLogin"
      >
        management
      </el-button>
      <span
        class="user-name"
        v-if="isLogin"
      >
        Welcome, {{ userName }}
      </span>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    isAdmin () {
      return this.$store.state.level === 1 || this.$store.state.level === 2
    },
    userName () {
      return this.$store.state.userInfo.userName
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    onClickLogoOrTitle () {
      this.$router.push('/')
    },
    onClickManagement () {
      this.$router.push('/management')
    },
    onClickLogout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
#topbar {
  text-align: left;
  background-color: white;
  height: 64px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
}

.logo {
  float: left;
  margin-top: 12px;
  margin-left: 4vw;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.title {
  float: left;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 500;
  line-height: 64px;
  cursor: pointer;
}

.user-name {
  float: right;
  margin-right: 2vw;
  font-size: 18px;
  font-weight: 200;
  line-height: 64px;
}

.topbar-button {
  float: right;
  margin-right: 3vw;
  margin-top: 10px;
  font-size: 18px;
}
</style>
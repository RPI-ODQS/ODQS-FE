<<template>
  <div id="login">
    <top-bar/>
    <div id="login-form-container">
      <h1 id="login-title">Welcome</h1>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
      >
        <div id="username-input">
          <el-form-item prop="usernameInput">
            <el-input
              v-model="loginForm.usernameInput"
              @keyup.enter.native="login('loginForm')"
              size="large"
              placeholder="请输入用户名"
            />
          </el-form-item>
        </div>
        <div id="password-input">
          <el-form-item prop="passwordInput">
            <el-input
              id="login-password-input"
              type="password"
              v-model="loginForm.passwordInput"
              @keyup.enter.native="login('loginForm')"
              size="large"
              placeholder="请输入密码"
            />
          </el-form-item>
        </div>
        <el-form-item>
          <div id="login-button">
            <el-button
              id="login-login-btn"
              type="primary"
              @click="login('loginForm')"
              v-loading.fullscreen.lock="isLoading"
            >
              登录
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'login',
  data () {
    return {
      isLoading: false,
      dialogVisible: false,
      //  login form & rules
      loginForm: {
        usernameInput: '',
        passwordInput: ''
      },
      loginRules: {
        usernameInput: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passwordInput: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    TopBar: topbar
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO: send data to server to login
          this.isLoading = true
          this.$http.get('/login', {
            auth: {
              username: this.loginForm.usernameInput,
              password: this.loginForm.passwordInput
            }
          })
          .then(res => {
            this.isLoading = false
            this.$store.commit('updateUserInfo', {
              userName: this.loginForm.usernameInput,
              token: res.data.token
            })
            this.$store.commit('updateIsLogin', true)
            this.$store.commit('updateLevel', res.data.role)
            this.$router.push('/')
            this.$notify({
              title: 'Success',
              message: 'Login Success'
            })
          })
          .catch(err => {
            console.log(err)
            this.isLoading = false
            this.$notify({
              title: 'Fail',
              message: 'Login Failed'
            })
          })
        } else {
          // data is invalid
          return false
        }
      })
    }
  },
  created () {
    // this.$http.get('/sos/csv', {})
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
}
</script>


<style scoped>
#login-title {
  font-size: 36px;
  font-weight: 200;
  color: #000000;
}

#login-form-container {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  padding: 20px;
  /* border-radius: 3px; */
  width: 60%;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}

#login-login-btn {
  border-style: none;
}

#login-register-btn {
  background-color: rgba(255, 255, 255, 0.3);
  border-style: none;
}

#login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

#username-input {
  width: 65%;
  margin-left: auto;
  margin-right: auto;
  /*margin-bottom: 20px;*/
  font-family:'Helvetica Neue';
}

#password-input {
  width: 65%;
  margin-left: auto;
  margin-right: auto;
  font-family:'Helvetica Neue';
}

#login-button {
  width: 55%;
  margin-left: auto;
  margin-right: auto;
}

.hint {
  color: #99A9BF;
  text-align: right;
  position: absolute;
  right: 20px;
}

#login-info-container {
  text-align: left;
  font-family: 'Helvetica Neue';
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  left: 20px;
  bottom: 20px;
}
</style>


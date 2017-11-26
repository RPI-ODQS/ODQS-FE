<<template>
  <div id="login">
    <top-bar></top-bar>
    <div id="login-form-container">
      <h1 id="login-title">Welcome</h1>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px">
        <div id="username-input">
          <el-form-item label="" prop="usernameInput">
            <el-input v-model="loginForm.usernameInput" @keyup.enter.native="login('loginForm')" size="large"
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
        </div>
        <div id="password-input">
          <el-form-item label="" prop="passwordInput">
            <el-input id="login-password-input" type="password" v-model="loginForm.passwordInput"
                      @keyup.enter.native="login('loginForm')" size="large" placeholder="请输入密码">
            </el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <div id="login-button">
            <el-button id="login-login-btn" type="primary" @click="login('loginForm')">登录</el-button>
            <el-button id="login-register-btn" @click="onRegister">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog title="新用户注册" :visible.syncdel="dialogVisible">
      <div id="register-dialog">
        <el-form :model="registerForm" :rules="registerRules" ref="register" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input class="register-input" v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input type="password" class="register-input" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <el-input type="password" class="register-input" v-model="registerForm.confirm"></el-input>
          </el-form-item>
        </el-form>
        <span class="hint">*注册的用户只具有浏览权限，如需录入请与管理员联系</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser('registerForm')">注 册</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import topbar from '../components/topbar'

export default {
  name: 'login',
  data () {
    return {
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
      },
      //  register form & rules
      registerForm: {
        userame: '',
        password: '',
        confirm: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'))
              } else {
                if (this.registerForm.confirm !== '') {
                  this.$refs.register.validateField('confirm')
                }
                callback()
              }
            },
            trigger: 'blur'
          },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        confirm: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
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
        } else {
          // data is invalid
          return false
        }
      })
    },
    onRegister () {
      this.dialogVisible = true
    },
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          // TODO: send data to server to register
        } else {
          return false
        }
      })
    }
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


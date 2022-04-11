<template>
  <div class="login_container">
    <el-header>
      <div>
        <img src="../assets/images/logo.png" alt="" />
        <span>DriveThru System</span>
      </div>
      <div>
        <el-button type="primary" @click="intropageButton"
          ><el-icon style="font-size: 20px">
            <Info-filled
              style="width: 2em; height: 2em; margin-right: 8px"
            /> </el-icon
          >Introduction Page</el-button
        >
      </div>
    </el-header>
    <div class="login_des">
      <h1>DriveThru</h1>
      <h2>A smart traffic solution for schools</h2>
      <br /><br />
      <span>DriveThru is a Smart drive through system using IoT</span>
    </div>
    <div class="login_box">
      <!-- avatar -->
      <div class="avatar_box">
        <img src="../assets/images/avatar.png" alt="" />
      </div>
      <!-- form -->
      <el-form :model="loginForm" class="login_form">
        <!-- username -->
        <el-form-item>
          <span>Username</span>
          <el-input
            v-model="loginForm.username"
            placeholder="Username"
          ></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item>
          <span>Password</span>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="password"
          ></el-input>
        </el-form-item>
        <!-- button -->
        <div class="buttons">
          <el-form-item>
            <el-button type="primary" @click="toLogin()">Login</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { InfoFilled } from '@element-plus/icons'

export default {
  components: {
    [InfoFilled.name]: InfoFilled
  },
  data () {
    var validateusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter username'))
      }
    }
    var validatepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter password'))
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateusername, trigger: 'blur' }],
        password: [{ validator: validatepassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    intropageButton () {
      this.$router.push('/intropage')
    },
    toLogin () {
      if (
        this.loginForm.username === 'admin' &&
        this.loginForm.password === 'admin'
      ) {
        const currentLogin = '1145147897'
        localStorage.setItem('activeLogin', JSON.stringify(currentLogin))
        this.$router.push('/home')
      }
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: azure;
  height: 100%;
}

.el-header {
  height: 8%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    > img {
      height: 50%;
      width: 30%;
    }
    > span {
      margin-left: 15px;
    }
  }
}

.login_des {
  position: absolute;
  left: 20%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.login_box {
  width: 400px;
  height: 300px;
  background-color: antiquewhite;
  border-radius: 3px;
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 100px;
    height: 100px;
    border: 1px solid antiquewhite;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
  }
}

.buttons {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>

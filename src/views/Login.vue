<template>
  <div class="login_container">
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
          <el-input v-model="loginForm.username" placeholder="Username"></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item>
          <span>Password</span>
          <el-input v-model="loginForm.password" type="password" placeholder="password"></el-input>
        </el-form-item>
        <!-- button -->
        <div class="buttons">
          <el-form-item>
            <el-button type="primary" @click="toLogin()">Login</el-button>
            <el-button type="" @click="toRegister()">Register</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validateusername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
    }
    var validatepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
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
    toLogin () {
      this.$router.push('/home')
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #39c5bb;
  height: 100%;
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

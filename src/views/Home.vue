<template>
  <el-container class="home_container">
    <!-- header -->
    <el-header>
      <div>
        <img src="../assets/images/logo.png" alt="" />
        <span>DriveThru System</span>
      </div>
      <div class="menu_box">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          @select="handleSelect"
          style="width:700px"
        >
          <el-menu-item index="/dashboard">Dashboard</el-menu-item>
          <el-menu-item index="/dataanalysis">Data Analysis</el-menu-item>
          <el-menu-item index="/studentlist">Student Management</el-menu-item>
          <el-menu-item index="/systemanalysis" disabled
            >&nbsp;&nbsp;&nbsp;</el-menu-item
          >
          <el-menu-item index="/settings" disabled
            >&nbsp;&nbsp;&nbsp;</el-menu-item
          >
        </el-menu>
      </div>
      <el-button type="info" @click="dropdown_event_2"
        ><el-icon style="font-size: 20px">
          <user-filled
            style="width: 2em; height: 2em; margin-right: 8px"
          /> </el-icon
        >Log Out</el-button
      >
      <template>
        <el-dropdown>
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled></el-dropdown-item>
              <el-dropdown-item divided @click="dropdown_event_2"
                >Log Out</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-header>
    <!-- main -->
    <el-container>
      <!-- aside <el-aside width="200px">Aside</el-aside>-->
      <el-container>
        <!-- conent -->
        <el-main>
          <!-- router placeholder -->
          <router-view @getIndex="getIndex"></router-view
        ></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { UserFilled } from '@element-plus/icons'

export default {
  components: {
    [UserFilled.name]: UserFilled
  },
  data () {
    return {
      activeIndex: '/dashboard',
      key: '',
      circleUrl: ''
    }
  },
  created () {
    // 在页面加载时读取localStorage里的状态信息
    const getActiveIndex = JSON.parse(localStorage.getItem('activeIndex'))
    if (getActiveIndex !== '') {
      this.activeIndex = getActiveIndex
      console.log(this.activeIndex)
    }
    // 在页面刷新时将vuex里的信息保存到localStorage里
  },
  methods: {
    handleSelect (key, keyPath) {
      this.key = key
      console.log(key, keyPath)
    },
    getIndex (value) {
      this.activeIndex = value
    },
    dropdown_event_1 () {
      this.$router.push('/settings')
    },
    dropdown_event_2 () {
      this.$router.push('/intropage')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
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

  .menu_box {
    align-items: center;
  }
}

.el-aside {
  background-color: #25a78a;
}

.el-main {
  width: 100%;
  height: 100%;
  background-color: azure;
  position: fixed;
  display: flex;
}
</style>

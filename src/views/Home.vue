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
          @select="handleSelect"
        >
          <el-menu-item index="1">Dashboard</el-menu-item>
          <el-menu-item index="2">Data Recordes</el-menu-item>
          <el-sub-menu index="3">
            <template #title>Student Management</template>
            <el-menu-item index="3-1">View Infomation Table</el-menu-item>
            <el-menu-item index="3-2">Add Student Infomation</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="4">Settings</el-menu-item>
        </el-menu>
      </div>
      <el-button type="info" @click="logout">Log Out</el-button>
    </el-header>
    <!-- main -->
    <el-container>
      <!-- aside <el-aside width="200px">Aside</el-aside>-->
      <el-container>
        <!-- conent -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
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

  .menu_box {
    align-items: center;
  }
}

.el-aside {
  background-color: #25a78a;
}

.el-main {
  background-color: antiquewhite;
}
</style>

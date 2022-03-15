<template>
  <el-container class="home_container">
    <!-- header -->
    <el-header>
      <div>
        <img src="../assets/images/logo.png" alt="" />
        <span>DriveThru System</span>
      </div>
      <div>
        <el-button type="primary" @click="loginButton"
          ><el-icon style="font-size: 20px">
            <user-filled
              style="width: 2em; height: 2em; margin-right: 8px"
            /> </el-icon
          >Log In</el-button
        >
      </div>
    </el-header>
    <el-container>
      <el-main>
        <div class="page_container">
          <div class="carousel_container">
            <el-carousel
              indicator-position="outside"
              height="350px"
              :interval="5000"
            >
              <el-carousel-item v-for="item in carouselList" :key="item">
                <el-image :src="item.imgUrl" class="carousel_image">
                  <template #placeholder>
                    <div class="image-slot">
                      Loading <span class="dot">...</span>
                    </div>
                  </template>
                </el-image>
                <h3>{{ item.words }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="intro_container">
            <h1>Introduction</h1>
            <br />
            <h2>{{ intro_h2 }}</h2>
            <br />
            <h3>{{ intro_h3 }}</h3>
          </div>
          <div class="content_container">content</div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { UserFilled } from '@element-plus/icons'

export default {
  components: {
    // 全名
    [UserFilled.name]: UserFilled
    // 或者以缩写的方式
  },
  data () {
    return {
      carouselList: [
        {
          id: 0,
          words: 'The test system',
          imgUrl:
            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
        },
        {
          id: 1,
          words: 'The main page',
          imgUrl:
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
        },
        {
          id: 2,
          words: 'Production introduction',
          imgUrl:
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
        }
      ],
      intro_h2: 'A smart traffic solution for schools',
      intro_h3: 'DriveThru is a Smart drive through system using IoT'
    }
  },
  methods: {
    loginButton () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  width: 100%;
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

.el-main {
  background-color: azure;
}

.page_container {
  width: 1500px;
  height: 100%;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.carousel_container {
  width: 90%;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.el-carousel__item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .carousel_image {
    width: 100%;
  }
  h3 {
    position: absolute;
    color: #fff;
    font-size: 20px;
    opacity: 0.9;
    padding-right: 70%;
    padding-top: 10%;
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.intro_container {
  width: 100%;
  height: 400px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  > h1 {
    font-size: 35px;
    opacity: 0.85;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > h2 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > h3 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.content_container {
  width: 90%;
  height: 400px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  background-color: #d3dce6;
}
</style>

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
                <div class="carousel_words">
                  <h2>{{ item.words_1 }}</h2>
                  <h4>{{ item.words_2 }}</h4>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="intro_container">
            <h1>Introduction</h1>
            <h2>{{ intro_h2 }}</h2>
            <p>{{ intro_p_1 }}</p>
            <br />
            <h3>{{ intro_h3 }}</h3>
            <p>{{ intro_p_2 }}</p>
            <p>{{ intro_p_3 }}</p>
          </div>
          <div class="content_container"></div>
        </div>
      </el-main>
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
      carouselList: [
        {
          id: 0,
          words_1: 'SMARTER',
          words_2: 'A Smart drive through system using IoT',
          imgUrl: 'https://nmsl.adamaxiao.workers.dev/001.jpg?raw'
        },
        {
          id: 1,
          words_1: 'SAFER',
          words_2: 'Dedicated waiting area for student safety',
          imgUrl: 'https://nmsl.adamaxiao.workers.dev/002.jpg?raw'
        },
        {
          id: 2,
          words_1: 'FASTER',
          words_2: 'Speeding up the pick-up process by announcement',
          imgUrl:
            'https://nmsl.adamaxiao.workers.dev/003.jpg?raw'
        }
      ],

      intro_h2: 'DriveThru is a smart Drive Through system using IoT',
      intro_p_1:
        'In order to speed up the speed of picking up students and optimizing the picking up process, the drive-through idea was used in the design of the project.',
      intro_h3: 'A smart traffic solution for schools',
      intro_p_2:
        "Without requiring parents to get off the car to pick up students, the car plate number together with the student's name will be announced through the speaker to inform students.",
      intro_p_3:
        'With image processing algorithm and text-to-speech technology, the system will automatically recognize the license plate and notify the waiting students in the background .'
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
}

.el-main {
  width: 100%;
  height: 100%;
  background-color: azure;
  position: fixed;
  display: flex;
}

.page_container {
  width: 100%;
  height: 100%;
}

.carousel_container {
  width: 100%;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.el-carousel__item {
  width: 100%;
  display: flex;
  align-items: center;
  .carousel_image {
    width: 100%;
    justify-content: center;
    filter: blur(0px);
  }
  .carousel_words {
    position: absolute;
    padding-left: 100px;
    padding-top: 100px;
    > h2 {
      color: cornsilk;
      font-size: 60px;
      font-weight: 200;
      line-height:5px;
      opacity: 0.9;
    }
    > h4 {
      color: cornsilk;
      font-size: 15px;
      opacity: 0.9;
    }
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.intro_container {
  width: 700px;
  height: 600px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  > h1 {
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > h2 {
    opacity: 0.85;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > h3 {
    opacity: 0.85;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > p {
    font-size: 20px;
    font-weight: 100;
    opacity: 0.7;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

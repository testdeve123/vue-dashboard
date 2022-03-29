<template>
  <div class="chart_container">
    <div class="chart_container_upper">
      <div class="statistics_container">
        <div class="statistics_palceholder"></div>
        <div class="statistics" id="">{{ numOfDetected }}</div>
        <div class="statistics_banner"><span>were detected on</span></div>
        <div class="statistics_date">{{ dateOfDetected }}{{}}</div>
      </div>
      <div class="percentage_chart_container">
        <div class="percentage_chart" id="percentage"></div>
        <div class="percentage_chart_date"></div>
      </div>
    </div>
    <div v-loading="loading" class="status_container">
      <div class="status_refresh">
        <el-icon class="status_refresh_icon">
          <refresh-right @click="handleRefreshStatus" />
        </el-icon>
      </div>
      <div class="status_card">
        <div class="system_status">
          <el-card class="system_status_box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>System Status</span>
              </div>
            </template>
            <div
              v-for="item in systemStatus_cardInfo"
              :key="item"
              class="text item"
            >
              {{ item }}
            </div>
          </el-card>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="general_status">
          <el-card class="general_status_box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>General Info</span>
              </div>
            </template>
            <div
              v-for="item in generalStatus_cardInfo"
              :key="item"
              class="text item"
            >
              {{ item }}
            </div>
          </el-card>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="service_status">
          <el-card class="service_status_box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>Service Info</span>
              </div>
            </template>
            <div
              v-for="item in serviceStatus_cardInfo"
              :key="item"
              class="text item"
            >
              {{ item }}
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RefreshRight } from '@element-plus/icons'
export default {
  components: {
    [RefreshRight.name]: RefreshRight
  },
  data () {
    return {
      numOfDetected: '169',
      dateOfDetected: '2022-2-24',
      loading: false,
      systemStatus_cardInfo: [
        'System Status: Stopped',
        'Detection Service Status:  Stopped',
        'Data Processing Service Status: Stopped'
      ],
      generalStatus_cardInfo: [
        'Network Status:  Connection not Established',
        'IP address: 0.0.0.0',
        'Mac address: BD:3D:45:ES:35'
      ],
      serviceStatus_cardInfo: [
        'Camera Running Time: 0D,0H',
        'Websit Running Time: 1D,5H'
      ]
    }
  },
  created () {
    const currentIndex = '/systemanalysis'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))
  },
  mounted () {
    this.cleanEChartsCache()
    this.percentageChart()
  },
  methods: {
    cleanEChartsCache () {
      document
        .getElementById('percentage')
        .removeAttribute('_echarts_instance_')
    },
    percentageChart () {
      var myChart = this.$echarts.getInstanceByDom(
        document.getElementById('percentage')
      )
      if (myChart == null) {
        myChart = this.$echarts.init(document.getElementById('percentage'))
      }
      var option = {
        title: {
          text: 'Proportion of all registered vehicles:',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: '45%',
          top: '25%'
        },
        series: [
          {
            name: 'Percentage of Car',
            type: 'pie',
            radius: '45%',
            center: ['30%', '60%'],
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 70, name: '70% Detected' },
              { value: 30, name: '30% Not Detected' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      myChart.setOption(option)
    },
    handleRefreshStatus () {
      this.loading = true
    }
  }
}
</script>

<style lang="less">
.chart_container {
  width: 1500px;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.chart_container_upper {
  width: 80%;
  height: 400px;
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
}

.statistics_container {
  width: 40%;
  height: 350px;
  background-color: aliceblue;
  .statistics_palceholder {
    padding-top: 60px;
  }
  .statistics {
    width: 200px;
    height: 100px;
    background-color: lightsteelblue;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 4px;
  }
  .statistics_banner {
    text-align: center;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 55%;
    .span {
      font-size: 16px;
      line-height: 20px;
    }
  }
}

.percentage_chart_container {
  width: 59%;
  height: 350px;
  background-color: aliceblue;
  .percentage_chart {
    width: 60%;
    height: 90%;
    position: relative;
    top: 50%;
    left: 35%;
    transform: translate(-50%, -50%);
  }
  .percentage_chart_date {
    background-color: aqua;
  }
}

.status_container {
  width: 80%;
  height: 400px;
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
  background-color: antiquewhite;
  .status_refresh {
    height: 30px;
    display: flex;
    align-items: center;

    .status_refresh_icon {
      font-size: 25px;
      padding-left: 10px;
      padding-top: 10px;
    }
  }
  .status_card {
    height: 370px;
    display: flex;
    align-items: center;
    justify-content: center;
    .system_status {
      width: 25%;
      padding-left: 5%;
      padding-right: 2%;
    }
    .general_status {
      width: 25%;
      padding-left: 2%;
      padding-right: 2%;
    }
    .service_status {
      width: 25%;
      padding-left: 2%;
      padding-right: 5%;
    }
  }
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
</style>

<template>
  <div class="chart_container">
    <div class="chart_container_upper">
      <div class="statistics_container">
        <div class="statistics_banner">
          <span>Average Confidence &nbsp;</span>
          <div class="statistics_date"></div>
          <span>&nbsp; is</span>
        </div>
        <div class="statistics" id="">{{ numOfDetected }}</div>
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
      <div class="status_title"><span>System Status</span></div>
      <div class="status_collapse">
        <div class="collapse_1">
          <el-collapse v-model="activeName_1" accordion class="collapse_text">
            <el-collapse-item title="Service Info" name="1">
            </el-collapse-item>
          </el-collapse>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="collapse_2">
          <el-collapse v-model="activeName_2" accordion class="collapse_text">
            <el-collapse-item :title="collapse_2_title_1" name="1">
              <div>IP Address: &nbsp;{{ statusInfo[0].detSerIP }}</div>
              <div>MAC Address: &nbsp;{{ statusInfo[0].detSerMAC }}</div>
            </el-collapse-item>
            <el-collapse-item :title="collapse_2_title_2" name="2">
              <div></div>
            </el-collapse-item>
          </el-collapse>
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
      serviceID: 2,
      numOfDetected: '0.58',
      dateOfDetected: '2022-2-24',
      loading: true,
      activeName_1: '1',
      activeName_2: '',
      detSerStatus: 'Stopped',
      daProStatus: 'Stopped',
      collapse_2_title_1: '',
      collapse_2_title_2: '',
      statusInfo: [
        {
          detSerStatus: '',
          daProStatus: '',
          detSerIP: '',
          detSerMAC: ''
        }
      ]
    }
  },
  created () {
    const currentIndex = '/systemanalysis'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))
    this.collapse_2_title_1 = 'Detection Service (' + this.detSerStatus + ')'
    this.collapse_2_title_2 =
      'Data Processing Service (' + this.daProStatus + ')'

    this.getSystemStatus()
  },
  mounted () {
    this.cleanEChartsCache()
    this.percentageChart()
  },
  methods: {
    async getSystemStatus () {
      const { data: res } = await this.$api.get('getSystemStatus', {
        params: {
          serviceID: this.serviceID
        }
      })
      console.log(res.list[0])
      if (res.list[0].isDetSerRunning === 1) {
        this.detSerStatus = 'Running'
      } else {
        this.detSerStatus = 'Stopped'
      }

      if (res.list[0].isDaProRunning === 1) {
        this.daProStatus = 'Running'
      } else {
        this.daProStatus = 'Stopped'
      }
      this.statusInfo = []
      const insertItem = {
        detSerStatus: res.list[0].isDetSerRunning,
        daProStatus: res.list[0].isDaProRunning,
        detSerIP: res.list[0].detSerIP,
        detSerMAC: res.list[0].detSerMAC
      }
      this.statusInfo.push(insertItem)
      this.collapse_2_title_1 = 'Detection Service (' + this.detSerStatus + ')'
      this.collapse_2_title_2 =
        'Data Processing Service (' + this.daProStatus + ')'
      console.log(this.statusInfo)
      this.loading = false
    },
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
      this.getSystemStatus()
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
  background-color: #fff;
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
  .status_title {
    height: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      font-size: 20px;
      line-height: 5px;
    }
  }
  .status_collapse {
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    .collapse_1 {
      width: 40%;
      margin-left: 5%;
      .collapse_text {
        .el-collapse-item__header {
          font-size: 18px;
        }
        .el-collapse-item__content {
          font-size: 15px;
        }
      }
    }
    .collapse_2 {
      width: 40%;
      margin-right: 5%;
      .collapse_text {
        .el-collapse-item__header {
          font-size: 18px;
        }
        .el-collapse-item__content {
          font-size: 15px;
        }
      }
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

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
        <div class="percentage_chart_date">
          <template>
            <el-select v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      numOfDetected: '100',
      dateOfDetected: '2022-2-24'
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
    }
  }
}
</script>

<style lang="less">
.chart_container {
  width: 1500px;
  height: 85%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.chart_container_upper {
  width: 80%;
  height: 400px;
  position: relative;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  display: flex;
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
</style>

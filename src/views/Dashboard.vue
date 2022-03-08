<template>
  <div class="chart_container">
    <div class="chart_container_upper">
      <div class="statistics_container">
        <div class="statistics_palceholder"></div>
        <div class="statistics" id=""></div>
        <div class="statistics_banner">were detected on</div>
        <div class="statistics_date">{{ weekday }}{{}}</div>
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

    <div class="numofCar_chart_container">
      <div class="numofCar_chart" id="numofCar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      options: [
        {
          value: '1',
          label: 'Today'
        },
        {
          value: '2',
          label: 'Yesterday'
        }
      ],
      value: '1',
      carInfoForm: {
        numofCarAft: [10, 20, 30, 50, 60, 10, 5],
        numofCarEve: [5, 10, 40, 20, 50, 0, 5],
        dateofAWeek: [
          '2022-02-21',
          '2022-02-22',
          '2022-02-23',
          '2022-02-24',
          '2022-02-25',
          '2022-02-26',
          '2022-02-27'
        ]
      },
      lineChartForm: {
        numofCarAft: [],
        numofCarEve: [],
        date: []
      },
      week: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      dialogVisible: false
    }
  },
  created () {
    const currentIndex = '/dashboard'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))

    this.getdata()
  },
  mounted () {
    this.cleanEChartsCache()
    this.percentageChart()
    this.numofCarChart()
  },
  methods: {
    getdata () {
      for (let i = 0; i < 7; i++) {
        this.lineChartForm.date[i] =
          this.week[i] + '\n\n' + '(' + this.carInfoForm.dateofAWeek[i] + ')'
        this.lineChartForm.numofCarAft[i] = this.carInfoForm.numofCarAft[i]
        this.lineChartForm.numofCarEve[i] = this.carInfoForm.numofCarEve[i]
      }
    },
    cleanEChartsCache () {
      // The dom element of echarts has an attribute: _echarts_instance_, same as id,
      // needs to be regenerated every refresh
      document
        .getElementById('percentage')
        .removeAttribute('_echarts_instance_')
      document.getElementById('numofCar').removeAttribute('_echarts_instance_')
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
          text: 'Proportion of all registered vehicles on:',
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
    numofCarChart () {
      var lineChartForm = this.lineChartForm
      // console.log(lineChartForm.date)
      var myChart = this.$echarts.getInstanceByDom(
        document.getElementById('numofCar')
      )
      if (myChart == null) {
        myChart = this.$echarts.init(document.getElementById('numofCar'))
      }
      // set the configuration and data of the chart
      var option = {
        title: {
          text: 'Number of Vehicle for last week'
        },
        tooltip: {},
        legend: {
          data: ['Afternoon Session', 'Evening Session']
        },
        xAxis: {
          data: lineChartForm.date
        },
        yAxis: {},
        series: [
          {
            name: 'Afternoon Session',
            type: 'line',
            stack: 'Total',
            data: lineChartForm.numofCarAft,
            itemstyle: {},
            label: {
              show: true,
              position: 'left',
              formatter: function (data) {
                return data.value
              }
            }
          },
          {
            name: 'Evening Session',
            type: 'line',
            data: lineChartForm.numofCarEve,
            itemstyle: {},
            label: {
              show: true,
              position: 'right',
              formatter: function (data) {
                return data.value
              }
            }
          }
        ]
      }
      // use the configuration and data to show chart
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
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
    font-size: 16px;
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

.numofCar_chart_container {
  width: 80%;
  height: 400px;
  background-color: aliceblue;
  position: relative;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  .numofCar_chart {
    width: 90%;
    height: 90%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

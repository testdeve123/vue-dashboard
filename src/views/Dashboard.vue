<template>
  <div class="chart_container">
    <div class="classAna_container">
      <div class="date_select_container">
        <span> {{ titleOfChart_1 }} &nbsp;</span>
        <span class="date_select"></span>
        <el-date-picker
          v-model="dateValue"
          type="date"
          placeholder="Date Select"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          @change="(value) => dateChangeHandler(value)"
        >
        </el-date-picker>
      </div>
      <div class="classAna_chart" id="classAna"></div>
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
      titleOfChart_1: "Number of Vehicle of each year's student on ",
      numberInfoForm: [
        { date: '2022-03-25', number: [10, 20, 30, 50, 10, 5] },
        { date: '2022-03-24', number: [15, 25, 30, 10, 5, 5] },
        { date: '2022-03-23', number: [30, 20, 10, 40, 10, 5] },
        { date: '2022-03-22', number: [20, 20, 30, 50, 5, 5] },
        { date: '2022-03-21', number: [50, 5, 30, 10, 10, 5] },
        { date: '2022-03-20', number: [5, 15, 10, 10, 0, 50] },
        { date: '2022-03-19', number: [35, 5, 10, 5, 20, 5] },
        { date: '2022-03-18', number: [25, 15, 5, 20, 10, 5] }
      ],
      barChartValue: [],
      year: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
      dateValue: '',
      disabledDate (time) {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: 'Yesterday',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          }
        },
        {
          text: 'A week ago',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          }
        }
      ],
      //
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

    this.getDate()
    this.getDataByDate()
    this.getdata()
  },
  mounted () {
    this.cleanEChartsCache()
    this.classAnaChart()
    this.numofCarChart()
  },
  methods: {
    getDate () {
      // get current date in YYYY-MM-DD format
      var data = new Date()
      var month =
        data.getMonth() < 9 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1
      var date = data.getDate() <= 9 ? '0' + data.getDate() : data.getDate()
      this.dateValue = data.getFullYear() + '-' + month + '-' + date
    },
    getDataByDate () {
      for (var i in this.numberInfoForm) {
        if (this.numberInfoForm[i].date === this.dateValue) {
          this.barChartValue = this.numberInfoForm[i].number
        }
      }
    },
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
      document.getElementById('classAna').removeAttribute('_echarts_instance_')
      document.getElementById('numofCar').removeAttribute('_echarts_instance_')
    },
    dyTrafficFlowChart () {
      var myChart = this.$echarts.getInstanceByDom(
        document.getElementById('dyTrFlow')
      )
      if (myChart == null) {
        myChart = this.$echarts.init(document.getElementById('classAna'))
      }
    },
    classAnaChart () {
      var myChart = this.$echarts.getInstanceByDom(
        document.getElementById('classAna')
      )
      if (myChart == null) {
        myChart = this.$echarts.init(document.getElementById('classAna'))
      }

      var option = {
        title: {},
        xAxis: {
          type: 'category',
          data: this.year
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.barChartValue,
            type: 'bar'
          }
        ]
      }

      myChart.setOption(option)
    },
    // get date from date picker
    dateChangeHandler (value) {
      console.log(value)
      this.dateValue = value
      this.getDataByDate()
      this.classAnaChart()
    },
    //
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
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.classAna_container {
  width: 50%;
  height: 350px;
  background-color: aliceblue;
  position: relative;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  .date_select_container {
    width: 100%;
    padding-top: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      font-size: 20px;
    }
  }
  .classAna_chart {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.numofCar_chart_container {
  width: 80%;
  height: 350px;
  background-color: aliceblue;
  position: relative;
  left: 50%;
  top: 30%;
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

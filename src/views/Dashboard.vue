<template>
  <div class="chart_container">
    <div class="chart_container_upper">
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
            style="width: 150px"
          >
          </el-date-picker>
        </div>
        <div class="classAna_chart" id="classAna"></div>
      </div>
    </div>
    <div class="numofCar_chart_container">
      <div class="week_select_container">
        <span> {{ titleOfChart_2 }} &nbsp;</span>
        <span class="week_select"></span>
        <el-select
          v-model="weekValue"
          placeholder=""
          @change="(value) => weekChangeHandler(value)"
        >
          <el-option
            v-for="item in weekOptions"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="numofCar_chart" id="numofCar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      titleOfChart_1: "Number of Vehicle detected of each year's student on ",
      titleOfChart_2: 'Number of Vehicle detected within a week during ',
      numberInfoForm: [
        { date: '2022-03-28', number: [15, 17, 12, 14, 16, 15] },
        { date: '2022-03-29', number: [14, 18, 13, 15, 11, 16] },
        { date: '2022-03-30', number: [17, 15, 14, 16, 10, 17] },
        { date: '2022-03-31', number: [18, 15, 10, 15, 12, 15] },
        { date: '2022-04-01', number: [11, 15, 15, 12, 10, 15] },
        { date: '2022-04-02', number: [16, 20, 10, 10, 15, 18] },
        { date: '2022-04-03', number: [17, 20, 10, 16, 15, 15] },
        { date: '2022-04-04', number: [15, 15, 12, 15, 10, 14] },
        { date: '2022-04-05', number: [15, 15, 13, 10, 10, 15] },
        { date: '2022-04-06', number: [15, 15, 15, 16, 10, 17] },
        { date: '2022-04-07', number: [13, 15, 10, 15, 12, 15] },
        { date: '2022-04-08', number: [15, 15, 15, 12, 10, 16] },
        { date: '2022-04-09', number: [13, 12, 10, 14, 11, 15] },
        { date: '2022-04-10', number: [12, 12, 13, 15, 15, 15] },
        { date: '2022-04-11', number: [15, 15, 13, 10, 10, 16] },
        { date: '2022-04-12', number: [15, 15, 10, 10, 10, 15] },
        { date: '2022-04-13', number: [15, 15, 10, 15, 12, 15] },
        { date: '2022-04-14', number: [12, 16, 15, 20, 11, 15] },
        { date: '2022-04-15', number: [10, 12, 13, 50, 10, 15] },
        { date: '2022-04-16', number: [15, 12, 13, 10, 15, 15] },
        { date: '2022-04-17', number: [13, 12, 10, 14, 10, 15] }
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
      weekValue: '',
      weekOptions: [],
      //
      carInfoForm: [
        {
          numofCarAft: [35, 30, 38, 27, 32, 0, 0],
          numofCarEve: [45, 50, 40, 46, 48, 0, 0],
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
        {
          numofCarAft: [34, 29, 30, 33, 30, 0, 0],
          numofCarEve: [50, 48, 46, 45, 47, 0, 0],
          dateofAWeek: [
            '2022-02-28',
            '2022-03-01',
            '2022-03-02',
            '2022-03-03',
            '2022-03-04',
            '2022-03-05',
            '2022-03-06'
          ]
        },
        {
          numofCarAft: [30, 29, 32, 33, 31, 0, 0],
          numofCarEve: [50, 49, 48, 47, 51, 0, 0],
          dateofAWeek: [
            '2022-03-07',
            '2022-03-08',
            '2022-03-09',
            '2022-03-10',
            '2022-03-11',
            '2022-03-12',
            '2022-03-13'
          ]
        }
      ],
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
    this.getWeek()
    this.getDataByDate()
    this.getDataByWeek()
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
    getWeek () {
      for (var i in this.carInfoForm) {
        const insertItem = {
          value: this.carInfoForm[i].dateofAWeek[0],
          label:
            this.carInfoForm[i].dateofAWeek[0] +
            ' - ' +
            this.carInfoForm[i].dateofAWeek[6]
        }
        this.weekOptions.push(insertItem)
      }
      var largest = Object.keys(this.carInfoForm).length - 1
      this.weekValue = this.carInfoForm[largest].dateofAWeek[0]
    },
    getDataByWeek () {
      for (var i in this.carInfoForm) {
        if (this.carInfoForm[i].dateofAWeek[0] === this.weekValue) {
          for (var j = 0; j < 7; j++) {
            this.lineChartForm.date[j] =
              this.week[j] +
              '\n\n' +
              '(' +
              this.carInfoForm[i].dateofAWeek[j] +
              ')'
            this.lineChartForm.numofCarAft[j] =
              this.carInfoForm[i].numofCarAft[j]
            this.lineChartForm.numofCarEve[j] =
              this.carInfoForm[i].numofCarEve[j]
          }
        }
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
    // get week from week selector
    weekChangeHandler (value) {
      console.log(value)
      this.weekValue = value
      this.getDataByWeek()
      this.numofCarChart()
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
        title: {},
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

.chart_container_upper {
  width: 80%;
  height: 400px;
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.classAna_container {
  width: 60%;
  height: 350px;
  position: relative;
  background-color: aliceblue;
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
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
  background-color: aliceblue;
  .week_select_container {
    width: 100%;
    padding-top: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      font-size: 20px;
    }
  }
  .numofCar_chart {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

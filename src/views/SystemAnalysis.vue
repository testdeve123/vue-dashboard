<template>
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
</template>

<script>
export default {
  data () {
    return {}
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
    }
  }
}
</script>

<style lang="less">
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

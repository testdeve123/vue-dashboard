<template>
  <div class="table_container">
    <div class="container_placeholder"></div>
    <div class="notification_container">
      <div class="notification_location">
        <div class="notification_location_upper">
          <el-icon style="font-size: 100px">
            <map-location style="width: 50px; height: 50px" />
          </el-icon>
          <div class="notification_location_data">
            <i> {{ location }}</i>
            <h4>System Location</h4>
          </div>
        </div>
      </div>
      <div class="notification_position">
        <div class="notification_position_upper">
          <el-icon style="font-size: 100px">
            <school style="width: 50px; height: 50px" />
          </el-icon>
          <div class="notification_position_data">
            <i> {{ position }}</i>
            <h4>Camera Position</h4>
          </div>
        </div>
      </div>
      <div class="notification_detection">
        <div class="notification_detection_upper">
          <el-icon style="font-size: 100px">
            <camera style="width: 50px; height: 50px" />
          </el-icon>
          <div class="notification_detection_data">
            <i>{{ CountOfHistory }}</i>
            <h4>Total Detection</h4>
          </div>
        </div>
      </div>
      <div class="notification_alerts">
        <div class="notification_alerts_upper">
          <el-icon style="font-size: 100px">
            <warning style="width: 50px; height: 50px" />
          </el-icon>
          <div class="notification_alerts_data">
            <i>{{ CountOfUnHistory }}</i>
            <h4>Total Alerts</h4>
          </div>
        </div>
        <el-popover placement="bottom-start" :width="400" trigger="click">
          <template #reference>
            <el-button
              type="text"
              style="float: right; padding-right: 2%"
              @click="handleViewDetails"
              ><el-icon> <caret-right /> </el-icon>View Details</el-button
            >
          </template>
          <el-table v-loading="loading_1" :data="gridData">
            <el-table-column
              width="150"
              property="date"
              label="Date"
            ></el-table-column>
            <el-table-column
              width="100"
              property="time"
              label="Time"
            ></el-table-column>
            <el-table-column
              width="150"
              property="carplate"
              label="CarPlate"
            ></el-table-column>
          </el-table>
        </el-popover>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="record_table_container">
      <div class="record_table">
        <el-table
          v-loading="loading_2"
          :data="tableData"
          border
          highlight-current-row
          @current-change="handleCurrentTableChange"
          class="record_table"
          style="width: 100%"
          max-height="515"
        >
          <el-table-column fixed prop="date" label="Date" width="120">
          </el-table-column>
          <el-table-column prop="time" label="Time" width="120">
          </el-table-column>
          <el-table-column prop="result" label="CarPlate" width="160">
          </el-table-column>
          <el-table-column prop="confidence" label="Confidence" width="120">
          </el-table-column>
          <el-table-column prop="name" label="Student's Name" width="150">
          </el-table-column>
          <el-table-column prop="class" label="Student's Class" width="150">
          </el-table-column>
        </el-table>
        <div class="pagination_container">
          <template>
          <span class="demonstration"></span>
          <el-pagination
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
            v-model:currentPage="currentPage"
            :page-sizes="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="1000"
          >
          </el-pagination>
          </template>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div v-loading="loading_image" class="picture_container">
        <el-image :src="src" class="image-box">
          <template #placeholder>
            <div class="image-slot">Loading <span class="dot">...</span></div>
          </template>
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Camera,
  CaretRight,
  MapLocation,
  School,
  Warning
} from '@element-plus/icons'
import { formatDate } from '@/assets/js/util'

export default {
  components: {
    [MapLocation.name]: MapLocation,
    [School.name]: School,
    [Camera.name]: Camera,
    [Warning.name]: Warning,
    [CaretRight.name]: CaretRight
  },
  data () {
    return {
      empty: {},
      dialogVisible: false,
      position: 'Main Gate',
      location: 'KwangHwa School',
      CountOfHistory: '',
      CountOfUnHistory: '',
      gridData: [
        {
          date: '',
          time: '',
          carplate: ''
        }
      ],
      loading_1: true,
      tableData: [],
      loading_2: true,
      loading_image: true,
      currentRow: null,
      src: require('../assets/images/avatar.png'),
      currentPage: 1,
      pageSize: [10, 20, 30, 40, 50, 100]
    }
  },
  filters: {},
  created () {
    const currentIndex = '/dataanalysis'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))

    this.getUnHistoryDataCount()
    this.getHistoryData()
  },
  methods: {
    formatTime (time) {
      time = time * 1000
      const date = new Date(time)
      return formatDate(date, 'hh:mm:ss')
    },
    formatDate (time) {
      time = time * 1000
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    },
    async getHistoryData () {
      const { data: res } = await this.$api.post('getDataHistory', this.empty)
      console.log(res.list)
      this.CountOfHistory = res.total
      for (var i = 0; i < res.list.length; i++) {
        const insertItem = {
          date: this.formatDate(res.list[i].detTimestamp),
          time: this.formatTime(res.list[i].detTimestamp),
          result: res.list[i].detCarPlate,
          confidence: res.list[i].detConfidence,
          name: res.list[i].detStudentName,
          class: res.list[i].detStudentClass,
          picLink: res.list[i].detImageLink
        }
        this.src = res.list[0].detImageLink
        this.tableData.push(insertItem)
        console.log(insertItem)
      }
      this.loading_2 = false
      this.loading_image = false
    },
    async getUnHistoryDataCount () {
      const { data: res } = await this.$api.post('getUnDataHistory', this.empty)
      console.log(res.list)
      this.CountOfUnHistory = res.total
    },
    handleViewDetails () {
      this.loading_1 = true
      this.getUnHistoryData()
    },
    async getUnHistoryData () {
      const { data: res } = await this.$api.post('getUnDataHistory', this.empty)
      console.log(res.list)
      this.CountOfUnHistory = res.total
      for (var i = 0; i < res.list.length; i++) {
        const insertItem = {
          date: this.formatDate(res.list[i].detTimestamp),
          time: this.formatTime(res.list[i].detTimestamp),
          carplate: res.list[i].detCarPlate
        }
        this.gridData.push(insertItem)
        console.log(insertItem)
      }
      this.loading_1 = false
    },
    deleteRow (index, rows) {
      console.log(index, rows)
    },
    handleCurrentTableChange (val) {
      console.log(val.index)
      this.src = val.picLink
    },
    handlePageSizeChange (val) {
      console.log(`each ${val}`)
    },
    handleCurrentPageChange (val) {
      console.log(`current page: ${val}`)
    }
  }
}
</script>

<style>
.el-popover {
  height: 200px;
  overflow: auto;
}
</style>

<style lang="less" scoped>
.table_container {
  width: 1500px;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.container_placeholder {
  height: 5%;
  position: relative;
}

.notification_container {
  width: 100%;
  height: 15%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .notification_location {
    width: 18%;
    height: 100%;
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 10px;
    border: solid 1px darkgray;
    .notification_location_upper {
      height: 75%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: darkgray;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-between;
      .notification_location_data {
        padding-right: 10%;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .notification_position {
    width: 18%;
    height: 100%;
    margin-right: 5%;
    border-radius: 10px;
    border: solid 1px aqua;
    .notification_position_upper {
      height: 75%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: aqua;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-between;
      .notification_position_data {
        padding-right: 10%;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .notification_detection {
    width: 18%;
    height: 100%;
    margin-right: 5%;
    border-radius: 10px;
    border: solid 1px #39c5bb;
    .notification_detection_upper {
      height: 75%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #39c5bb;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-between;
      .notification_detection_data {
        padding-right: 10%;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .notification_alerts {
    width: 18%;
    height: 100%;
    margin-right: 5%;
    border-radius: 10px;
    border: solid 1px crimson;
    .notification_alerts_upper {
      height: 75%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: crimson;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-between;
      .notification_alerts_data {
        padding-right: 10%;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.record_table_container {
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  .record_table {
    width: 100%;
    height: 100%;
    .pagination_container {
      padding-top: 3%;
    }
  }
  .picture_container {
    width: 100%;
    height: 100%;
    .image-box {
      height: 480px;
      background-color: aliceblue;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.picture_item {
  .img_box {
    cursor:pointer .image-slot {
      text-align: center;
      margin: 0 auto;
    }
  }
}

.pagination_container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

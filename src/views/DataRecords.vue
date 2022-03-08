<template>
  <div class="table_container">
    <div class="record_table_container">
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
        class="record_table"
        style="width: 80%"
        max-height="350"
      >
        <el-table-column fixed prop="date" label="Date" width="120">
        </el-table-column>
        <el-table-column prop="time" label="Time" width="120">
        </el-table-column>
        <el-table-column prop="result" label="CarPlate" width="160">
        </el-table-column>
        <el-table-column prop="name" label="Student's Name" width="150">
        </el-table-column>
        <el-table-column prop="picLink" label="Picture" width="360">
        </el-table-column>
        <el-table-column fixed="right" label="" width="120"> </el-table-column>
      </el-table>
    </div>
    <div class="picture_container">
      <el-image class="img_box" fit="contain" :src="src">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      tableData: [
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          picLink:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
      ],
      currentRow: null,
      src: ''
    }
  },
  created () {
    const currentIndex = '/datarecords'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))
  },
  methods: {
    deleteRow (index, rows) {
      console.log(index, rows)
    },
    handleCurrentChange (val) {
      console.log(val.index)
      this.src = val.picLink
    }
  }
}
</script>

<style lang="less" scoped>
.table_container {
  width: 1300px;
  height: 85%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.record_table_container {
  width: 100%;
  height: 400px;
  position: relative;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  .record_table {
    width: 90%;
    height: 90%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.picture_container {
  width: 80%;
  height: 400px;
  background-color: aliceblue;
  position: relative;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  .img_box {
    width: 80%;
    height: 400px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .image-slot {
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>

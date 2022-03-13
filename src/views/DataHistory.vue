<template>
  <div class="table_container">
    <div class="record_table_container">
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @current-change="handleCurrentTableChange"
        class="record_table"
        style="width: 80%"
        max-height="700"
      >
        <el-table-column fixed prop="date" label="Date" width="120">
        </el-table-column>
        <el-table-column prop="time" label="Time" width="120">
        </el-table-column>
        <el-table-column prop="result" label="CarPlate" width="160">
        </el-table-column>
        <el-table-column prop="name" label="Student's Name" width="150">
        </el-table-column>
        <el-table-column prop="class" label="Student's Class" width="150">
        </el-table-column>
        <el-table-column prop="picLink" label="Picture" width="300">
        </el-table-column>
        <el-table-column prop="picLink" label="Preview" width="200">
          <template v-slot="scope">
            <el-popover placement="left" :width="800" trigger="click">
              <template #reference>
                <div class="picture_item">
                  <el-image fit="fill" :src="scope.row.picLink" class="img_box">
                    <template #placeholder>
                      <div class="image-slot">
                        Loading<span class="dot">...</span>
                      </div>
                    </template>
                  </el-image>
                </div>
              </template>
              <el-image :src="src"
                ><template #placeholder>
                  <div class="image-slot">
                    Loading<span class="dot">...</span>
                  </div>
                </template></el-image
              >
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination_container">
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
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          date: '2022-02-25',
          time: '13:2:20',
          result: 'PLJ55I8',
          name: '687',
          class: '123',
          picLink:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
      ],
      currentRow: null,
      src: '',
      currentPage: 1,
      pageSize: [10, 20, 30, 40, 50, 100]
    }
  },
  created () {
    const currentIndex = '/datahistory'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))
  },
  methods: {
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

<style lang="less" scoped>
.table_container {
  width: 1500px;
  height: 85%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.record_table_container {
  width: 100%;
  height: 100%;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .record_table {
    width: 90%;
    height: 90%;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.picture_item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .img_box {
    width: 100px;
    height: 50px;
    cursor:pointer .image-slot {
      text-align: center;
      margin: 0 auto;
    }
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
}

.pagination_container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

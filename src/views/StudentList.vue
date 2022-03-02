<template>
  <div class="table_container">
    <div class="search_table">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model="formInline.search"
            placeholder="Student Search"
          ></el-input>
        </el-form-item>
        <el-form-item class="search_select" label="">
          <el-select v-model="formInline.type" placeholder="Type">
            <el-option label="Student ID" value="id"></el-option>
            <el-option label="Student's Name" value="stu_name"></el-option>
            <el-option label="Student's Class" value="class"></el-option>
            <el-option label="" value="" disabled></el-option>
            <el-option label="CarPlate Number" value="carplate_num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSearchSubmit(formInline.search, formInline.type)"
            >Search</el-button
          >
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="toAdd()">Add Information</el-button>
    </div>
    <div class="table_area">
      <el-table :data="tableData" border style="width: 100%" max-height="600">
        <el-table-column
          fixed
          prop="id"
          label="Student ID"
          width="100"
        ></el-table-column>
        <el-table-column prop="stu_name" label="Student's Name" width="200">
        </el-table-column>
        <el-table-column prop="class" label="Student's Class" width="150">
        </el-table-column>
        <el-table-column prop="" label="" width="150"></el-table-column>
        <el-table-column
          prop="carplate_num"
          label="CarPlate Number"
          width="150"
        >
        </el-table-column>
        <el-table-column fixed="right" label="" width="180" class="edit_column">
          <template #default="scope">
            <el-button
              size="default"
              @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-dialog title="收货地址" v-model:visible="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <template v-slot:footer>
                <div class="dialog-footer">
                  <el-button @click="dialogFormVisible = false"
                    >Cancel</el-button
                  >
                  <el-button type="primary" @click="dialogFormVisible = false"
                    >Confirm</el-button
                  >
                </div>
              </template>
            </el-dialog>

            <el-button
              size="default"
              type="danger"
              @click="
                handleDelete(scope.$index, scope.row), (dialogVisible = true)
              "
              >Delete</el-button
            >
            <el-dialog
              title="Notice"
              v-model="dialogVisible"
              width="30%"
              append-to-body
            >
              <span>Are you sure to delete?</span>
              <template v-slot:footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">Cancel</el-button>
                  <el-button
                    type="danger"
                    @click="confirmDelete(), (dialogVisible = false)"
                    >Confirm</el-button
                  >
                </span>
              </template>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      tableData: [],
      editTable: [
        {
          id: '',
          stu_name: '',
          class: ' ',
          carplate_num: ' '
        }
      ],
      formInline: {
        search: '',
        type: ''
      },
      empty: {}, // for request data
      one: {}, // for timer, auto reload
      indexNum: 0,
      rowNum: 0,
      dialogVisible: false
    }
  },
  created () {
    this.getAllData()
  },
  methods: {
    async getAllData () {
      const { data: res } = await this.$api.post('getCarPlate', this.empty)
      console.log(res.list)
      for (var i = 0; i < res.list.length; i++) {
        const insertItem = {
          id: res.list[i].indexNum,
          stu_name: res.list[i].studentName,
          class: res.list[i].studentClass,
          carplate_num: res.list[i].carplateNum
        }

        this.tableData.push(insertItem)
        console.log(insertItem)
      }
    },
    // timer
    timer () {
      return setTimeout(() => {
        this.getAllData()
      }, 1000)
    },
    // watch data change
    watch: {
      one () {
        this.timer()
      }
    },
    destroyed () {
      clearTimeout(this.timer)
    },
    // other functions
    onSearchSubmit (search, type) {
      console.log(search, type)
    },
    toAdd () {
      this.$router.push('/addstudent')
    },
    // edit
    handleEdit (index, row) {
      this.editTable.id = row.id
      this.editTable.stu_name = row.stu_name
      this.editTable.class = row.class
      this.editTable.carplate_num = row.carplateNum
    },
    async confirmEdit () {
      const editItem = {
        indexNum: '1'
      }
      const result = await this.$api.post('deleteCarPlate', editItem)
      console.log(result)
      this.getAllData()
      this.$router.go(0)
    },
    // delete
    closeHandleDelete (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.indexNum = index
      this.rowNum = row
    },
    async confirmDelete () {
      const deleteItme = {
        indexNum: this.rowNum.id
      }
      const result = await this.$api.post('deleteCarPlate', deleteItme)
      console.log(result)
      alert('Delete Successfully!')
      this.getAllData()
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.table_container {
  height: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.edit_column{
  display: flex;
  justify-content: space-between;
}
</style>

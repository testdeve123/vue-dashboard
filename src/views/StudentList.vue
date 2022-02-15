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
            <el-option label="Parent's Name" value="par_name"></el-option>
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
      <el-button type="primary" @click="toAdd()"
        >Add Information</el-button
      >
    </div>
    <div class="table_area">
      <el-table :data="tableData" border style="width: 100%" max-height="1250">
        <el-table-column
          fixed
          prop="id"
          label="Student ID"
          width="100"
        ></el-table-column>
        <el-table-column prop="stu_name" label="Student's Name" width="150">
        </el-table-column>
        <el-table-column prop="class" label="Student's Class" width="150">
        </el-table-column>
        <el-table-column
          prop="par_name"
          label="Parent's Name"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="carplate_num"
          label="CarPlate Number"
          width="150"
        >
        </el-table-column>
        <el-table-column fixed="right" label="" width="200">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: '1',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '2',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '3',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '4',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '5',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '6',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '7',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '8',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '9',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        },
        {
          id: '10',
          stu_name: 'test',
          class: '4A',
          par_name: 'par_test',
          carplate_num: 'pne 123'
        }
      ],
      formInline: {
        search: '',
        type: ''
      }
    }
  },
  methods: {
    onSearchSubmit (search, type) {
      console.log(search, type)
    },
    toAdd () {
      this.$router.push('/addstudent')
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="less" scoped>
.table_container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.search_table {
  display: flex;
  justify-content: space-between;
}
</style>

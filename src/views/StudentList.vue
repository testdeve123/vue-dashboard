<template>
  <div class="table_container">
    <div class="upper_area">
      <div class="search_table">
        <template>
          <el-form
            :inline="true"
            :rules="rule"
            :model="formInline"
            class="demo-form-inline"
          >
            <el-form-item label="" prop="name">
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
                <el-option
                  label="CarPlate Number"
                  value="carplate_num"
                ></el-option>
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
        </template>
      </div>
      <div class="add_info">
        <el-button type="primary" @click="toAdd()">Add Information</el-button>
      </div>
    </div>
    <div class="table_area">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        max-height="700"
      >
        <el-table-column
          fixed
          prop="id"
          label="Student ID"
          width="100"
        ></el-table-column>
        <el-table-column prop="stu_name" label="Student's Name" width="300">
        </el-table-column>
        <el-table-column prop="class" label="Student's Class" width="150">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="Student's Gender"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="carplate_num"
          label="CarPlate Number"
          width="200"
        >
        </el-table-column>
        <el-table-column label="" width="200" class="edit_column">
          <template #default="scope">
            <el-button
              size="default"
              @click="
                ;(dialogFormVisible = true), handleEdit(scope.$index, scope.row)
              "
              >Edit</el-button
            >
            <el-dialog
              title="Edit Information"
              v-model="dialogFormVisible"
              :append-to-body="true"
            >
              <el-form :rules="rules" :model="editForm">
                <el-form-item label="Student ID" prop="id">
                  <el-input v-model="editForm.id"></el-input>
                </el-form-item>
                <el-form-item label="Student Name" prop="name">
                  <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Student Gender" prop="gender">
                  <el-radio v-model="editForm.gender" label="0"
                    >Female</el-radio
                  >
                  <el-radio v-model="editForm.gender" label="1">Male</el-radio>
                </el-form-item>
                <el-form-item label="Student Class" prop="">
                  <el-form-item label="" prop="year">
                    <el-select v-model="editForm.year" placeholder="Year">
                      <el-option
                        v-for="item in yearList"
                        :label="item"
                        :value="item"
                        :key="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="" prop="group">
                    <el-select
                      v-model="editForm.group"
                      placeholder="Group"
                      prop="group"
                    >
                      <el-option
                        v-for="item in groupList"
                        :label="item"
                        :value="item"
                        :key="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="Carplate Number" prop="carplate">
                  <el-input v-model="editForm.carplate"></el-input>
                </el-form-item>
              </el-form>
              <template v-slot:footer>
                <div class="dialog-footer">
                  <el-button @click="dialogFormVisible = false"
                    >Cancel</el-button
                  >
                  <el-button
                    type="primary"
                    @click="confirmEdit(), (dialogFormVisible = false)"
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
              :append-to-body="true"
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
// check input ID, must be number type
const isNum = (rule, value, callback) => {
  const age = /^[0-9]*$/
  if (!age.test(value)) {
    callback(new Error(''))
  } else {
    callback()
  }
}

export default {
  inject: ['reload'],
  data () {
    return {
      loading: true,
      tableData: [],
      yearList: ['1', '2', '3', '4', '5', '6'],
      groupList: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      editForm: [
        {
          index: '',
          id: '',
          name: '',
          gender: '',
          year: '',
          group: '',
          carplate: ''
        }
      ],
      formInline: {
        search: '',
        type: ''
      },
      rules: {
        id: [
          {
            required: true,
            message: "Please enter the student's ID",
            trigger: 'blur'
          },
          {
            validator: isNum,
            message: "The student's ID must be number",
            trigger: 'blur'
          },
          {
            max: 6,
            message: "The student's ID cannot be longer than 6 characters",
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: "Please enter student's name",
            trigger: 'blur'
          },
          {
            max: 30,
            message: "The student's name cannot be longer than 30 characters",
            trigger: 'blur'
          }
        ],
        gender: [
          {
            required: true,
            message: "Please select student's gender",
            trigger: 'change'
          }
        ],
        year: [
          {
            required: true,
            message: 'Please enter year of study',
            trigger: 'change'
          }
        ],
        group: [
          {
            required: true,
            message: 'Please enter group of study',
            trigger: 'change'
          }
        ],
        carplate: [
          {
            required: true,
            message: 'Please enter car plate number',
            trigger: 'blur'
          },
          {
            max: 10,
            message: 'Car Plate cannot be longer than 10 characters',
            trigger: 'blur'
          }
        ]
      },
      empty: {}, // for request data
      one: {}, // for timer, auto reload
      indexNum: 0,
      rowNum: 0,
      formLabelWidth: '120px',
      dialogFormVisible: false, // for edit button
      dialogVisible: false // for delete button
    }
  },
  created () {
    const currentIndex = '/studentlist'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))

    this.getAllData()
  },
  methods: {
    async getAllData () {
      const { data: res } = await this.$api.post('getCarPlate', this.empty)
      console.log(res.list)
      var gender = ''
      for (var i = 0; i < res.list.length; i++) {
        if (res.list[i].isMale === 0) {
          gender = 'Female'
        } else {
          gender = 'Male'
        }
        const insertItem = {
          index: res.list[i].stuIndex,
          id: res.list[i].studentId,
          stu_name: res.list[i].studentName,
          year: res.list[i].studyYear,
          group: res.list[i].studyGroup,
          class: res.list[i].studyYear + res.list[i].studyGroup,
          isMale: res.list[i].isMale,
          gender: gender,
          carplate_num: res.list[i].carPlateNum
        }

        this.tableData.push(insertItem)
        console.log(insertItem)
      }
      this.loading = false
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
      this.editForm.index = row.index
      this.editForm.id = row.id
      this.editForm.name = row.stu_name
      this.editForm.year = row.year
      this.editForm.group = row.group
      this.editForm.gender = row.isMale
      this.editForm.carplate = row.carplate_num
    },
    async confirmEdit () {
      const editItem = {
        stuIndex: this.editForm.index,
        studentId: this.editForm.id,
        studentName: this.editForm.name,
        studyYear: this.editForm.year,
        studyGroup: this.editForm.group,
        isMale: this.editForm.gender,
        carPlateNum: this.editForm.carplate
      }
      const result = await this.$api.post('editCarPlate', editItem)
      console.log(result)
      this.getAllData()
      this.$router.go(0)
    },
    // delete
    handleDelete (index, row) {
      this.indexNum = index
      this.rowNum = row
      console.log(index, row)
    },
    async confirmDelete () {
      const deleteItme = {
        studentId: this.rowNum.id
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
  width: 1200px;
  height: 90%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .upper_area {
    padding-bottom: 1%;
    display: flex;
    justify-content: space-between;
  }
}

.edit_column {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

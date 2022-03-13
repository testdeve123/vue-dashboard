<template>
  <el-container class="add_container">
    <el-header class="add_header"
      ><el-page-header @back="goBacktoSL" content="Adding Page">
      </el-page-header
    ></el-header>
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Student Details" name="first">
          <el-form
            :model="addForm"
            :rules="rules"
            ref="addForm"
            label-width="200px"
            class="demo-ruleForm"
          >
            <el-form-item label="Student ID" prop="id">
              <el-input v-model="addForm.id"></el-input>
            </el-form-item>
            <el-form-item label="Student Name" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Student Gender" prop="gender">
              <el-radio v-model="addForm.gender" label="0">Female</el-radio>
              <el-radio v-model="addForm.gender" label="1">Male</el-radio>
            </el-form-item>
            <el-form-item label="Student Class" prop="">
              <el-form-item label="" prop="year">
                <el-select v-model="addForm.year" placeholder="Year">
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
                  v-model="addForm.group"
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
              <el-input v-model="addForm.carplate"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('addForm')"
                >Create</el-button
              >
              <el-button @click="resetForm('addForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label=" " name="second" disabled></el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
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
  data () {
    return {
      addForm: {
        id: '',
        name: '',
        gender: '',
        year: '',
        group: '',
        carplate: ''
      },
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
      addSubmitForm: {
        studentId: '',
        studentName: '',
        isMale: '',
        studyYear: '',
        studyGroup: '',
        carPlateNum: ''
      },
      activeName: 'first',
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
      }
    }
  },
  created () {
    const currentIndex = '/studentlist'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))
  },
  methods: {
    goBacktoSL () {
      this.$router.push('/studentlist')
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.addSubmitForm.studentId = this.addForm.id
          this.addSubmitForm.studentName = this.addForm.name
          this.addSubmitForm.isMale = this.addForm.gender
          this.addSubmitForm.studyYear = this.addForm.year
          this.addSubmitForm.studyGroup = this.addForm.group
          this.addSubmitForm.carPlateNum = this.addForm.carplate
          const result = await this.$api.post('addCarPlate', this.addSubmitForm)
          console.log(result)
          this.$router.push('/studentlist')
          alert('Submit Successfully!')
        } else {
          console.log('Error Submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.add_container {
  padding: 20px;
}

.add_header {
  display: flex;
  align-items: center;
}
</style>

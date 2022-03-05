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
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="Student Name" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Student Class" prop="class">
              <el-input v-model="addForm.class"></el-input>
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
        <el-tab-pane
          label="Car Plate / Parent Details (optional)"
          name="second"
        ></el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      addForm: {
        name: '',
        class: '',
        carplate: ''
      },
      addSubmitForm: {
        carplateNum: '',
        studentName: '',
        studentClass: ''
      },
      activeName: 'first',
      rules: {
        name: [
          {
            required: true,
            message: "Please enter student's name",
            trigger: 'blur'
          }
        ],
        class: [
          {
            required: true,
            message: "Please enter student's class",
            trigger: 'change'
          }
        ],
        carplate: [
          {
            required: true,
            message: "Please enter student's class",
            trigger: 'change'
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
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.addSubmitForm.carplateNum = this.addForm.carplate
          this.addSubmitForm.studentName = this.addForm.name
          this.addSubmitForm.studentClass = this.addForm.class
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

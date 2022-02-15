<template>
  <el-container class="add_container">
    <el-header class="add_header"
      ><el-page-header @back="goBacktoSL" content="Adding Page"> </el-page-header
    ></el-header>
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Student Details" name="first">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="Student ID" prop="id">
              <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="Name" prop="id">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Gender" prop="gender">
              <el-select v-model="ruleForm.gender" placeholder="">
                <el-option label="" value="Male"></el-option>
                <el-option label="" value="Female"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="date"
                    placeholder="Date"
                    v-model="ruleForm.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker
                    placeholder=""
                    v-model="ruleForm.date2"
                    style="width: 100%"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox
                  label=""
                  name="type"
                ></el-checkbox>
                <el-checkbox label="" name="type"></el-checkbox>
                <el-checkbox label="" name="type"></el-checkbox>
                <el-checkbox label="" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label=""></el-radio>
                <el-radio label=""></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >Create</el-button
              >
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
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
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      activeName: 'first',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  methods: {
    goBacktoSL () {
      this.$router.push('/studentlist')
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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

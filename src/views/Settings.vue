<template>
  <div class="table_container">
    <div class="percentage_chart_date">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formInline.region" placeholder="">
            <el-option label="" value="shanghai"></el-option>
            <el-option label="" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
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
    return {
      formInline: {
        user: '',
        region: ''
      },
      options: [
        {
          value: '1',
          label: 'Today'
        },
        {
          value: '2',
          label: 'Yesterday'
        }
      ],
      dialogVisible: false
    }
  },
  created () {
    const currentIndex = '/settings'
    this.$emit('getIndex', currentIndex)
    localStorage.setItem('activeIndex', JSON.stringify(currentIndex))
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less" scoped>
.percentage_chart_date {
  background-color: aqua;
}
</style>

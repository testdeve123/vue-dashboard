<template>
  <div class="table_container">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
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
  methods: {}
}
</script>

<style lang="less" scoped></style>

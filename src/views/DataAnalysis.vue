<template>
  <div class="table_container">
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >

    <el-dialog title="提示" v-model="dialogVisible" width="30%">
      <span>需要注意的是内容是默认不居中的</span>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>

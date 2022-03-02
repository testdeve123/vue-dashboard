<template>
  <div class="project-list-details-index">
    <div class="project-list-details-index-inner">
      <div class="project-list-details-index-inner-title">
        <!-- <el-select @change="valChange" v-model="selectType"  collapse-tags placeholder="请选择批文类型">
          <el-option
            v-for="item in selectList"
            :key="item.dictdataValue"
            :label="item.dictdataName"
            :value="item.dictdataValue">
          </el-option>
        </el-select> -->

        <el-button type="text" @click="goBack">
          <img
            src="@/assets/inspection/back.png"
            width="89"
            height="32"
            style="margin-top: -10px"
          />
        </el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-check"
          style="height: 32px"
          @click="calculation"
        >
          计算</el-button
        >
      </div>
      <el-table
        :data="list"
        :height="tableHeight"
        v-loading="loading"
        :row-style="isRed"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column
          type=""
          prop="chapter"
          label="章节"
          width="180"
        ></el-table-column>
        <el-table-column prop="name" label="费用项名称" width="300">
          <template v-slot="scope">
            <span>
              <div
                :style="{
                  display: 'inline-block',
                  width: scope.row.level * 10 + 'px'
                }"
              ></div>
              {{ scope.row.name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="price" label="合同" align="center">
          <el-table-column
            prop="contractnum"
            label="数量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="finishprice"
            label="单价"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="contractmoney"
            label="金额"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="price" label="本季完成" align="center">
          <el-table-column prop="bfinishnum" label="数量" align="left">
            <template v-slot="scope">
              <el-input
                v-if="scope.row.isleaf === 1"
                @blur="inputChange(scope.row)"
                v-model="scope.row.bfinishnum"
              ></el-input>
              <span v-else>{{ scope.row.bfinishnum }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bfinishmoney"
            label="金额"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="price" label="本年完成" align="center">
          <el-table-column
            prop="btyfinishnum"
            label="数量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="btyfinishmoney"
            label="金额"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="price" label="开累完成" align="center">
          <el-table-column
            prop="ballfinishnum"
            label="数量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ballfinishmoney"
            label="金额"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="price" label="剩余" align="center">
          <el-table-column
            prop="price"
            label="数量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="金额"
            align="center"
          ></el-table-column>
        </el-table-column>
      </el-table>
      <!-- <div class="heji">
        <span class="heji-item">合同金额：0元</span>
        <span class="heji-item">本季完成：0元</span>
        <span class="heji-item">本年完成：0元</span>
        <span class="heji-item">所含税金：0元</span>
      </div> -->

      <el-dialog :title="title" v-model:visible="open" width="500px">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
          label-position="top"
        >
          <el-form-item label="" prop="remarks">
            <el-input
              type="textarea"
              :rows="4"
              maxlength="200"
              v-model="form.remarks"
              placeholder="请输入备注内容"
            />
          </el-form-item>
        </el-form>
        <template v-slot:footer
          ><div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  chapterQuery,
  updateChapter,
  editTable,
  prcCheckChapterccc
} from '@/api/inspection/list-details'
import { mapGetters } from 'vuex'
import { PlTable, PlTableColumn } from 'pl-table'
export default {
  data () {
    return {
      month: '',
      tableHeight: window.innerHeight - 220,
      list: [],
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      form: {},
      rules: {},
      selectList: [],
      selectType: '',
      listHeader: [],
      showTable: true,
      ccid: null,
      limit: 200,
      page: 1,
      // 总页数
      totalPage: 0
    }
  },
  computed: {
    ...mapGetters(['projectId'])
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PlTable,
    // eslint-disable-next-line vue/no-unused-components
    PlTableColumn
  },
  created () {
    this.ccid = Number(this.$route.query.ccid)
    this.getList()
  },
  methods: {
    inputChange (row) {
      console.log(row)
      editTable({
        fid: row.fid,
        finishnum: Number(row.bfinishnum)
      }).then((res) => {
        // if(res.code==200){
        //     chapterQuery(this.ccid).then((res) => {
        //     this.list = res.result;
        //   });
        // }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    calculation () {
      prcCheckChapterccc(this.ccid).then((res) => {
        if (res.code === '200') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getList()
        }
      })
    },
    getList () {
      updateChapter(this.ccid).then((res) => {
        if (res.code === '200') {
          this.loading = true
          chapterQuery(this.ccid, this.limit, this.page).then((res) => {
            this.loading = false
            this.list = res.result.list
            this.totalPage = res.result.pages
          })
        }
      })
    },
    // 加载列表
    getNextList () {
      this.loading = true
      chapterQuery(this.ccid, this.limit, this.page).then((res) => {
        this.loading = false
        this.list = this.list.concat(res.result.list)
        this.totalPage = res.result.pages
      })
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    isRed ({ row }) {
      if (row.isleaf === 1) {
        return {
          backgroundColor: '#f6f5ec'
        }
      }
    },
    // 表单重置
    reset () {},
    /** 搜索按钮操作 */
    handleQuery () {},
    /** 重置按钮操作 */
    resetQuery () {
      // this.resetForm("queryForm");
      // this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange (selection) {},
    /** 新增按钮操作 */
    handleAdd () {
      // this.reset();
      // this.open = true;
      // this.title = "添加价格调整记录";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {},
    /** 提交按钮 */
    submitForm () {},
    /** 删除按钮操作 */
    handleDelete (row) {}
  },
  mounted () {
    // 获取表格对象
    const dom = document.querySelector('.el-table__body-wrapper')
    dom.addEventListener('scroll', (v) => {
      // scrollHeight: 元素的总高度，包含滚动条；scrollTop：滚动条距离元素顶部的距离；clientHeight：可视区域元素的大小
      const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight
      // 小于1 已经到底，可以加载下一页
      if (scrollDistance <= 1) {
        // 判断是否全部加载完成
        if (this.page >= this.totalPage) {
          this.$message.warning('已经见底了 ~')
        }
        if (this.page < this.totalPage) {
          // 当前页数小于总页数就请求
          this.page++ // 当前页数自增
          // 加载下一页方法
          this.getNextList()
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.project-list-details-index {
  height: calc(100vh - 120px);
  padding-bottom: 70px;
  background: #f8f8f8;
  padding-top: 20px;
  box-sizing: border-box;
  &-inner {
    background: #fff;

    &-title {
      display: flex;
      // justify-content: space-between;
      padding: 15px 40px;
      box-sizing: border-box;
      .el-input {
        width: 300px;
        margin: 0 20px;
      }
      .el-date-picker {
        margin-right: 20px;
      }
    }
    .seach-form {
      padding: 25px 40px;
      .chapter-title {
        position: absolute;
        left: 50%;
        height: 22px;
        font-size: 16px;
        font-weight: 600;
        color: #484848;
        line-height: 22px;
      }
    }
    .heji {
      position: fixed;
      bottom: 0;
      &-item {
        display: inline-block;
        width: 200px;
        padding: 25px 40px;
      }
    }
  }
}
</style>

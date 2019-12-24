<template>
  <div class="interview-box">
    <el-table
      :data="interviewArr"
      border
      >
      <el-table-column
        prop="no"
        label="模板编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="模板名称">
      </el-table-column>
      <el-table-column
        prop="description"
        label="模板说明">
        <template slot-scope="scope">
          <el-tooltip popper-class="toolTipClass" effect="light" :content="scope.row.description" placement="right">
            <div class="line-clamp2 scroll-infor">
              {{scope.row.description}}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="mail"
        label="发件人邮箱">
      </el-table-column>
      <el-table-column
        prop="enabled"
        label="状态">
        <template slot-scope="scope">
            <span v-if="scope.row.enabled == 0">已停用</span>
            <span v-if="scope.row.enabled == 1">使用中</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="creator"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        min-width="160"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right">
         <template slot-scope="scope">
           <div class="operation">
              <span v-if="scope.row.enabled == 1" @click="modifyMail(scope.row)">编辑</span>
             <span @click="enableTemplate(scope.row)">{{scope.row.enabled == 0 ? '启用' : '停用'}}</span>
           </div>
         </template>
      </el-table-column>
    </el-table>
    <pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageMsg.currentPage"
      :page-sizes="pageMsg.pageSizes"
      :page-size="pageMsg.pageSize"
      :total="pageMsg.total">
    </pagination>
  </div>
</template>
<script>
import { getMailTemplateList, enabledMail } from 'static/api/setting/index'
import { mapGetters, mapMutations } from 'vuex'
import Pagination from 'components/Pagination'
export default {
  data () {
    return {
      interviewArr: [],
      searchFlag: false,
      searchForm: {},
      pageMsg: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50],
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['getSettingMailSearchArr', 'getSettingMailClick']),
    mailParams () {
      return {
        page: this.pageMsg.currentPage,
        size: this.pageMsg.pageSize,
        keyword: this.searchForm.keyword,
        enabled: this.searchForm.enabled,
        type: 2
      }
    }
  },
  methods: {
    ...mapMutations({
      setSettingMailClick: 'SET_SETTING_MAIL_CLICKED'
    }),
    _getMailTemplateList () {
      getMailTemplateList(this.mailParams).then(data => {
        if (data.result) {
          this.interviewArr = data.result.records
          this.pageMsg.total = data.result.total
        }
      })
    },
    _getSearchForm () {
      this.$bus.$on('searchForm', (data, is) => {
        this.searchForm = data
        this.searchFlag = is
      })
    },
    handleSizeChange (pageSize) {
      this.pageMsg.pageSize = pageSize
      this._getMailTemplateList()
    },
    handleCurrentChange (currentPage) {
      this.pageMsg.currentPage = currentPage
      this._getMailTemplateList()
    },
    enableTemplate (row) {
      let enableTxt = row.enabled === 0 ? '启用' : '停用'
      this.$confirm('确定要' + enableTxt + row.name + '吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let emableParams = {
          tempId: row.id,
          enabled: row.enabled === 0 ? 1 : 0
        }
        enabledMail(emableParams).then(data => {
          this.$message.success('修改成功')
          setTimeout(() => {
            this._getMailTemplateList()
          }, 200)
        })
      }).catch(() => {})
    },
    // 编辑邮件模板
    modifyMail (row) {
      this.$router.push({ name: 'OfferEdit', params: { id: row.id } })
    }
  },
  watch: {
    searchFlag (value) {
      if (value) {
        this._getMailTemplateList()
        this.searchFlag = false
      }
    },
    getSettingMailClick (value) {
      if (value) {
        this._getMailTemplateList()
        this.setSettingMailClick(false)
      }
    }
  },
  components: {
    Pagination
  },
  created () {
    this._getSearchForm()
    this._getMailTemplateList()
  }
}
</script>

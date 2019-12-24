<template>
<div class="container">
     <el-row class="mt-20">
         <ul class="tab-bar-ul clearfix">
            <li><el-button type="primary" size="small" @click="goBack">返 回</el-button></li>
            <li><el-button type="primary" size="small" @click="printAccept">打印</el-button></li>
            <li><el-button type="primary" size="small" @click="printWord">下载</el-button></li>
           <div v-if="$route.params.type=='review' || $route.query.come=='/market-verify/entry/entry'">
             <li><el-button type="primary" size="small" @click="goReview">同意入职</el-button></li>
             <li><el-button type="primary" size="small" @click="UngoReview">不同意入职</el-button></li>
           </div>
         </ul>
    </el-row>
     <el-row class="mt-20">
    <el-col :span="24">
      <el-tabs v-model="activeName">
        <el-tab-pane label="劳动人事信息" name="first">
           <labor ref="laborRef" />
        </el-tab-pane>
        <el-tab-pane label="个人档案" name="second">
          <personnal ref="personnalRef"/>
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="tab-wrap clearfix">
        <ul class="edit-tab clearfix">
          <li @click="skipLabor">
            <a :class="{'router-link-active': !activeRouter}">劳动人事信息</a>
          </li>
          <li @click="skipPersonnal" >
            <a :class="{'router-link-active': activeRouter}">个人档案</a>
          </li>
        </ul>
      </div> -->
    </el-col>
  </el-row>
  <!-- <router-view></router-view> -->

   <el-dialog
      title="不同意入职原因"
    :visible.sync="resonVisible"
      width="500px">
      <div class="module-opera">
        <el-form :model="resonForm" label-width="80px" >
          <el-form-item  label="原因：" class="mustForm">
            <el-select
             style="width:100%"
            v-model="resonForm.remark" placeholder="请选择">
              <el-option
                v-for="item in UnresonOption"
                :key="item.id"
                :label="item.codeText"
                :value="item.codeText">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="说明："  label-width="80px">
            <el-input type="textarea" v-model="resonForm.backreson"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button @click="resonVisible = false" class="false" size="mini">取 消</el-button>
				<el-button type="primary" @click="resonComfire" size="mini">确 定</el-button>
			</span>
    </el-dialog>
</div>
</template>
<script>
import { getTaskComplete } from 'static/api/exmine/exmine'
import { mapGetters } from 'vuex'
import { getToken } from 'assets/js/util'
import { assessCallback, printEntryMessage } from 'static/api/recruit/entry/entry'
import { getSysDic } from 'static/api/common/common'
// import {timeZeroToString} from 'assets/js/common'
import Labor from './labor'
import Personnal from './personnal'
export default {
  data () {
    return {
      resonVisible: false,
      UnresonOption: [],
      resonForm: {
        remark: '',
        backreson: ''
      },
      unComplateForm: {},
      activeName: 'first'
    }
  },
  components: {
    Labor,
    Personnal
  },
  computed: {
    ...mapGetters({
      'activeRouter': 'getActiveRouter'
    })
  },
  methods: {
    goBack () {
      let routeCome = this.$route.params.come
      this.$router.replace({ path: routeCome, query: { active: 'first' } })
      // let routerType = this.$route.params.type
      // if (routerType.match(/^entry/)) {
      //   this.$router.replace('/verify/entry/entry')
      // } else if (routerType.match(/^review/)) {
      //   this.$router.replace('/verify/entry/review-entry')
      // }
    },
    skipLabor () {
      this.$router.push({ name: 'VerifyEntryLabor',
        params: this.$route.params,
        query: this.$route.query
      }
      )
    },
    skipPersonnal () {
      this.$router.push({ name: 'VerifyEntryPersonnal',
        params: this.$route.params,
        query: this.$route.query
      })
    },
    // 同意入职
    goReview () {
      this.$confirm('是否同意通过审批', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let passParams = {
          auditStatus: 1,
          userId: this.$route.params.employeeId
        }
        let newPassKey = this.$route.params.exminePassKey
        newPassKey = newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass'
        let complateParams = {
          actType: 'entryMarket',
          userId: getToken('loginId').toString(),
          pId: this.$route.params.exminePid,
          id: this.$route.params.exmineId,
          taskId: this.$route.params.exmineTaskId,
          owner: this.$route.params.exmineUserId,
          var: {
            keys: newPassKey,
            values: 'true',
            types: 'B'
          }
        }
        if (this.$route.query.come === '/market-verify/entry/entry') {
          getTaskComplete(complateParams).then(res => {
            this.$message.success('审核通过')
            setTimeout(() => {
              this.$router.replace('/market-verify/entry/entry')
            }, 200)
          })
        } else {
          assessCallback(passParams).then(data => {
            getTaskComplete(complateParams).then(res => {
              this.$message.success('终审通过')
              setTimeout(() => {
                this.$router.replace('/verify/entry/review-entry?active=first')
              }, 200)
            })
          })
        }
      }).catch(() => {})
    },
    /** 复核不同意入职原因**/
    UngoReview () {
      this.resonVisible = true
      let newPassKey = this.$route.params.exminePassKey
      newPassKey = (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'Pass') + ',' + (newPassKey.substr(0, newPassKey.indexOf('Audit')) + 'BackReason')
      let valuePost = false + ',' + this.resonForm.remark + ' ' + this.resonForm.backreson
      let unComplateParams = {
        actType: 'entryMarket',
        userId: getToken('loginId').toString(),
        pId: this.$route.params.exminePid,
        id: this.$route.params.exmineId,
        taskId: this.$route.params.exmineTaskId,
        owner: this.$route.params.exmineUserId,
        var: {
          keys: newPassKey,
          values: valuePost,
          types: 'B,S'
        }
      }
      this.unComplateForm = unComplateParams
    },
    resonComfire () {
      if (!this.resonForm.remark) {
        this.$message.warning({
          message: '请选择原因!'
        })
        return
      }
      if (!this.resonForm.backreson) {
        this.unComplateForm.var.values = false + ',' + this.resonForm.remark
      } else {
        this.unComplateForm.var.values = false + ',' + this.resonForm.remark + ' ' + this.resonForm.backreson
      }
      let passParams = {
        auditStatus: 0,
        userId: this.$route.params.employeeId
      }
      if (this.$route.query.come === '/market-verify/entry/entry') {
        assessCallback(passParams).then(data => {
          getTaskComplete(this.unComplateForm).then(data => {
            this.$message.success('操作成功')
            this.resonVisible = false
            setTimeout(() => {
              this.$router.replace('/market-verify/entry/entry')
            }, 400)
          })
        })
      } else {
        getTaskComplete(this.unComplateForm).then(data => {
          this.$message.success('操作成功')
          this.resonVisible = false
          setTimeout(() => {
            this.$router.replace('/verify/entry/review-entry?active=first')
          }, 400)
        })
      }
    },
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 不同意类型 */
      await getSysDic('auditRefusedType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.UnresonOption.push(item)
            }
          })
        }
      })
    },
    // 去掉时间字符串末尾的天数
    sliceLastIndex (value) {
      if (typeof value === 'string') {
        return value.substring(0, value.lastIndexOf('-'))
      }
    },
    // 下载
    printWord () {
      const userId = this.$route.params.employeeId
      // let newPage = window.open()
      printEntryMessage({ userId }).then(res => {
        // newPage.location.href = res.result.pdfUrl
        window.open(res.result.wordUrl, '_self')
      })
    },
    // 打印
    printAccept () {
      const userId = this.$route.params.employeeId
      let newPage = window.open('about:blank')
      printEntryMessage({ userId }).then(res => {
        newPage.location.href = res.result.pdfUrl
      })
    }
  },
  created () {
    this._getQueryClassList()
  }
}
</script>

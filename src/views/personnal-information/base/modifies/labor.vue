<template>
  <div class="base-update-labor">
    <el-row>
      <el-button type="primary" size="mini" @click="submitUpdate">提交{{updateType === '2' ? '更正' : '更新'}}</el-button>
    </el-row>
    <el-tabs type="card" closable  class="mt-20"  @tab-remove="handleClose">
     <el-tab-pane
      v-for="tag in selectTags"
      :key="tag"
      :label="tag"
      :name="tag"
    >
  </el-tab-pane>
    </el-tabs>
    <!-- <el-row :gutter="12" type="flex"  class="mt-20">
      <el-col  v-for="tag in selectTags" :key="tag" style="width:auto">
        <el-tag
           closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
         </el-tag>
        </el-col>
    </el-row> -->
    <div class="fix-select">
       <el-select
          style="width:100%"
           multiple
           collapse-tags
          v-model="selectTag"
          placeholder="请选择"
          @change="changeTag"
          @remove-tag="removeTag"
          >
          <el-option
          v-for="item in selecDynamics"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :disabled="item.disabled"
          ></el-option>
          </el-select>
    </div>
    <el-table
     class="mt-20"
      border
      :data="tableTabs"
    >
     <el-table-column
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="field"
      :label="updateType === '2'? '更正字段' :'更新字段'"
      width="190"
    />
    <el-table-column
      prop="type"
      label="原值"
      width="300"
    >
    <template slot-scope="scope">
      <div v-if="scope.row.type == 'cancelConctractWithOldText'">
        {{scope.row.originalValue}}
      </div>
       <div v-else-if="scope.row.type == 'insuredInOld'">
       <div v-if="scope.row.originalValue == '未缴纳'">
          {{scope.row.originalValue}}
        </div>
        <div v-else style="text-align:left">
          <p>{{scope.row.originalValue}}</p>
          <p>社保缴纳至：{{scope.row.insuredOldMonth | formatDate}}</p>
          <p>社保缴纳地：{{scope.row.insuredOldArea ? scope.row.insuredOldArea :'未填写'}}</p>
        </div>
      </div>
      <div v-else-if="scope.row.type == 'fundedInOld'">
       <div v-if="scope.row.originalValue == '未缴纳'">
          {{scope.row.originalValue}}
        </div>
        <div v-else  style="text-align:left">
          <p>{{scope.row.originalValue}}</p>
          <p>公积金缴纳至：{{scope.row.fundedOldMonth | formatDate}}</p>
          <p>公积金缴纳地：{{scope.row.fundedOldArea  ?  scope.row.fundedOldArea : '未填写'}}</p>
        </div>
      </div>
       <div v-else>
         {{scope.row.originalValue}}
        </div>
    </template>
    </el-table-column>
     <el-table-column
      prop="type"
      label="新值"
     width="306"
    >
    <template slot-scope="scope">
       <div v-if="scope.row.type == 'cancelConctractWithOldText'" style="text-align:left">
          <el-radio-group v-model="laborForm.newCancelConctractWithOld">
            <el-radio v-for="item in cancelConctractWithOldOption" :label="item.code" :key="item.id" :disabled="item.disabled">
              {{item.codeText}}
            </el-radio>
          </el-radio-group>
        </div>
        <div v-else-if="scope.row.type=='insuredInOld'" style="text-align:left">
           <el-radio-group v-model="laborForm.newInsuredInOld">
            <el-radio :label="0" >未缴纳</el-radio>
            <el-radio :label="1" >缴纳</el-radio>
          </el-radio-group>
          <div v-if="laborForm.newInsuredInOld">
            <el-row class="mt-10">
              <el-col :span="10">
                 社保缴纳至：
              </el-col>
              <el-col :span="14">
                <el-date-picker
                v-model="scope.row.newInsuredOldMonth"
                value-format="yyyy-MM-dd"
                type="month"
                placeholder="选择日期">
              </el-date-picker>
              </el-col>
             </el-row>
             <el-row class="mt-10">
               <el-col :span="10">
                 社保缴纳地：
               </el-col>
               <el-col :span="14">
                 <el-input style="width:100%" v-model.trim="scope.row.newInsuredOldArea" placeholder="请填写社保缴纳地"></el-input>
               </el-col>
             </el-row>
          </div>
        </div>
         <div v-else-if="scope.row.type=='fundedInOld'" style="text-align:left">
           <el-radio-group v-model="laborForm.newFundedInOld">
            <el-radio :label="0" >未缴纳</el-radio>
            <el-radio :label="1" >缴纳</el-radio>
          </el-radio-group>
          <div v-if="laborForm.newFundedInOld">
            <el-row class="mt-10">
              <el-col :span="10">
                 公积金缴纳至：
              </el-col>
              <el-col :span="14">
                 <el-date-picker
                v-model="scope.row.newFundedOldMonth"
                type="month"
                 value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              </el-col>
             </el-row>
             <el-row class="mt-10">
               <el-col :span="10">
                 公积金缴纳地：
               </el-col>
               <el-col :span="14">
                 <el-input style="width:100%" v-model.trim="scope.row.newFundedOldArea" placeholder="请填写公积金缴纳地"></el-input>
               </el-col>
             </el-row>
          </div>
        </div>
        <div v-else-if="scope.row.type=='takejobDate'" style="text-align:left">
          <el-date-picker
              v-model="laborForm.takejobDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"/>
        </div>
         <div v-else-if="scope.row.type=='entryDate'" style="text-align:left">
          <el-date-picker
              v-model="laborForm.entryDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"/>
        </div>
         <div v-else-if="scope.row.type=='orgName'" style="height:40px">
                 <search-dept-tree
                  :orgDatas="orgDatas"
                  @selectChange="selectChange"
                  />
        </div>
         <div v-else-if="scope.row.type=='postName'" style="text-align:left">
          <el-input
              v-model="laborForm.postName"
              placeholder="岗位"
          />
        </div>
    </template>
     </el-table-column>
     <el-table-column
     prop="remark"
     label="说明"
     min-width="200"
     >
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="说明"/>
        </template>
     </el-table-column>
    </el-table>
  </div>
</template>
<script>
import SearchDeptTree from '@/components/SearchDeptTree'
import commonApi from 'api/common'
import entryApi from 'api/entry'
import { debounce } from 'lodash'
import dayjs from 'dayjs'
import { getToken } from 'assets/js/util'
export default {
  data () {
    return {
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        disabled: true,
        bindData: 'noMarket'
      },
      laborForm: {
        oldId: '',
        cancelConctractWithOld: '',
        newCancelConctractWithOld: '',
        cancelConctractWithOldText: '',
        insuredInOld: '',
        newInsuredInOld: '',
        fundedInOld: '',
        newFundedInOld: '',
        insuredOldArea: '',
        newInsuredOldArea: '',
        insuredOldMonth: '',
        newInsuredOldMonth: '',
        fundedOldMonth: '',
        newFundedOldMonth: '',
        fundedOldArea: '',
        newFundedOldArea: '',
        takejobDate: '',
        entryDate: '',
        orgId: '',
        orgName: '',
        postName: ''
      },
      cancelConctractWithOldOption: [],
      // '是否与原单位解除劳动关系', '原单位是否缴纳社保', '原单位是否缴纳公积金'
      dynamicTags: [{
        tagTitle: '是否与原单位解除劳动关系',
        tag: 'cancelConctractWithOldText',
        disabled: false
      },
      {
        tagTitle: '原单位是否缴纳社保',
        tag: 'insuredInOld',
        disabled: false
      },
      {
        tagTitle: '原单位是否缴纳公积金',
        tag: 'fundedInOld',
        disabled: false
      }
      ],
      selectTag: [],
      selectTags: [],
      tableTabs: [],
      defaultSelects: {
        '是否与原单位解除劳动关系': 'cancelConctractWithOldText',
        '原单位是否缴纳社保': 'insuredInOld',
        '原单位是否缴纳公积金': 'fundedInOld',
        '参加工作时间': 'takejobDate',
        '本次入职时间': 'entryDate',
        '任职部门': 'orgName',
        '岗位': 'postName'
      },
      userDetails: {}
    }
  },
  components: {
    SearchDeptTree
  },
  computed: {
    selecDynamics () {
      return this.dynamicTags.map(x => ({
        value: x.tag,
        label: x.tagTitle,
        disabled: this.selectTags.indexOf(x.tagTitle) !== -1 || x.disabled
      }))
    },
    updateType () {
      return this.$route.name === 'PersonnalBaseCorrections' ? '2' : '1'
    }
  },
  methods: {
    // 验证必填项
    validateDatas () {
      return new Promise((resolve, reject) => {
        if (this.selectTags.indexOf('参加工作时间') !== -1 && !this.laborForm.takejobDate) {
          resolve('请选择参加工作时间')
        }
        if (this.selectTags.indexOf('本次入职时间') !== -1 && !this.laborForm.entryDate) {
          resolve('请选择本次入职时间')
        }
        if (this.selectTags.indexOf('任职部门') !== -1 && !this.laborForm.orgId) {
          resolve('请选择任职部门')
        }
        if (this.selectTags.indexOf('岗位') !== -1 && !this.laborForm.postName) {
          resolve('岗位')
        }
        if (this.selectTags.indexOf('是否与原单位解除劳动关系') !== -1 && !this.laborForm.newCancelConctractWithOld) {
          resolve('请选择是否与原单位解除劳动关系')
        }
        if (this.selectTags.indexOf('原单位是否缴纳社保') !== -1 && this.laborForm.newInsuredInOld === '') {
          resolve('请选择是否缴纳社保')
        }
        if (this.selectTags.indexOf('原单位是否缴纳社保') !== -1 && this.laborForm.newInsuredInOld && !this.tableTabs.find(x => x.type === 'insuredInOld').newInsuredOldMonth) {
          resolve('请选择社保缴纳月份')
        }
        if (this.selectTags.indexOf('原单位是否缴纳社保') !== -1 && this.laborForm.newInsuredInOld && !this.tableTabs.find(x => x.type === 'insuredInOld').newInsuredOldArea) {
          resolve('请选择社保缴纳地')
        }
        if (this.selectTags.indexOf('原单位是否缴纳公积金') !== -1 && this.laborForm.newFundedInOld === '') {
          resolve('请选择是否缴纳公积金')
        }
        if (this.selectTags.indexOf('原单位是否缴纳公积金') !== -1 && this.laborForm.newFundedInOld && !this.tableTabs.find(x => x.type === 'fundedInOld').newFundedOldMonth) {
          resolve('请选择公积金缴纳月份')
        }
        if (this.selectTags.indexOf('原单位是否缴纳公积金') !== -1 && this.laborForm.newFundedInOld && !this.tableTabs.find(x => x.type === 'fundedInOld').newFundedOldArea) {
          resolve('请选择缴纳公积金缴纳地')
        }
        resolve(false)
      })
    },
    _getRemark (type) {
      return this.tableTabs.find(x => x.type === type) ? this.tableTabs.find(x => x.type === type).remark : ''
    },
    selectChange (orgId, orgName) {
      this.laborForm.orgId = orgId
      this.laborForm.orgName = orgName
    },
    // 计算当前应该提交哪些值和已选择的作比较
    _countParams () {
      const params = []
      if (this.selectTags.indexOf('是否与原单位解除劳动关系') !== -1) {
        params.push({
          userId: this.$route.params.id,
          type: this.updateType,
          tab: '1',
          oldId: this.laborForm.cancelConctractWithOld,
          newValue: this.laborForm.newCancelConctractWithOld,
          newId: this.laborForm.newCancelConctractWithOld,
          changeName: '是否与原单位解除劳动关系',
          oldValue: this.laborForm.cancelConctractWithOld,
          remark: this._getRemark('cancelConctractWithOldText')
        })
      }
      if (this.selectTags.indexOf('原单位是否缴纳社保') !== -1) {
        params.push(
          {
            userId: this.$route.params.id,
            type: this.updateType,
            tab: '1',
            oldId: this.laborForm.oldId,
            newValue: Number(this.laborForm.newInsuredInOld),
            changeName: '原单位是否缴纳社保',
            userEntryInfo: {
              insuredInOld: Number(this.laborForm.newInsuredInOld),
              insuredOldMonth: Number(this.laborForm.newInsuredInOld) ? this.tableTabs.find(x => x.type === 'insuredInOld').newInsuredOldMonth : '',
              insuredOldArea: this.tableTabs.find(x => x.type === 'insuredInOld').newInsuredOldArea
            },
            remark: this._getRemark('insuredInOld')
          }
        )
      }
      if (this.selectTags.indexOf('原单位是否缴纳公积金') !== -1) {
        console.log(2)
        params.push(
          {
            userId: this.$route.params.id,
            type: this.updateType,
            tab: '1',
            oldId: this.laborForm.oldId,
            newValue: Number(this.laborForm.newFundedInOld),
            changeName: '原单位是否缴纳公积金',
            userEntryInfo: {
              fundedInOld: Number(this.laborForm.newFundedInOld),
              fundedOldMonth: Number(this.laborForm.newFundedInOld) ? this.tableTabs.find(x => x.type === 'fundedInOld').newFundedOldMonth : '',
              fundedOldArea: this.tableTabs.find(x => x.type === 'fundedInOld').newFundedOldArea
            },
            remark: this._getRemark('fundedInOld')
          }
        )
      }
      if (this.selectTags.indexOf('参加工作时间') !== -1) {
        params.push(
          {
            userId: this.$route.params.id,
            type: this.updateType,
            tab: '1',
            oldId: this.laborForm.oldId,
            newValue: this.laborForm.takejobDate,
            changeName: '参加工作时间',
            oldValue: this.userDetails.takejobDate,
            remark: this._getRemark('takejobDate')
          })
      }
      if (this.selectTags.indexOf('本次入职时间') !== -1) {
        params.push(
          {
            userId: this.$route.params.id,
            type: this.updateType,
            tab: '1',
            oldId: this.laborForm.oldId,
            newValue: this.laborForm.entryDate,
            changeName: '本次入职时间',
            oldValue: this.userDetails.entryDate,
            remark: this._getRemark('entryDate')
          })
      }
      if (this.selectTags.indexOf('任职部门') !== -1) {
        params.push(
          {
            userId: this.$route.params.id,
            type: this.updateType,
            tab: '1',
            oldValue: this.userDetails.orgName,
            newValue: this.laborForm.orgName,
            changeName: '任职部门',
            oldId: this.userDetails.orgId,
            newId: this.laborForm.orgId,
            // userEntryInfo: {
            //   orgId: this.laborForm.orgId
            // },
            remark: this._getRemark('orgName')
          })
      }
      if (this.selectTags.indexOf('岗位') !== -1) {
        params.push(
          {
            userId: this.$route.params.id,
            type: this.updateType,
            tab: '1',
            oldId: this.laborForm.oldId,
            newValue: this.laborForm.postName,
            changeName: '岗位',
            oldValue: this.userDetails.postName,
            // userEntryInfo: {
            //   postName: this.laborForm.postName
            // },
            remark: this._getRemark('postName')
          })
      }
      return params
    },
    // 提交
    submitUpdate: debounce(function (e) {
      this.$confirm(`确定要提交${getToken('updateName')}的信息${this.updateType === '2' ? '更正' : '更新'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.selectTags.length) return this.$message.warning('请选择要修改的值')
        this.validateDatas().then(res => {
          if (res) {
            this.$message.warning(res)
          } else {
            const userChangeData = this._countParams()
            entryApi.saveUserChange(userChangeData).then(res => {
              this.$message.success(this.updateType === '2' ? '更正申请成功' : '更新成功')
              setTimeout(() => {
                const { id: baseId, status } = this.$route.params
                this.$router.push({
                  name: 'BaseLabor',
                  params: {
                    baseId,
                    status: this.updateType === '2' ? '19' : status
                  },
                  query: {
                    come: this.$route.query.come
                  }
                })
              }, 200)
            })
          }
        })
      }).catch(() => {})
    }, 200),
    handleClose (tag) {
      //  this.selectTags.splice(this.selectTags.indexOf(tag), 1)
      // this.selectTag = this.selectTags.length ? this.selectTags[this.selectTags.length - 1] : ''
      console.log('tag', tag)
      console.log('laborForm', this.laborForm)
      const fiX = this.selectTags.findIndex(x => x === tag)
      const findSx = this.selectTag.findIndex(x => x === this.defaultSelects[tag])
      this.selectTags.splice(fiX, 1)
      this.selectTag.splice(findSx, 1)
      const fIndex = this.tableTabs.findIndex(x => x.field === tag)
      this.tableTabs.splice(fIndex, 1)
      console.log('selectTags', this.selectTags)
    },
    changeTag (tags) {
      const mapTags = this.tableTabs.map(x => x.type)
      if (mapTags.length > tags.length) {
        return false
      } else {
        const tag = tags[tags.length - 1]
        const findTagTitle = this.selecDynamics.find(x => x.value === tag).label
        this.selectTags.push(findTagTitle)
        this._getDifferentType(tag, findTagTitle)
      }
    },
    removeTag (tag) {
      const fiItem = this.dynamicTags.find(x => x.tag === tag).tagTitle
      const fiX = this.selectTags.findIndex(x => x === fiItem)
      this.selectTags.splice(fiX, 1)
      const fIndex = this.tableTabs.findIndex(x => x.field === fiItem)
      this.tableTabs.splice(fIndex, 1)
    },
    // 根据不同的类型处理不同的公积金社保信息
    _getDifferentType (type, title) {
      switch (type) {
        case 'cancelConctractWithOldText' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.laborForm.cancelConctractWithOldText ? this.laborForm.cancelConctractWithOldText : '未填写',
            currentValue: 0,
            remark: ''
          })
          break
        case 'insuredInOld' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.laborForm.insuredInOld === 0 ? '未缴纳' : '已缴纳',
            currentValue: 0,
            insuredOldArea: this.laborForm.insuredOldArea,
            insuredOldMonth: this.laborForm.insuredOldMonth,
            newInsuredOldArea: '',
            newInsuredOldMonth: '',
            remark: ''
          })
          break
        case 'fundedInOld' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.laborForm.fundedInOld === 0 ? '未缴纳' : '已缴纳',
            currentValue: 0,
            fundedOldMonth: this.laborForm.fundedOldMonth,
            fundedOldArea: this.laborForm.fundedOldArea,
            newFundedOldMonth: '',
            newFundedOldArea: '',
            remark: ''
          })
          break
        case 'takejobDate' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.takejobDate,
            currentValue: this.laborForm.takejobDate,
            remark: ''
          })
          break
        case 'entryDate' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.entryDate,
            currentValue: this.laborForm.entryDate,
            remark: ''
          })
          break
        case 'orgName' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.orgName,
            currentValue: this.laborForm.orgId,
            remark: ''
          })
          break
        case 'postName' :
          this.tableTabs.push({
            type,
            field: title,
            originalValue: this.userDetails.postName,
            currentValue: this.laborForm.postName,
            remark: ''
          })
          break
      }
    },
    // 数据字典
    _getQueryList () {
      // 是否与原单位解除劳动合同
      commonApi.getSysDic('cancelConctractWithOld').then((data) => {
        // console.log('是否与原单位解除劳动合同', data.result)
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.cancelConctractWithOldOption.push(item)
            }
          })
        }
      })
    },
    _getUserDetail () {
      entryApi.getUserInfoDetail(this.$route.params.id).then(res => {
        const { id, cancelConctractWithOld, cancelConctractWithOldText, insuredInOld, fundedInOld, insuredOldArea, insuredOldMonth, fundedOldMonth, fundedOldArea, orgId } = res.result
        this.laborForm.oldId = id
        this.laborForm.cancelConctractWithOld = cancelConctractWithOld
        this.laborForm.cancelConctractWithOldText = cancelConctractWithOldText
        this.laborForm.insuredInOld = insuredInOld
        this.laborForm.fundedInOld = fundedInOld
        this.laborForm.insuredOldArea = insuredOldArea
        this.laborForm.insuredOldMonth = insuredOldMonth
        this.laborForm.fundedOldMonth = fundedOldMonth
        this.laborForm.fundedOldArea = fundedOldArea
        this.userDetails = res.result
        this.$router.push({ name: this.$route.name, params: this.$route.params, query: Object.assign({}, this.$route.query, { orgId }) })
      })
    },
    // 更正时获取下拉框
    getUpdateSelects () {
      if (this.updateType === '2') {
        const params = {
          userId: this.$route.params.id,
          type: 'labourPersonnel'
        }
        entryApi.queryChangeNames(params).then(res => {
          this.dynamicTags = res.result.map(item => ({
            tagTitle: item.changeName,
            tag: this.defaultSelects[item.changeName],
            disable: item.check === 1
          }))
        })
      }
    }
  },
  filters: {
    formatDate (date) {
      return date ? dayjs(date).format('YYYY-MM') : '未填写'
    }
  },
  created () {
    this.getUpdateSelects()
    this._getQueryList()
    this._getUserDetail()
  }
}
</script>
<style scoped lang="less">
.base-update-labor{
  position: relative;
  .fix-select{
    position: absolute;
    right:10px;
    top:10px;
    width:300px;
  }
}
</style>

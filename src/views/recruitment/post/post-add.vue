<template>
<div class="container" @click="orgDatas.showTree = false">
  <p class="table-title">中财集团人力资源需求表</p>
  <div class="content-box">
    <el-form
      ref="addPostForm"
      :model="addPostForm"
      :rules="postAddRules"
      label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="需求部门:" prop="orgId">
            <search-dept-tree
            :orgDatas="orgDatas"
            @selectChange="selectChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="需求岗位:" prop="postName">
            <el-input v-model.trim="addPostForm.postName" placeholder="请输入需求岗位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="需求人数:" prop="needNumber">
            <el-input type="number" min ="0" v-model.trim="addPostForm.needNumber" placeholder="请输入需求人数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="form-item-and-type_box clearfix" label="岗位类别:" prop="postType">
            <el-checkbox-group v-model="addPostForm.postType" class="radio-info">
              <el-checkbox
                v-for="item in newPostTypeChecked"
                :label="item.code"
                :key="item.code">{{item.codeText}}
              </el-checkbox>
            </el-checkbox-group>
            <el-input v-show="addPostForm.postType.indexOf('229')!=-1" v-model="addPostForm.postTypeOther" class="input-info fl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="form-item-and-type_box clearfix" label="需求原因:" prop="reasonForDemand">
            <el-radio-group v-model="addPostForm.reasonForDemand" class="radio-info">
              <el-radio
                v-for="item in newReasonForDemandRadio"
                :label="item.code"
                :key="item.code">{{item.codeText}}
              </el-radio>
            </el-radio-group>
            <el-input v-show="addPostForm.reasonForDemand == '243'" v-model.trim="addPostForm.reasonForDemandOther" class="input-info"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="form-item-and-type_box clearfix" label="工作地点:" prop="areaName">
            <el-radio-group v-model="addPostForm.areaName" class="radio-info">
              <el-radio
                v-for="item in newAreaNameRadio"
                :label="item.code"
                :key="item.code">{{item.codeText}}
              </el-radio>
            </el-radio-group>
            <el-input v-show="addPostForm.areaName == '234'" v-model.trim="addPostForm.areaNameOther" class="input-info"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="工资范围:" prop="salaryRange">
            <el-select v-model="addPostForm.salaryRange" placeholder="请选择工资范围" style="width:100%">
              <el-option
                v-for="item in salaryRangeOption"
                :key="item.code"
                :label="item.codeText"
                :disabled="item.disabled"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到岗时间:" prop="arrivalTime">
            <el-select v-model="addPostForm.arrivalTime" placeholder="请选择到岗时间" style="width:100%">
              <el-option
                v-for="item in arrivalTimeOption"
                :key="item.code"
                :label="item.codeText"
                :disabled="item.disabled"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联 络 人:" prop="contactsName">
            <el-input v-model.trim="addPostForm.contactsName" placeholder="请输入沟通联络人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="性  别:" prop="originSex">
            <el-select v-model="addPostForm.originSex"  placeholder="请选择性别" style="width:100%">
              <el-option
                v-for="item in originSexOption"
                :key="item.code"
                :label="item.codeText"
                :value="item.codeText">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="婚  否:" prop="isMarried">
            <el-select v-model="addPostForm.isMarried" placeholder="请选择婚否" style="width:100%">
              <el-option
                v-for="item in isMarriedOption"
                :key="item.code"
                :label="item.codeText"
                :disabled="item.disabled"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学  历:" prop="edu">
            <el-select v-model="addPostForm.edu"  placeholder="请选择学历" style="width:100%">
              <el-option
                v-for="item in demandEduOption"
                :key="item.code"
                :label="item.codeText"
                :disabled="item.disabled"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="年    龄:" prop="age">
            <el-input v-model.trim="addPostForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专    业:" prop="major">
            <el-input v-model.trim="addPostForm.major" placeholder="请输入专业"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工    龄:" prop="workingAge">
            <el-input v-model.trim="addPostForm.workingAge" placeholder="请输入工龄"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="身    高:" prop="height">
            <el-input v-model.trim="addPostForm.height" placeholder="请输入身高"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="形    象:" prop="personImage">
            <el-input  placeholder="请输入形象" v-model.trim="addPostForm.personImage"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外    语:" prop="languageSkill">
            <el-input v-model.trim="addPostForm.languageSkill" placeholder="请输入外语"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工作内容:" prop="postContent">
            <el-input type="textarea" rows="3" v-model.trim="addPostForm.postContent" placeholder="请输入工作内容" class="post-text"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="任职要求:" prop="postRequirements">
            <el-input type="textarea" rows="3" v-model.trim="addPostForm.postRequirements" placeholder="请输入任职要求"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="mt-20" style="margin-bottom: 100px">
      <el-col :span="2" :offset="9"><el-button type="primary" style="width: 100%;" size="small" @click="goBack">返  回</el-button></el-col>
      <el-col :span="2" :offset="1"><el-button type="primary" style="width: 100%;" size="small" @click="addPostSure('addPostForm')">提  交</el-button></el-col>
    </el-row>
  </div>
</div>
</template>
<script>
import SearchDeptTree from 'components/SearchDeptTree'
import { addPost, checkPost } from 'static/api/recruit/post/post'
import { getToken } from 'assets/js/util'
import { getSysDic } from 'static/api/common/common'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      isEdit: this.$route.query.edit ? '1' : '',
      detailData: {},
      disabled: false,
      /* 单选树 */
      orgDatas: {
        filterName: '',
        orgId: '',
        dataTree: [],
        showTree: false,
        disabled: true
      },
      addPostForm: {
        orgId: '',
        postName: '',
        needNumber: '',
        salaryRange: '',
        arrivalTime: '',
        contactsName: '',
        originSex: '',
        edu: '',
        age: '',
        major: '',
        personImage: '',
        isMarried: '',
        height: '',
        workingAge: '',
        languageSkill: '',
        postContent: '',
        postRequirements: '',
        postType: [],
        areaName: '',
        reasonForDemand: '',
        reasonForDemandOther: '',
        areaNameOther: ''
      },
      /* 性别 */
      originSexOption: [
        { code: '不限制', codeText: '不限制' },
        { code: '男', codeText: '男' },
        { code: '女', codeText: '女' }
      ],
      /* 岗位类别 */
      newPostTypeChecked: [],
      filterPostTypeChecked: [],
      /* 需求原因 */
      newReasonForDemandRadio: [],
      filterReasonForDemandRadio: [],
      /* 工作地点 */
      newAreaNameRadio: [],
      filterAreaNameRadio: [],
      /* 工资范围 */
      salaryRangeOption: [],
      filtersalaryRangeOption: [],
      /* 到岗时间 */
      arrivalTimeOption: [],
      filterArrivalTimeOption: [],
      /* 婚否 */
      isMarriedOption: [],
      filterIsMarriedOption: [],
      /* 学历 */
      demandEduOption: [],
      filterEmandEduOption: [],
      postAddRules: {
        orgId: {
          required: true, message: '请选择需求部门', trigger: 'change'
        },
        postName: {
          required: true, message: '请填写需求岗位', trigger: 'blur'
        },
        needNumber: {
          required: true, message: '请填写需求人数', trigger: 'blur'
        },
        postType: {
          required: true, message: '请选择岗位类别', trigger: 'change'
        },
        reasonForDemand: {
          required: true, message: '请选择需求原因', trigger: 'change'
        },
        areaName: {
          required: true, message: '请选择工作地址', trigger: 'change'
        },
        salaryRange: {
          required: true, message: '请选择工资范围', trigger: 'change'
        },
        arrivalTime: {
          required: true, message: '请选择到岗时间', trigger: 'change'
        },
        contactsName: {
          required: true, message: '请填写联络人', trigger: 'blur'
        },
        originSex: {
          required: true, message: '请选择性别', trigger: 'change'
        },
        isMarried: {
          required: true, message: '请选择婚否', trigger: 'change'
        },
        edu: {
          required: true, message: '请选择学历', trigger: 'change'
        },
        age: {
          required: true, message: '请填写年龄', trigger: 'blur'
        },
        major: {
          required: true, message: '请填写专业', trigger: 'blur'
        },
        workingAge: {
          required: true, message: '请填写工龄', trigger: 'blur'
        },
        height: {
          required: true, message: '请填写身高', trigger: 'blur'
        },
        personImage: {
          required: true, message: '请填写形象', trigger: 'blur'
        },
        languageSkill: {
          required: true, message: '请填写外语', trigger: 'blur'
        },
        postContent: {
          required: true, message: '请填写工作内容', trigger: 'blur'
        },
        postRequirements: {
          required: true, message: '请填写任职要求', trigger: 'blur'
        }
      }
    }
  },
  components: {
    SearchDeptTree
  },
  watch: {
    'orgDatas.orgId': function () {
      if (this.orgDatas.orgId) {
        this.addPostForm.orgId = this.orgDatas.orgId
      }
    }
  },
  methods: {
    /* 获取数字字典 */
    async _getQueryClassList () {
      /* 岗位类别 */
      await getSysDic('postType').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.newPostTypeChecked.push(item)
              this.filterPostTypeChecked.push(item.code)
            }
          })
        }
      })
      /* 需求原因 */
      await getSysDic('reasonForDemand').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.newReasonForDemandRadio.push(item)
              this.filterReasonForDemandRadio.push(item.code)
            }
          })
        }
      })
      /* 工作地点 */
      await getSysDic('areaName').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.newAreaNameRadio.push(item)
              this.filterAreaNameRadio.push(item.code)
            }
          })
        }
      })
      /* 工资范围 */
      await getSysDic('salaryRange').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.salaryRangeOption.push(item)
              this.filtersalaryRangeOption.push(item.code)
            }
          })
        }
      })
      /* 到岗时间 */
      await getSysDic('arrivalTime').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.arrivalTimeOption.push(item)
              this.filterArrivalTimeOption.push(item.code)
            }
          })
        }
      })
      /* 婚否 */
      await getSysDic('isMarried').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.isMarriedOption.push(item)
              this.filterIsMarriedOption.push(item.code)
            }
          })
        }
      })
      /* 学历 */
      await getSysDic('demandEdu').then((data) => {
        if (data.result) {
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.demandEduOption.push(item)
              this.filterEmandEduOption.push(item.code)
            }
          })
        }
      })
      if (this.isEdit !== '') {
        this.getCheckPostDetail()
      }
    },
    getCheckPostDetail () {
      checkPost(this.$route.query.postId).then(res => {
        this.detailData = res.result
        // this.addPostForm.orgId = this.detailData.orgId
        this.orgDatas.orgId = this.detailData.orgId
        this.orgDatas.filterName = this.detailData.orgName
        this.addPostForm.postName = this.detailData.postName
        this.addPostForm.needNumber = this.detailData.needNumber
        let tryPostType = this.filterPostTypeChecked.join(',')
        let arrPostType = this.detailData.postTypeId.split(',')
        let arr = []
        arrPostType.forEach(res => {
          if (tryPostType.indexOf(res) !== -1) {
            arr.push(res)
          }
        })
        this.addPostForm.postType = arr
        this.addPostForm.postTypeOther = this.addPostForm.postType.indexOf('229') !== -1 ? this.detailData.postTypeOther : ''
        let tryReasonForDemand = this.filterReasonForDemandRadio.join(',')
        if (tryReasonForDemand.indexOf(this.detailData.reasonForDemandId) !== -1) {
          this.addPostForm.reasonForDemand = this.detailData.reasonForDemandId
        }
        this.addPostForm.reasonForDemandOther = this.addPostForm.reasonForDemand === '243' ? this.detailData.reasonForDemandOther : ''
        let tryAreaName = this.filterAreaNameRadio.join(',')
        if (tryAreaName.indexOf(this.detailData.areaNameId) !== -1) {
          this.addPostForm.areaName = this.detailData.areaNameId
        }
        this.addPostForm.areaNameOther = this.addPostForm.areaName === '234' ? this.detailData.areaNameOther : ''
        let trySalaryRange = this.filtersalaryRangeOption.join(',')
        if (trySalaryRange.indexOf(this.detailData.salaryRangeId) !== -1) {
          console.log('123')
          this.addPostForm.salaryRange = this.detailData.salaryRangeId
        }
        let tryArrivalTime = this.filterArrivalTimeOption.join(',')
        if (tryArrivalTime.indexOf(this.detailData.arrivalTimeId) !== -1) {
          this.addPostForm.arrivalTime = this.detailData.arrivalTimeId
        }
        this.addPostForm.contactsName = this.detailData.contactsName
        this.addPostForm.originSex = this.detailData.sex
        let tryIsMarried = this.filterIsMarriedOption.join(',')
        if (tryIsMarried.indexOf(this.detailData.isMarriedId) !== -1) {
          this.addPostForm.isMarried = this.detailData.isMarriedId
        }
        let tryEdu = this.filterEmandEduOption.join(',')
        if (tryEdu.indexOf(this.detailData.eduId) !== -1) {
          this.addPostForm.edu = this.detailData.eduId
        }
        this.addPostForm.age = this.detailData.age
        this.addPostForm.major = this.detailData.major
        this.addPostForm.workingAge = this.detailData.workingAge
        this.addPostForm.height = this.detailData.height
        this.addPostForm.personImage = this.detailData.personImage
        this.addPostForm.languageSkill = this.detailData.languageSkill
        this.addPostForm.postContent = this.detailData.postContent
        this.addPostForm.postRequirements = this.detailData.postRequirements
      })
    },
    goBack () {
      this.$router.push('/recruitment/post')
    },
    selectChange (orgId) {
      this.addPostForm.orgId = orgId
    },
    /* 保存 */
    addPostSure: debounce(function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let addPostParams = {
            userId: getToken('loginId'),
            userName: getToken('loginName'),
            status: 2,
            orgName: this.orgDatas.filterName,
            orgId: this.orgDatas.orgId,
            postName: this.addPostForm.postName,
            needNumber: this.addPostForm.needNumber,
            postType: (this.addPostForm.postType).join(','),
            areaName: this.addPostForm.areaName,
            reasonForDemand: this.addPostForm.reasonForDemand,
            postTypeOther: this.addPostForm.postTypeOther,
            reasonForDemandOther: this.addPostForm.reasonForDemandOther,
            areaNameOther: this.addPostForm.areaNameOther,
            salaryRange: this.addPostForm.salaryRange,
            arrivalTime: this.addPostForm.arrivalTime,
            contactsName: this.addPostForm.contactsName,
            sex: this.addPostForm.originSex,
            edu: this.addPostForm.edu,
            isMarried: this.addPostForm.isMarried,
            age: this.addPostForm.age,
            personImage: this.addPostForm.personImage,
            major: this.addPostForm.major,
            height: this.addPostForm.height,
            workingAge: this.addPostForm.workingAge,
            languageSkill: this.addPostForm.languageSkill,
            postContent: this.addPostForm.postContent,
            postRequirements: this.addPostForm.postRequirements
          }
          addPost(addPostParams).then((data) => {
            this.$message.success('保存成功')
            setTimeout(() => {
              this.$router.replace('/recruitment/post')
            }, 500)
          })
        }
      })
    }, 500)
  },
  created () {
    this._getQueryClassList()
    this.$store.commit('SET_SINGLE_CHECKED_ORGID', '')
    this.$store.commit('SET_SINGLE_TREE_CHECKED_NAME', '')
  }
}
</script>
<style scoped lang="less">
.form-item-and-type_box{
  .radio-info{
    float:left;
  }
  .el-radio-group{
    float:left;
    margin-top:15px;
  }
  .input-info{
    float:left;
    width:220px;
    margin-left:20px;
  }
}
</style>

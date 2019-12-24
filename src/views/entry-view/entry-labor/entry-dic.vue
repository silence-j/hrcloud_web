<template>
<div class="dic-box">
  <div class="mean-title">需提供材料</div>
    <el-checkbox-group v-model="userEntryInfoExtraList">
      <dl class="check-dl clearfix mt-15">
        <dd  v-for="(item,index) in allDicOptions" :key="index">
          <el-checkbox
            :key="index" name="userEntryInfoExtraList"
            :label="item.dictId"
            :disabled="item.disabled"
            @change="getDicId(item, $event)">
            {{item.dictName}}
          </el-checkbox>
        </dd>
      </dl>
    </el-checkbox-group>
    <div class="mt-20 tag-box">
      <div class="mean-title">已提供材料</div>
      <el-checkbox-group
        class="mt-20"
        v-model="userEntryInfoExtraList2">
        <el-tag
          v-for="(item,index) in userOtherEntryInfoExtraList"
          :key="index"
          class="el-tag-check">
          <el-checkbox
            :disabled="item.disabled"
            name="userEntryInfoExtraList2"
            :label="item.dictId">{{item.dictName}}
            <i :class="item.disabled?'':'el-icon-close'" @click.stop="delDic(item)"></i></el-checkbox>
        </el-tag>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import { getSysDic, checkMaterial, checkLinkMaterial } from 'static/api/common/common'
import { getToken } from 'assets/js/util'
import { delEntryMaterial, delLinkEntryMaterial } from 'static/api/recruit/entry/entry'
export default {
  data () {
    return {
      newAllDicArr: [],
      allDicOptions: [],
      userOtherEntryInfoExtraList: [],
      userEntryInfoExtraList: [],
      userEntryInfoExtraList2: []
    }
  },
  methods: {
    // 获取所有的材料附件
    _getAllDic () {
      this.newAllDicArr = []
      getSysDic('ENTRYINFOTYPE').then(data => {
        if (data.result) {
          /* 需提供 */
          this.newAllDicArr = []
          data.result.forEach(item => {
            if (item.enable === 1) {
              this.newAllDicArr.push({
                id: '',
                dictId: Number(item.id),
                dictName: item.codeText,
                disabled: false,
                enable: item.enable
              })
            }
          })
        }
      })
    },
    // 删除
    delDic (item) {
      let itemId = item.id
      const copyToken = this.$route.query.copyToken
      if (itemId) {
        let delParams = {
          id: item.id,
          operator: getToken('loginId').toString(),
          userId: item.userId
        }
        if (!copyToken) {
          delEntryMaterial(delParams).then(data => {
            setTimeout(() => {
              this._getAllDic()
              this._getPersonalMaterial()
            }, 200)
          })
        } else {
          delLinkEntryMaterial(Object.assign({}, delParams, { copyToken })).then(data => {
            setTimeout(() => {
              this._getAllDic()
              this._getPersonalMaterial()
            }, 200)
          })
        }
      } else {
        let dictId = item.dictId
        this.userOtherEntryInfoExtraList.forEach(item => {
          if (item.dictId === dictId) {
            this.userOtherEntryInfoExtraList.splice(this.userOtherEntryInfoExtraList.indexOf(item), 1)
          }
        })
        this.userEntryInfoExtraList.forEach(arr => {
          if (arr === dictId) {
            this.userEntryInfoExtraList.splice(this.userEntryInfoExtraList.indexOf(arr), 1)
          }
        })
        let newAllDicArr = this.allDicOptions
        let emtpArr = []
        newAllDicArr.forEach(item => {
          if (item.dictId === dictId) {
            item.disabled = false
          }
          emtpArr.push(item)
        })
        this.allDicOptions = emtpArr
      }
    },
    getDicId (item, event) {
      if (this.userEntryInfoExtraList.indexOf(item.dictId) !== -1) {
        this.userOtherEntryInfoExtraList.push(Object.assign({}, item, { enable: 1 }))
        item.disabled = true
      }
    },
    handleMaterialResult (data) {
      if (data.result) {
        // console.log('已提供1', data.result)
        // console.log('需提供', this.newAllDicArr)
        let newDicIds = this.newAllDicArr.map(item => item.dicId)
        this.userOtherEntryInfoExtraList = []
        this.userEntryInfoExtraList = []
        this.userEntryInfoExtraList2 = []
        this.allDicOptions = []
        data.result.forEach(item => {
          if (newDicIds.indexOf(item.dicId) === -1 || item.enable === 2) {
            this.newAllDicArr.push({
              id: item.id,
              dictId: item.dictId,
              dictName: item.dictName,
              enable: item.enable,
              disabled: true
            })
          }
          this.userEntryInfoExtraList.push(item.dictId)
          if (item.status === 1) {
            this.userEntryInfoExtraList2.push(item.dictId)
          }
          this.userOtherEntryInfoExtraList.push({
            id: item.id,
            dictId: item.dictId,
            dictName: item.dictName,
            userId: item.userId,
            enable: item.enable,
            disabled: item.enable === 2
          })
        })
        this.newAllDicArr.forEach(item => {
          if (this.userEntryInfoExtraList.indexOf(item.dictId) !== -1) {
            this.allDicOptions.push({
              dictId: item.dictId,
              id: item.id,
              dictName: item.dictName,
              userId: item.userId,
              disabled: true
            })
          } else {
            this.allDicOptions.push({
              dictId: item.dictId,
              id: item.id,
              dictName: item.dictName,
              disabled: false,
              userId: item.userId
            })
          }
        })
      } else {
        this.allDicOptions = this.newAllDicArr
      }
    },
    // 获取个人材料附件
    _getPersonalMaterial () {
      const copyToken = this.$route.query.copyToken
      if (!copyToken) {
        if (this.employeeId) {
          checkMaterial(this.employeeId).then(data => {
            setTimeout(() => {
              this.handleMaterialResult(data)
            }, 500)
          })
        } else {
          setTimeout(() => {
            this.allDicOptions = this.newAllDicArr
          }, 500)
        }
      } else {
        checkLinkMaterial({
          copyToken,
          userId: this.$store.state.entryDetailId
        }).then(data => {
          setTimeout(() => {
            this.handleMaterialResult(data)
          }, 500)
        })
      }
    },
    getExtraList () {
      let extraList = {
        userOtherEntryInfoExtraList: this.userOtherEntryInfoExtraList,
        userEntryInfoExtraList2: this.userEntryInfoExtraList2
      }
      return extraList
    }
  },
  computed: {
    employeeId () {
      return this.$route.query.employeeId
    }
  },
  created () {
    this._getAllDic()
    setTimeout(() => {
      this._getPersonalMaterial()
    }, 1000)
  }
}
</script>
<style lang="less" scoped>
.check-dl{
  dd{
    float:left;
    margin:5px 20px;
  }
}
.tag-box{
   &/deep/.el-tag{
     margin-right:20px;
   }
}
</style>

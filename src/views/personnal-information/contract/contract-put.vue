<template>
  <div class="put-box">
    <el-button type="primary" size="mini" @click="goback()" style="margin:20px 10px;">返 回</el-button>
    <el-button type="primary" size="mini" @click="printContent()" style="margin:20px 10px;">打 印</el-button>
    <div id="print" style="padding:30px 50px 50px 50px;">
      <br/>
      <p style="text-align:center;font-size:20px">解除劳动关系证明</p>
      <br/>
      <br/>
      <div style="font-size:16px;line-height:40px;text-indent:2em;font-weight:100;">
        兹证明{{personDetail.name}}同志，身份证号：{{personDetail.idNo}}，于{{personDetail.entryDate}}加入我司，担任{{personDetail.postName}}一职，现因个人原因自愿与本单位解除劳动关系，劳动关系截止至{{cancelTimeData}}。
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <p style="font-size:16px;text-align:right">{{this.$route.params.contractSub}}</p>
      <br/>
      <br/>
      <p style="font-size:16px;text-align:right">{{cancelTimeData}}</p>
      <br/>
      <br/>
      <br/>
    </div>
  </div>
</template>
<script>
import { getContractUser } from 'static/api/contract/contract'
export default {
  data () {
    return {
      time: '',
      personDetail: '',
      cancelTimeData: ''
    }
  },
  methods: {
    goback () {
      window.history.go(-1)
    },
    printContent () {
      let subOutputRankPrint = document.getElementById('print')
      /* console.log(subOutputRankPrint.innerHTML) */
      let newContent = subOutputRankPrint.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    },
    _getTime () {
      let date = new Date()
      if ((date.getMonth() + 1) < 10) {
        this.month = '0' + (date.getMonth() + 1)
      } else {
        this.month = date.getMonth() + 1
      }
      if (date.getDate() < 10) {
        this.day = '0' + (date.getDate())
      } else {
        this.day = date.getDate()
      }
      this.time = date.getFullYear() + '年' + this.month + '月' + this.day + '日'
      getContractUser(this.$route.params.userId).then(data => {
        this.personDetail = data.result
        this.personDetail.entryDate = (this.personDetail.entryDate).substr(0, 4) + '年' + (this.personDetail.entryDate).substr(5, 2) + '月' + (this.personDetail.entryDate).substr(8, 2) + '日'
        this.cancelTimeData = (this.$route.params.cancelTime).substr(0, 4) + '年' + (this.$route.params.cancelTime).substr(5, 2) + '月' + (this.$route.params.cancelTime).substr(8, 2) + '日'
      })
    }
  },
  created () {
    this._getTime()
  }
}
</script>

<style scoped lang="less">
.put-box{
    border:1px solid #ccc;
    width:800px;
    height:700px;
    margin:30px auto;
}
</style>

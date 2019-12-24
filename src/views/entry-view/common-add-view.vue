<template>
<div class="entry-review_box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人档案" name="second">
        <entry-person ref="entryPerson"/>
      </el-tab-pane>
    <el-tab-pane label="劳动人事信息" name="first">
      <entry-labor ref="entryLabor" bindData="bindData" />
    </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import EntryLabor from './entry-labor'
import EntryPerson from './entry-person'
export default {
  props: {
    bindData: {
      type: String
    }
  },
  data () {
    return {
      activeName: 'second'
    }
  },
  components: {
    EntryLabor,
    EntryPerson
  },
  methods: {
    handleClick (tab) {
      // console.log(tab)
    },
    entryLaborVaildate () {
      return this.$refs.entryLabor.commonLaborVaildata()
    },
    entryPersonVaildate () {
      return this.$refs.entryPerson.commonPersonVaildata()
    },
    entrySalaryVaildata () {
      return this.$refs.entryLabor.vaildEntrySalary()
    },
    commonEntryVaildate () {
      return this.entryLaborVaildate() && this.entryPersonVaildate()
    },
    entryPersonData () {
      return this.$refs.entryPerson.getAllDatas()
    },
    entryLaborData () {
      return this.$refs.entryLabor.getEntryLaborData()
    }
  }
}
</script>

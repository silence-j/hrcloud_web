<template>
    <div>
      <el-dialog width="740px" @close="showTable = false;$emit('close')" :title="form.type" class="work-table" :visible.sync="showTable">
        <!--工资卡信息-->
        <div v-if="form.type === '工资卡信息'">
          <el-form v-if="form.person.length > 0">
            <el-row v-for="(item, index) in form.person" :key="index">
              <el-col :span="20">
                <el-form-item :label="item.name+ ':'">
                  <span>{{item.type + '' === '1' ? item.oldValue : item.newValue}}
                  <span v-if="!item.isUpdate">{{item.type + '' === '1' ? '(不修改)' : '(未修改)'}}</span></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span v-else="">暂无信息</span>
        </div>
        <!--学历信息-->
        <div v-if="form.type === '学历信息'">
          <el-form v-if="form.person.length > 0">
            <el-row>
              <el-col v-for="(item, index) in form.person" :key="index" :span="12">
                <el-form-item :label="item.name + ':'">{{item.type + '' === '1' ? item.oldValue : item.newValue}}
                <span v-if="!item.isUpdate">{{item.type + '' === '1' ? '(不修改)' : '(未修改)'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span v-else="">暂无信息</span>
        </div>
        <!--健康状态-->
        <div v-if="form.type === '健康状况'">
          <el-form v-if="form.person.length > 0" >
            <el-form-item v-for="(item, index) in form.person" :key="index" :label="item.codeText">
              <span v-if="item.status === 1">有</span>
              <span v-if="item.status === 0">无</span>
              <span style="margin-left: 8px;">{{item.text}}</span>
            </el-form-item>
          </el-form>
          <span v-else>暂无数据</span>
        </div>
        <!--家庭成员-->
        <div v-if="form.type === '家庭成员信息'">
          <el-table :data="form.person" width="1200">
            <el-table-column width="60" type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名" text-light="center"></el-table-column>
            <el-table-column prop="relation" label="称呼" ></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="workUnit" label="工作单位"></el-table-column>
            <el-table-column prop="post" label="职务"></el-table-column>
            <el-table-column width="160" prop="telephone" label="联系电话"></el-table-column>
          </el-table>
        </div>
        <!--学习简历-->
        <el-table :data="form.person" width="1200" v-if="form.type === '学习简历'">
          <el-table-column width="60" type="index" label="序号"></el-table-column>
          <el-table-column prop="startDate" label="开始年月" text-light="center"></el-table-column>
          <el-table-column prop="endDate" label="结束年月" ></el-table-column>
          <el-table-column prop="school" label="学校"></el-table-column>
          <el-table-column prop="major" label="专业"></el-table-column>
          <el-table-column prop="educationText" label="学历"></el-table-column>
        </el-table>
        <!--工作简历-->
        <div v-if="form.type === '工作简历'">
          <el-form label-width="150px">
            <el-form-item required label=" 是否在中财工作过">
              <el-radio-group
                disabled
                v-model="form.isIn">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-table :data="form.person" width="1200">
            <el-table-column width="60" type="index" label="序号"></el-table-column>
            <el-table-column prop="startDate" label="开始年月" text-light="center"></el-table-column>
            <el-table-column prop="endDate" label="结束年月" ></el-table-column>
            <el-table-column prop="workUnit" label="工作单位"></el-table-column>
            <el-table-column prop="post" label="岗位"></el-table-column>
            <el-table-column prop="certifier" label="证明人"></el-table-column>
            <el-table-column width="160" prop="telephone" label="证明人电话"></el-table-column>
          </el-table>
        </div>
        <p style="text-align: center;margin-top: 15px">
          <el-button @click="showTable = false;$emit('close')">关闭</el-button>
        </p>
      </el-dialog>
    </div>
</template>

<script>
export default {
  props: ['form'],
  data () {
    return {
      showTable: true
    }
  },
  mounted () {
    console.log('form:', this.form, this.form.isIn)
  }
}
</script>

<style scoped>

</style>

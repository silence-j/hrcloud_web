<template>
  <div style="position: relative">
    <div style="height: 30px"></div>
    <div class="tab-wrap mt-20">
      <ul class="edit-tab clearfix">
        <li>
          <router-link to="/personnel-information/changeData/updates">更新</router-link>
        </li>
        <li >
          <router-link to="/personnel-information/changeData/incorrect">更正</router-link>
        </li>
      </ul>
    </div>
    <div class="router-view_box mt-20">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>

<template>
  <el-form
    :model="userInfo"
    ref="loginRef"
    class="p-login"
    style="width: 300px"
  >
    <el-form-item label="角色">
      <el-select v-model="userInfo.username" placeholder="选择登陆">
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="普通用户" value="commonUser"></el-option>
      </el-select>
      <div>(选择不同角色来展示不同路由)</div>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="userInfo.password"
        placeholder="随便输，无所谓"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const userInfo = ref({
  username: "admin",
  password: "123"
})

const router = useRouter()
const store = useStore()
const onSubmit = () => {
  if (!userInfo.value.username) {
    alert("请先选择角色！")
    return false
  }
  store.dispatch("login", userInfo.value).then(() => {
    console.log("登陆跳转")
    router.push({ path: "/home" })
  })
}
</script>
<style lang="scss" scoped>
.p-login {
  margin: 0 auto;
}
</style>

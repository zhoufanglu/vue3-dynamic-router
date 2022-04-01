<template>
  <div class="p-name">所有人可见</div>
  <el-button @click="goChild">查看子路由</el-button>
  <router-view></router-view>
</template>
<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const goChild = () => {
  router.push("/allSeePage/allSeePageChild")
}
</script>
<style lang="scss" scoped>
.p-name {
}
</style>

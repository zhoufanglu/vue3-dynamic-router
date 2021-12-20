<template>
  <div class="home">
    <el-button @click="layout">注销</el-button>
    登陆用户名：{{store.state.userInfo.username}}
    <div class="main">
      <div class="p-side-bar">
        <el-menu :default-active="$route.path" :router="true">
          <el-menu-item
            :index="menu.path"
            v-for="menu in menuList"
            :key="menu.name"
          >
            <span>{{ menu.name }}标题</span>
          </el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import {useStore} from 'vuex'

const router = useRouter()
const store = useStore()

const menuList = ref([])

//初始化路由
const initMenu = () => {
  const routerList = router.getRoutes()
  menuList.value = routerList.filter((route) => {
    console.log(34, route.meta)
    const isSidebar = route.meta.isSideBar ? route.meta.isSideBar : 0
    if (isSidebar) {
      return route
    }
  })
  //menuList.value = routerList
  console.log(32, routerList)
}
initMenu()
//注销
const layout = () => {
  store.dispatch('logout')
  router.push({ path: "/login" })
}
</script>

<style lang="scss" scoped>
.home {
  .main {
    display: flex;
    align-items: center;

    .p-side-bar {
      border: solid 1px red;
      width: 200px;
    }
  }
}
</style>

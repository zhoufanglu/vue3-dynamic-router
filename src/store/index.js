import { createStore } from "vuex"

//页面刷新不丢失插件
import createPersistedState from "vuex-persistedstate"

import { authRouter, router } from "../router"

import { filterAsyncRouter } from "../utils"

export default createStore({
  state: {
    userInfo: {
      username: "",
      password: "",
      token: "",
      routerList: []
    }
  },
  mutations: {
    SET_USER_INFO(state, val) {
      state.userInfo = val
    },
    // eslint-disable-next-line no-unused-vars
    ADD_ROUTE(state) {
      console.log("路由添加前", router.getRoutes())
      //路由未添加之前是3个,我们判断是否添加过，没添加过就添加
      if (router.getRoutes().length === 3) {
        let addRouterList = filterAsyncRouter(
          JSON.parse(JSON.stringify(state.userInfo.routerList)) //这里深拷贝下，不然会出问题
        )
        addRouterList.forEach((i) => {
          console.log("添加路由", i)
          router.addRoute("home", i)
        })
      }
      console.log("路由添加后", router.getRoutes())
    }
  },
  actions: {
    //登陆
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve) => {
        //模拟登陆，获取用户信息， 权限路由列表
        //假设返回的有token, 路由列表(根据不同用户返回不同)
        /**********************模拟后端传过来的路由列表----S***********************/
        let routerList = []
        if (username === "admin") {
          routerList = authRouter
        } else if (username === "commonUser") {
          routerList = [authRouter[0]]
        }
        /**********************模拟后端传过来的路由列表----E***********************/
        let token = "testToken"
        console.log(56, routerList)
        //把用户信息存入vuex
        commit("SET_USER_INFO", {
          username,
          password,
          token,
          routerList
        })
        console.log("login over")
        //添加路由
        //commit("ADD_ROUTE")
        resolve()
      })
    },
    //添加路由
    addRoute({ commit }) {
      commit("ADD_ROUTE")
    },
    //注销
    logout({ commit, state }) {
      return new Promise((resolve) => {
        console.log(state.userInfo.token, "注销了")
        //拷贝一下
        const delRouterList = JSON.parse(
          JSON.stringify(state.userInfo.routerList)
        )
        delRouterList.forEach((route) => {
          router.removeRoute(route.name)
        })
        //删除路由
        commit("SET_USER_INFO", {
          userName: "",
          password: "",
          token: "",
          routerList: []
        })
        resolve("注销 success， 清空路由，用户信息")
      })
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})

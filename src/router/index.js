import { createRouter, createWebHashHistory } from "vue-router"
const Login = () => import("../views/Login")
const Home = () => import("../views/Home")
const nullPage = () => import("../views/404")

//模拟权限路由
export const authRouter = [
  {
    path: "/allSeePage",
    name: "所有人可见",
    component: "allSeePage",
    meta: {
      isSideBar: 1
    },
    children: [
      {
        path: "/allSeePage/allSeePageChild",
        name: "allSeePageChild",
        component: "allSeePageChild/allSeePageChild",
        mata: {
          isSideBar: 1
        }
      }
    ]
  },
  {
    path: "/adminPage",
    name: "管理员可见",
    component: "adminPage",
    meta: {
      isSideBar: 1
    }
  }
]

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/404",
    name: "404",
    component: nullPage
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

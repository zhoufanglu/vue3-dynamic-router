import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./router"
import store from "./store"

//element
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

//路由钩子权限
import "@/permission.js"

createApp(App).use(store).use(router).use(ElementPlus).mount("#app")

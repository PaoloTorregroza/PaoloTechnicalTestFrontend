import Vue from 'vue'
import App from './App.vue'
import {store} from "./store"
import router from "./router"
import BootstrapVue, {BootstrapVueIcons} from "bootstrap-vue"

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.prototype.$apiUrl = 'http://localhost:9000/api'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

/*
 * @Description:
 * @Version: 1.00
 * @Autor: songTeng
 * @Date: 2021-08-24 14:11:18
 * @LastEditors: songTeng
 * @LastEditTime: 2021-09-06 14:46:55
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

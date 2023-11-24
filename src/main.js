import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MathJax from './utils/MathJax'
Vue.prototype.MathJax = MathJax;

Vue.config.productionTip = false
Vue.use(ElementUI)
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

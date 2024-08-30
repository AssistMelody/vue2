import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'

Vue.use(VueCompositionAPI)
Vue.use(ElementUI)
Vue.use(VueI18n)
const messages = {
  en: {
    message: {
      hello: 'hello world',
      123: '告警错误'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界,{0}',
      123: 'error'
    }
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'ja', // 设置地区
  messages // 设置地区信息
})

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')

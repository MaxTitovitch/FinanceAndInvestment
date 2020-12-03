import Vue from 'vue'
import VueRouter from "vue-router"
import App from './components/Layoyt/App.vue'
import routes from './routes'
import store from './storage/index'
import vueHeadful from 'vue-headful';
import 'normalize.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      binding.value(evt, el)
      // if (binding.value(evt, el)) {
      //   window.removeEventListener('scroll', f)
      // }
    }
    window.addEventListener('scroll', f)
  }
})

Vue.component('vue-headful', vueHeadful);
Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

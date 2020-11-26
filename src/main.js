import Vue from 'vue'
import VueRouter from "vue-router"
import App from './App.vue'
import routes from './routes'
import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);
Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

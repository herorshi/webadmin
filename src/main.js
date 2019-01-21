import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import VueSweetalert2 from 'vue-sweetalert2';
import axios from 'axios'
import VueAxios from 'vue-axios'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
Vue.use(VueAxios, axios);
window.axios = axios;
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.use(VueSweetalert2);
Vue.use(Datetime)
Vue.config.productionTip = false

new Vue({
  data: {
    foo: 1,
    name:"metasit",
    surname:"panupijarn",
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  },
  router,
  store,
  render: h => h(App),

}).$mount('#app')

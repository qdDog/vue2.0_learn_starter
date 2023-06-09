// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import fastclick from "fastclick";
import ElementUI from "element-ui";
import store from "./store";

import "element-ui/lib/theme-chalk/index.css";
import "common/stylus/index.styl";

Vue.use(ElementUI);

fastclick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>",
});

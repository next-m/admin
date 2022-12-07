import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VModal from "vue-js-modal";
import "@/plugins/Dayjs";
import { formatDate } from '@/utils/filters';

Vue.use(VModal);
Vue.use(require("vue-moment"));
Vue.filter('formatDate', formatDate);
Vue.config.productionTip = false;

//video
import VideoPlayer from "vue-video-player";
import VueClipboard from "vue-clipboard2";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
const hls = require("videojs-contrib-hls");
Vue.use(VideoPlayer);
Vue.use(hls);
Vue.use(VueClipboard);
new Vue({
  router,
  store,
  vuetify,
  VModal,
  render: (h) => h(App),
}).$mount("#app");

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vant/lib/index.less'
import './assets/css/reset.css'
import VueCookies from 'vue-cookies'
import {List} from 'vant'
import { Uploader } from 'vant'
import { Calendar } from 'vant'
import { Icon } from 'vant'
import { Collapse, CollapseItem } from 'vant'
import { RadioGroup, Radio } from 'vant'
import { Checkbox, CheckboxGroup } from 'vant'
import { Picker } from 'vant'
import {Popup} from 'vant'
import VueClipboard from 'vue-clipboard2'
import { Tab, Tabs } from 'vant';
import { Overlay } from 'vant';
import { Lazyload } from 'vant';
import { Popover } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(VueCookies)
Vue.use(Popover);
Vue.use(Lazyload);
Vue.use(Overlay);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(VueClipboard)
Vue.use(VueAxios, axios)
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Icon);
Vue.use(List)
Vue.use(Uploader)
Vue.use(Calendar)
Vue.config.productionTip = false
axios.defaults.baseURL = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

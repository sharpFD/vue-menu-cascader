import VueMenuCascader from './src/components/SubCascader/VueMenuCascader'
import _Vue from 'vue'

VueMenuCascader.install = Vue => {
  if (!Vue) {
    window.Vue = Vue = _Vue
  }
  Vue.component(VueMenuCascader.name, VueMenuCascader)
}
export default VueMenuCascader;

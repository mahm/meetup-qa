import Vue from 'vue'
import Vuex from 'vuex'
import layout from './modules/layout'
import auth from './modules/auth'
import groups from './modules/groups'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug

const createStore = () => {
  return new Vuex.Store({
    modules: { layout, auth, groups },
    strict: false,
    plugins: debug ? [createLogger()] : []
  })
}
export default createStore

import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: "#4DB6AC",
    secondary: "#B2DFDB",
    accent: "#FF5252",
    error: "#FF8A80",
    warning: "#FBC02D",
    info: "#0288D1",
    success: "#66BB6A"
  }
})

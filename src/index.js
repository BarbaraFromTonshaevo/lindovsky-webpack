// SCSS
import './assets/scss/main.scss'

// CSS (example)
import './assets/css/main.css'
import './assets/css/swiper.css'
import './assets/css/fancybox.css'
import './assets/css/nouislider.min.css'


import './js/menu'
import './js/accordion'
import './js/'

// Vue.js
window.Vue = require('vue')

// // Vue init
const apppELem = document.querySelector('#app');
// Vue components (for use in html)
Vue.component('list-component', require('./components/List.vue').default)

if(apppELem){
  const app = new Vue({
    el: '#app'
  })
}

// import file from './assets/data/list.json'

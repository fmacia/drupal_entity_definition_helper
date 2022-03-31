import { createApp } from 'vue'
import 'highlight.js/styles/stackoverflow-dark.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'gitart-vue-dialog/dist/style.css'
import { GDialog } from 'gitart-vue-dialog'
import App from './App.vue'
import './index.css'
import store from './store'

const app = createApp(App)
app.use(store)

app.use(hljsVuePlugin)

app.component('GDialog', GDialog)

app.mount('#app')

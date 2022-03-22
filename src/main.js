import { createApp } from 'vue'
import hljs from 'highlight.js/lib/core';
import yaml from 'highlight.js/lib/languages/yaml';
import 'highlight.js/styles/stackoverflow-dark.css'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'gitart-vue-dialog/dist/style.css'
import { GDialog } from 'gitart-vue-dialog'

import App from './App.vue'
import './index.css'
import store from './store'

const app = createApp(App)
app.use(store)

hljs.registerLanguage('yaml', yaml)
app.use(hljsVuePlugin)

app.component('GDialog', GDialog)

app.mount('#app')

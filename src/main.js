import { createApp } from 'vue'
import 'highlight.js/styles/stackoverflow-dark.css'
import hljs from 'highlight.js/lib/core';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'gitart-vue-dialog/dist/style.css'
import { GDialog } from 'gitart-vue-dialog'
import App from './App.vue'
import './index.css'
import store from './store'

const app = createApp(App)
app.use(store)

hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('markdown', markdown)
app.use(hljsVuePlugin)

app.component('GDialog', GDialog)

app.mount('#app')

import { createStore } from 'vuex'

export default createStore({
  state: {
    labels: {
      machineName: 'Machine name',
      label: 'Label',
      description: 'Description',
      urlPattern: 'URL Pattern',
      translatable: 'Translatable',
      fields: 'Fields',
      type: 'Type',
    },
    node: [
      {
        machineName: 'page',
        label: 'Basic page',
        description: 'A basic page content type',
        urlPattern: '/[node:title]',
        translatable: false,
        fields: [
          {
            machineName: 'title',
            label: 'Title',
            description: 'The content type title',
            type: 'string',
          },
        ],
      },
      {
        machineName: 'article',
        label: 'Article',
        description: 'An article content type',
        fields: [
          {
            machineName: 'title',
            label: 'Title',
            description: 'The content type title',
            type: 'string',
          },
          {
            machineName: 'body',
            label: 'Body',
            description: 'The content type body',
            type: 'long_text',
          },
        ],
      },
    ],
  },
  mutations: {
    addBundle (state, bundle) {
      state.node.push(bundle)
    },
    setBundle (state, { bundleKey, bundle }) {
      state.node.splice(bundleKey, 1, { ...bundle })
    },
    deleteBundle (state, bundleKey) {
      state.node.splice(bundleKey, 1)
    },
    addField (state, { bundleKey, field }) {
      state.node[bundleKey].fields.push(field)
    },
    setField (state, { bundleKey, fieldKey, field }) {
      state.node[bundleKey].fields.splice(fieldKey, 1, { ...field })
    },
    deleteField (state, { bundleKey, fieldKey }) {
      state.node[bundleKey].fields.splice(fieldKey, 1)
    },
  },
  getters: {
    getBundle: (state) => (bundleKey) => {
      return state.node[bundleKey]
    },
    getField: (state) => (bundleKey, fieldKey) => {
      return state.node[bundleKey].fields[fieldKey]
    },
    translateLabel: (state) => (label) => {
      return state.labels[label] || label
    }
  },
})

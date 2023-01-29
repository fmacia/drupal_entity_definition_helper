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
      required: 'Required',
      defaultValue: 'Default Value',
      cardinality: "Cardinality",
    },
    node: [
      {
        machineName: 'page',
        label: 'Basic page',
        urlPattern: '/[node:title]',
        translatable: false,
        description: 'A basic page content type',
        fields: [
          {
            machineName: 'title',
            label: 'Title',
            type: 'string',
            required: true,
            defaultValue: '',
            translatable: true,
            cardinality: 1,
            description: 'The content type title',
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
            type: 'string',
            required: true,
            defaultValue: '',
            translatable: true,
            cardinality: 1,
            description: 'The content type title',
          },
          {
            machineName: 'body',
            label: 'Body',
            type: 'long_text',
            required: false,
            defaultValue: '',
            translatable: true,
            cardinality: 1,
            description: 'The content type body',
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
    import (state, newStructure) {
      state.node = newStructure
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

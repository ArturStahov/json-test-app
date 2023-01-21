<template lang="pug">
.json-widget-wrapper
  JsonEditorVue(
    :class='bindClass'
    :readOnly='readOnly' 
    :statusBar='statusBar'
    :mainMenuBar='mainMenuBar'
    :navigationBar='navigationBar'
    :mode='modeOption'
    v-model="jsonValue" 
    @onChange='handlerChange' 
    @onError='handlerError' 
  )
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JsonEditorVue from 'json-editor-vue';

type modeOptionType = 'tree' | 'table' | 'text'

const DARK_THEME = 'jse-theme-dark';

export default defineComponent({
  name: 'JsonEditorWidget',

  components: {
    JsonEditorVue,
  },

  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    modeOption: {
      type: String,
      default: 'tree' as modeOptionType
    },
    statusBar: {
      type: Boolean,
      default: true
    },
    navigationBar: {
      type: Boolean,
      default: false
    },
    mainMenuBar: {
      type: Boolean,
      default: true
    },
    enterValue: {
      type: Object,
      default: () => ({})
    },
    darkTheme: {
      type: Boolean,
      default: false,
    }
  },

  data: () => ({
    jsonValue: {},
    bindClass: ''
  }),

  created() {
    this.darkTheme && (this.bindClass = DARK_THEME);
    this.enterValue && (this.jsonValue = this.enterValue);
  },

  methods: {
    handlerChange(value: any) {
      console.log('CHANGE', value)
    },
    handlerError(value: any) {
      console.log('ERRor', value)
    }
  },

  watch: {
    'jsonValue': {
      handler() {
        this.$emit('change-json', this.jsonValue)
      },
      deep: true,
    },
    'enterValue': {
      handler() {
        this.enterValue && (this.jsonValue = this.enterValue);
      },
      immediate: false,
    }
  },

  computed: {

  },
});
</script>

<style scoped lang="scss">
.json-widget-wrapper {
  width: 600px;
}
</style>
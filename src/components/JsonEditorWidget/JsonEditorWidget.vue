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

<style lang="scss">
@import '../../style/theme.scss';
.jse-modal-window {
  border-radius: 9px !important;
  box-shadow: $box-shadow;
   .jse-modal-content {
    border-radius: 8px !important;
    .jse-header-outer .jse-header {
        background: $color-light-yellow !important;
      }
   }

   .jse-header {
    background: $dark-green !important;
   }
   .jse-actions button {
    border-radius: 20px !important;
    background: $color-red !important;
    transition: background 0.4s ease-in ;
    &:hover {
      background: $color-red-dark !important;
    }
   }
}
.jse-contextmenu {
  background: $grey !important;
  border-radius: 4px;
}
</style>

<style scoped lang="scss">
@import '../../style/theme.scss';
.json-widget-wrapper {
  max-width: 600px;
  min-width: 450px;

  :deep(.jse-button.jse-contextmenu) {
    background: transparent !important;
  }

  :deep(.jse-main) {
    height: 475px !important;
      ::-webkit-scrollbar {
        width: 8px;
      }
    
      ::-webkit-scrollbar-track {
         background-color: transparent;
      }
    
      ::-webkit-scrollbar-thumb {
        background-color: $grey-light;
        cursor: pointer;
      }

    .jse-table-mode button.jse-nested-array-action {
      background: $dark-green !important;
      transition: background 0.4s ease-in;
      &:hover {
        background: $color-green !important;
      }
    }
    .jse-contents {
        padding: 15px 10px !important;
        .jse-json-node  {
           .jse-contents-outer .jse-contents {
             padding: 5px 10px !important;
           }
           .jse-header-outer {
             margin-bottom: 5px !important;
           }
        }
      }
    .jse-status-bar {
      background: $dark-green !important;
    }
  }

  :deep(.jse-menu) {
    background: $color-green !important;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    .jse-button {
      &:hover {
          background: $dark-green !important;
        }
      &:focus {
        background: $dark-green !important;
      }
    }
  }
}
</style>
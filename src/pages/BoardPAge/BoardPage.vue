<template lang="pug">
.board-page
  v-card.header-wrapper.mx-auto( 
     flat
     rounded="0"
  )
    HeaderToolbar(@action-menu-toggle='openSidebar=!openSidebar' :user='user')
    .header-controls 
      SingleSelect(
        :list='listRequestMethods'
        @change-value='handlerRequestMethods'
      )
      UrlControl(
        @inputUrl='handlerInputUrl'
      )
      v-btn.button-send-request(
       @click="handlerSendRequest" 
       color='#33a50e'
      )
        v-icon(:icon='"fas fa-paper-plane"')
    
  v-card.content-wrapper.mx-auto
    v-layout
      LeftSidebar(:openSidebar='openSidebar')
      v-main()
        JsonEditorWidget

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../stor/userStor';
import JsonEditorWidget from '../../components/JsonEditorWidget/JsonEditorWidget.vue';
import LeftSidebar from './childrens/LeftSidebar.vue';
import HeaderToolbar from './childrens/HeaderToolbar.vue';
import UrlControl from '@/components/UrlInputControl/UrlControl.vue';
import SingleSelect from '@/components/Fields/SingleSelect.vue';

export default defineComponent({
  name: 'BoardPage',
  components: {
    JsonEditorWidget,
    LeftSidebar,
    HeaderToolbar,
    UrlControl,
    SingleSelect,
  },
  data() {
    return {
      openSidebar: true,
      urlValue: '',
      listRequestMethods: [
        { label: 'Post', code: 'post' },
        { label: 'Get', code: 'get' },
        { label: 'Put', code: 'put' },
        { label: 'Path', code: 'path' },
        { label: 'Delete', code: 'delete' },
      ],
      selectedRequestMethods: { label: 'Post', code: 'post' },
    }
  },

  methods: {
    handlerInputUrl(value: string) {
      this.urlValue = value
    },
    handlerSendRequest() {
      console.log('Request submit')
    },
    handlerRequestMethods(select: any) {
       this.selectedRequestMethods = select;
    }
  },

  setup() {
    const userStor = useUserStore();
    return { userStor };
  },
  computed: {
    user() {
      return this.userStor.getUser;
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../style/theme.scss';
.board-page {
  width: 100%;
  height: 100%;
  .header-wrapper {
    height: 150px;
    background-color: $color-light2-green !important;
    :deep(.UrlInputControl) {
      margin: 20px auto;
    }
  }

  .header-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .button-send-request {
    height: 40px;
    margin-left: 5px;
  }
  .content-wrapper {
    background-color: $color-light-yellow-transparent;
    height: calc(100% - 150px);
    padding:10px;
  }
}
</style>
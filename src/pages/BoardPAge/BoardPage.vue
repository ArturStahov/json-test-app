<template lang="pug">
.board-page
  v-card.header-wrapper.mx-auto( 
     flat
     rounded="0"
  )
    HeaderToolbar(@action-menu-toggle='openSidebar=!openSidebar')
   
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

export default defineComponent({
  name: 'BoardPage',
  components: {
    JsonEditorWidget,
    LeftSidebar,
    HeaderToolbar,
  },
  data() {
    return {
      openSidebar: true,
    }
  },

  methods: {
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
  }
  .content-wrapper {
    background-color: $color-light-yellow-transparent;
    height: calc(100% - 150px);
    padding:10px;
  }
}
</style>
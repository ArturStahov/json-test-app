<template lang="pug">
.board-wrapper
  v-card.page-header-wrapper.mx-auto( 
    flat
    rounded="0"
  )
    v-toolbar.page-header(density="compact")
      v-app-bar-nav-icon(
        color='#ffef7c'
      )
      v-spacer
      v-list-item(
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
      )
 
        
       

  v-card.page-content.mx-auto
    JsonEditorWidget

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../stor/userStor';
import JsonEditorWidget from '../../components/JsonEditorWidget/JsonEditorWidget.vue';

export default defineComponent({
  name: 'BoardPage',
  components: {
    JsonEditorWidget,
  },
  data() {
    return {
     
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
.board-wrapper {
  width: 100%;
  height: 100%;
  .page-header-wrapper {
    height: 150px;
    background-color: $color-light2-green !important;
    .page-header {
      padding: 5px;
      box-shadow: $box-shadow;
      background: $dark-green;
    }
  }
  .page-content {
    background-color: $color-light-yellow-transparent;
    height: calc(100% - 150px);
    padding:10px;
  }
}
</style>
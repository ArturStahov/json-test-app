<template>
    <div class="home-wrapper">

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../stor/userStor';

export default defineComponent({
    name: 'HomePage',
    components: {
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
.home-wrapper {
    background-image: url('https://cdn.pixabay.com/photo/2016/03/18/15/02/ufo-1265186_960_720.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
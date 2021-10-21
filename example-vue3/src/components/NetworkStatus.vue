<template>
    <div class="statusShower row">
        <p>You are currently: <span v-if="userOnline" class="online">Online</span><span v-if="!userOnline" class="offline">Offline</span>!</p>
    </div>
</template>

<script lang="ts">
    import { ref, defineComponent, onMounted, onUnmounted } from 'vue';
    export default defineComponent({
        name: 'NetworkStatus',
        setup() {
            const userOnline = ref(window.navigator.onLine);

            const onNetworkChange = (e: Event) => {
                userOnline.value = e.type === 'online';
            };
            onMounted(() => {
                window.addEventListener('online', onNetworkChange);
                window.addEventListener('offline', onNetworkChange);
            });
            onUnmounted(() => {
                window.removeEventListener('online', onNetworkChange);
                window.removeEventListener('offline', onNetworkChange);
            });
            return { userOnline };
        },
    });
</script>

<style scoped lang="scss">
    .statusShower {
        padding: 2rem 0;
        justify-content: center;
        p {
            font-size: 2rem;
            font-weight: 600;
            color: $dark1;
            border-bottom: 4px solid $theme1;
        }
    }
</style>

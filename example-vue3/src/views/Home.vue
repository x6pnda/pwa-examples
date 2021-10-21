<template>
    <NetworkStatus />
    <div class="newsList">
        <Promised :promise="latestHeadlines">
            <template v-slot:pending>
                <p>Loading...</p>
            </template>
            <template v-slot="data">
                <template v-for="(item, index) in data.data.response.results" :key="item.id">
                    <NewsItem :item="item" :index="index" />
                </template>
            </template>
            <template v-slot:rejected="error">
                <p>Error: {{ error.message }}</p>
            </template>
        </Promised>
    </div>
</template>

<script lang="ts">
    import { Promised } from 'vue-promised';
    import { defineComponent } from 'vue';
    import { useFetchAPI } from '../scripts/fetch';
    import NewsItem from '../components/NewsItem.vue';
    import NetworkStatus from '../components/NetworkStatus.vue';

    export default defineComponent({
        name: 'Home',
        components: { Promised, NewsItem, NetworkStatus },
        setup() {
            const latestHeadlines = useFetchAPI('/search', 'games', undefined, { 'order-by': 'newest' });
            return { latestHeadlines };
        },
    });
</script>
<style scoped lang="scss">
    .newsList {
        width: 100%;
        min-width: 600px;
        max-width: 50%;
        margin: 0 auto;
    }
</style>

<template>
    <div class="rowMiddle newsItem">
        <div class="col">
            <h1>{{ item.webTitle }}</h1>
            <span class="date">{{ formatedDate }}</span>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, ComputedRef, toRefs, computed } from 'vue';
    import { INewsItem } from '../types/INewsItem';
    import { MONTHS } from '../constants/MONTHS';

    export default defineComponent({
        name: 'NewsItem',
        props: {
            index: Number,
            item: {
                type: Object as () => INewsItem,
                required: true,
            },
        },
        setup(props) {
            const { item } = toRefs(props);
            const formatedDate: ComputedRef<string> = computed(() => {
                const parsedDate = new Date(item.value.webPublicationDate);
                return `${parsedDate.getDate()} ${MONTHS[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
            });
            return { formatedDate };
        },
    });
</script>
<style scoped lang="scss">
    .newsItem {
        padding: 1rem 2rem;
        border-bottom: 2px solid $theme1;
        &:last-of-type {
            border-bottom-width: 0;
        }
        h1 {
            font-size: 2rem;
            font-weight: 600;
            color: $dark1;
        }
        span.date {
            margin-top: 5px;
            font-size: 1.2rem;
            font-weight: 400;
            color: $dark1;
        }
    }
</style>

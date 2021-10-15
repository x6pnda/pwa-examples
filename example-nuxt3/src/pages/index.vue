<template>
    <div>
        <!-- Remove this component to get started! -->
        <p>Hello World</p>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { fetchData, useFetch } from "../scripts/fetch";
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default {
  
    async setup() {
      await timeout(2000)
        const data = await useFetch("https://content.guardianapis.com/search?api-key=test", {mode: 'cors'});
        console.log(data)
        console.log("X")
        return {};
    },
};
</script>

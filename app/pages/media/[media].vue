<script setup lang="ts">
const route = useRoute();
const page = route.params.media as string;
</script>

<template>
<div v-if="page === 'movie'">
    <h1>Filmler</h1>
</div>
<div v-else-if="page === 'tv'">
    <h1>Diziler</h1>
</div>
<div v-else>404 Not Found</div>
</template>
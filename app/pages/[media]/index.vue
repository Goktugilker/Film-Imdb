<script setup lang="ts">
definePageMeta({
  name: 'Media List',
})
const route = useRoute()
const page = route.params.media as string
</script>

<template>
  <div v-if="page === 'movies'">
    <ListsMovie />
  </div>
  <div v-else-if="page === 'tv'">
    <ListsTv />
  </div>
  <div v-else>
    404 Not Found
  </div>
</template>

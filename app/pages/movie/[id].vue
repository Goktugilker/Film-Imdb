<script setup lang="ts">

const route = useRoute()
const mediaStore = useMediaStore()
const movieId = route.params.id

onMounted(async () => {
  await mediaStore.fetchMovieList()
  await mediaStore.fetchTvList()
})
</script>

<template>
</template>

<script setup lang="ts">
import type { Media } from '~/type'

const route = useRoute()
const mediaStore = useMediaStore()
const tvId = Number(route.params.id)
const selectedTvShow = ref<Media>()

onMounted(async () => {
  await mediaStore.fetchMovieList()
  await mediaStore.fetchTvList()
  
  if (tvId) {
    const tvShow = ref<Media>()
    tvShow.value = mediaStore.TvShows.find(tv => Number(tv.id) === tvId)
    if (tvShow.value) {
      selectedTvShow.value = tvShow.value
    }
  }
})
</script>

<template>
  <div class="overflow-hidden flex flex-col justify-center items-center">
    <div class="w-full max-w-4xl p-4">
      <h1 class="text-3xl font-bold mb-4">{{ selectedTvShow?.name }}</h1>
      <img :src="`https://image.tmdb.org/t/p/w500${selectedTvShow?.backdrop_path}`" alt="TV Show Backdrop" class="w-full h-64 object-cover mb-4">
      <p class="text-lg mb-2">Overview:</p>
      <p class="text-lg">{{ selectedTvShow?.overview }}</p>
      <p class="mt-4 text-lg">First Air Date: {{ selectedTvShow?.first_air_date }}</p>
      <p class="mt-2 text-lg">Popularity: {{ selectedTvShow?.popularity }}</p>
      <p class="mt-2 text-lg">Vote Count: {{ selectedTvShow?. vote_count }}</p>
      <p class="mt-2 text-lg">Vote Average: {{ selectedTvShow?.vote_average }}</p>
      <p class="mt-2 text-lg">Original Language: {{ selectedTvShow?.original_language }}</p>
      <p class="mt-2 text-sm text-gray-500">Rating: {{ selectedTvShow?.vote_average }}</p>

    </div>
  </div>
</template>

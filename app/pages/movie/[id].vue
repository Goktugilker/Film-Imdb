<script setup lang="ts">
import type { Media } from '~/type'

const route = useRoute()
const mediaStore = useMediaStore()
const movieId = route.params.id
const selectedMovie = ref<Media>()

onMounted(async () => {
  await mediaStore.fetchMovieList()
  await mediaStore.fetchTvList()
  selectedMovie.value = mediaStore.Movies.find(movie => movie.id === movieId)
  if (movieId) {
    const movie = ref<Media>()
   movie.value = mediaStore.Movies.find(movie => Number(movie.id) === Number(movieId))
    if (movie.value) {
      selectedMovie.value = movie.value
    }
  }
})
</script>

<template>
  <div class="overflow-hidden flex flex-col justify-center items-center">
    <div class="w-full max-w-4xl p-4">
      <h1 class="text-3xl font-bold mb-4">{{ selectedMovie?.title }}</h1>
      <img :src="`https://image.tmdb.org/t/p/w500${selectedMovie?.backdrop_path}`" alt="Movie Backdrop" class="w-full h-64 object-cover mb-4">
      <p class="text-lg mb-2">Overview:</p>
      <p class="text-lg">{{ selectedMovie?.overview }}</p>
      <p class="mt-4 text-lg">Release Date: {{ selectedMovie?.release_date }}</p>
      <p class="mt-2 text-lg">Popularity: {{ selectedMovie?.popularity }}</p>
      <p class="mt-2 text-lg">Vote Count: {{ selectedMovie?.vote_count }}</p>
      <p class="mt-2 text-lg">Vote Average: {{ selectedMovie?.vote_average }}</p>
      <p class="mt-2 text-lg">Original Language: {{ selectedMovie?.original_language }}</p>
      <p class="mt-2 text-sm text-gray-500">Rating: {{ selectedMovie?.vote_average }}</p>
    </div>
  </div>
</template>

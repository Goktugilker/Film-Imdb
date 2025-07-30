<script setup lang="ts">
import type { Media } from '~/type'

const route = useRoute()
const videostore = useVideoStore()
const mediaStore = useMediaStore()
const mediaType = route.params.media as string
const movieId = Number(route.params.id)
const tvId = Number(route.params.id)
const selectedTvShow = ref<Media>()
const selectedMovie = ref<Media>() 



onMounted(async () => {
  if (mediaType === 'movies') {
    await mediaStore.fetchMovieList()
    await videostore.fetchMovieVideos(movieId)
    selectedMovie.value = mediaStore.Movies.find(movie => Number(movie.id) === movieId)
    if (movieId) {
      const movie = ref<Media>()
      movie.value = mediaStore.Movies.find(movie => Number(movie.id) === Number(movieId))
      if (movie.value) {
        selectedMovie.value = movie.value
      }
    }
  }
  else if (mediaType === 'tv') {
    await mediaStore.fetchTvList()

    if (tvId) {
      const tvShow = ref<Media>()
      tvShow.value = mediaStore.TvShows.find(tv => Number(tv.id) === tvId)
      if (tvShow.value) {
        selectedTvShow.value = tvShow.value
      }
    }
  }
})
</script>

<template>
  <div v-if="mediaType === 'movies'" class="overflow-hidden flex flex-col justify-center items-center">
    <div class="w-full max-w-4xl p-4">
      <h1 class="text-3xl font-bold mb-4">
        {{ selectedMovie?.title }}
      </h1>
      <img :src="`https://image.tmdb.org/t/p/w500${selectedMovie?.backdrop_path}`" alt="Movie Backdrop" class="w-full h-full object-cover mb-4">
      <div class="flex flex-row gap-4 mb-4">
        <div v-if="videostore.movieVideos.length >= 3" class="flex flex-row gap-4 mb-4">
          <iframe v-for="(video, id) in 3" :key="id" class="w-1/3 h-64 mb-4" :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
        </div>
        <div v-else-if="videostore.movieVideos.length === 2" class="flex flex-row gap-4 mb-4 w-1/2">
          <iframe v-for="(video, id) in videostore.movieVideos.length" :key="id" class="w-1/2 h-64 mb-4" :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
        </div>
        <div v-else-if="videostore.movieVideos.length === 1" class="flex flex-row gap-4 mb-4 w-full">
          <iframe v-for="(video, id) in videostore.movieVideos.length" :key="id" class="w-full h-64 mb-4" :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
        </div>
      </div>
      <p class="text-lg mb-2">
        Overview:
      </p>
      <p class="text-lg">
        {{ selectedMovie?.overview }}
      </p>
      <p class="mt-4 text-lg">
        Release Date: {{ selectedMovie?.release_date }}
      </p>
      <p class="mt-2 text-lg">
        Popularity: {{ selectedMovie?.popularity }}
      </p>
      <p class="mt-2 text-lg">
        Vote Count: {{ selectedMovie?.vote_count }}
      </p>
      <p class="mt-2 text-lg">
        Vote Average: {{ selectedMovie?.vote_average }}
      </p>
      <p class="mt-2 text-lg">
        Original Language: {{ selectedMovie?.original_language }}
      </p>
      <p class="mt-2 text-sm text-gray-500">
        Rating: {{ selectedMovie?.vote_average }}
      </p>
    </div>
  </div>
  <div v-else-if="mediaType === 'tv'" class="overflow-hidden flex flex-col justify-center items-center">
    <div class="w-full max-w-4xl p-4">
      <h1 class="text-3xl font-bold mb-4">
        {{ selectedTvShow?.name }}
      </h1>
      <iframe class="w-full h-64 mb-4" frameborder="0" allowfullscreen />
      <p class="text-lg mb-2">
        Trailer:
      </p>
      <img :src="`https://image.tmdb.org/t/p/w500${selectedTvShow?.backdrop_path}`" alt="TV Show Backdrop" class="w-full h-64 object-cover mb-4">
      <p class="text-lg mb-2">
        Overview:
      </p>
      <p class="text-lg">
        {{ selectedTvShow?.overview }}
      </p>
      <p class="mt-4 text-lg">
        First Air Date: {{ selectedTvShow?.first_air_date }}
      </p>
      <p class="mt-2 text-lg">
        Popularity: {{ selectedTvShow?.popularity }}
      </p>
      <p class="mt-2 text-lg">
        Vote Count: {{ selectedTvShow?.vote_count }}
      </p>
      <p class="mt-2 text-lg">
        Vote Average: {{ selectedTvShow?.vote_average }}
      </p>
      <p class="mt-2 text-lg">
        Original Language: {{ selectedTvShow?.original_language }}
      </p>
      <p class="mt-2 text-sm text-gray-500">
        Rating: {{ selectedTvShow?.vote_average }}
      </p>
    </div>
  </div>
</template>

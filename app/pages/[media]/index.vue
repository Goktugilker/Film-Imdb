<script setup lang="ts">
const route = useRoute()
const page = route.params.media as string
const mediaStore = useMediaStore()
onMounted(async () => {
  if (page === 'movies') {
    await mediaStore.fetchMovieList()
  }
  else if (page === 'tv') {
    await mediaStore.fetchTvList()
  }
})
</script>

<template>
  <div
    v-if="page === 'movies'"
    class="flex flex-wrap h-full w-full justify-center"
  >
    <h1 class="text-3xl font-bold w-full text-center mb-4">
      Filmler
    </h1>
    <div
      v-for="(movie, id) in mediaStore.Movies"
      :key="id"
      class="flex flex-wrap gap-4 justify-center items-center p-4 w-[200px]"
    >
      <UCard class="w-full" @click="$router.push({ name: 'media-id', params: { media: 'movies', id: movie.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-2xl font-bold text-center">
            {{ movie.title }}
          </h1>
        </UCardBody>
      </UCard>
    </div>
  </div>
  <div v-else-if="page === 'tv'" class="flex flex-wrap h-full w-full justify-center">
    <h1 class="text-3xl font-bold w-full text-center mb-4">
      Diziler
    </h1>
    <div
      v-for="(tv, id) in mediaStore.TvShows"
      :key="id"
      class="flex flex-wrap gap-4 justify-center items-center p-4 w-[200px]"
    >
      <UCard class="w-full" @click="$router.push({ name: 'media-id', params: { media: 'tv', id: tv.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${tv.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-2xl font-bold text-center">
            {{ tv.name }}
          </h1>
        </UCardBody>
      </UCard>
    </div>
  </div>
  <div v-else>
    404 Not Found
  </div>
</template>

<script setup lang="ts">
const mediaStore = useMediaStore()
onMounted(async () => {
  await mediaStore.fetchMovieList()
  await mediaStore.fetchTvList()
})
</script>

<template>
  <div class="overflow-hidden flex flex-col justify-center items-center">
    <div class="p-8 max-w-5xl mx-auto w-96">
      <UInput
        v-model="mediaStore.searchQuery"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        class="mb-6 w-full"
      />
    </div>
    <div v-if="mediaStore.searchQuery">
      <div class="flex flex-col items-center mb-6">
        <UCard v-for="(media, id) in mediaStore.filteredMovies" :key="id" class="w-full max-w-5xl flex flex-row cursor-pointer" @click="$router.push({ name: 'media-id', params: { media: media.title ? 'movies' : 'tv', id: media.id } })">
          <div class="flex flex-row justify-center items-center p-4 w-[400px] h-[100px] ">
            <img :src="`https://image.tmdb.org/t/p/w500${media.backdrop_path}`" alt="" class="w-full h-[80px] object-contain">
            <h1 class="text-2xl font-bold">
              {{ media.title || media.name }}
            </h1>
            <span v-for="(fullStars, index) in Math.floor(media.vote_average / 2)" :key="`full-${index}`" class="text-yellow-400">★</span>
            <span v-for="(emptyStars, index) in 5 - Math.floor(media.vote_average / 2)" :key="`empty-${index}`" class="text-gray-400">★</span>
          </div>
        </UCard>
      </div>
    </div>
    <div>
      <h1 class="text-2xl font-bold">
        FİLMLER
      </h1>
    </div>
    <div class="flex animate-scroll-x space-x-6 w-max px-4 py-2 ">
      <UCard v-for="(movie, id) in mediaStore.Movies.slice(0, 40)" :key="id" class="min-w[200px]  " @click="$router.push({ name: 'media-id', params: { media: 'movies', id: movie.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-2xl font-bold">
            {{ movie.title }}
          </h1>
          <div class="flex justify-center items-center mt-2">
            <span v-for="(fullStars, index) in Math.floor(movie.vote_average / 2)" :key="`full-${index}`" class="text-yellow-400">★</span>
            <span v-for="(emptyStars, index) in 5 - Math.floor(movie.vote_average / 2)" :key="`empty-${index}`" class="text-gray-400">★</span>
          </div>
        </UCardBody>
      </UCard>
    </div>
    <h1 class="text-2xl font-bold">
      DİZİLER
    </h1>
    <div class="flex animate-scroll-x-reverse space-x-6 w-max px-4 py-2">
      <UCard v-for="(tv, id) in mediaStore.TvShows.slice(0, 40).reverse()" :key="id" class="min-w[200px]  " @click="$router.push({ name: 'media-id', params: { media: 'tv', id: tv.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${tv.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-3xl font-bold">
            {{ tv.name }}
          </h1><br>
          <span v-for="(fullStars, index) in Math.floor(tv.vote_average / 2)" :key="`full-${index}`" class="text-yellow-400">★</span>
          <span v-for="(emptyStars, index) in 5 - Math.floor(tv.vote_average / 2)" :key="`empty-${index}`" class="text-gray-400">★</span>
        </UCardBody>
      </UCard>
    </div>
  </div>
</template>

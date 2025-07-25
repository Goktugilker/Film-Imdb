<script setup lang="ts">

const mediaStore = useMediaStore()
onMounted(async () => {
  await mediaStore.fetchMovieList()
  await mediaStore.fetchTvList()
  
})
</script>

<template>
  <div class="overflow-hidden flex flex-col justify-center items-center">
    <div>

      <h1 class="text-2xl font-bold">
        FİLMLER
      </h1>
    </div>
    <div class="flex animate-scroll-x space-x-6 w-max px-4 py-2 ">
      <UCard v-for="(movie,id) in mediaStore.Movies" :key="id" class="min-w[200px]  " @click="$router.push(`/movie/${movie.id}`)">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-2xl font-bold">
            {{ movie.title }}
          </h1>
        </UCardBody>
      </UCard>
    </div>
    <h1 class="text-2xl font-bold">
      DİZİLER
    </h1>
    <div class="flex animate-scroll-x space-x-6 w-max px-4 py-2">
      <UCard v-for="(tv,id) in mediaStore.TvShows" :key="id" class="min-w[200px]  " @click="$router.push(`/tv/${tv.id}`)">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${tv.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-3xl font-bold">
            {{ tv.name }}
          </h1>
        </UCardBody>
      </UCard>
    </div>
  </div>
</template>

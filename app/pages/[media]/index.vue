<script setup lang="ts">
const route = useRoute();
const page = route.params.media as string;
const mediaStore = useMediaStore();
onMounted(async () => {
  if (page === 'movies') {
    await mediaStore.fetchMovieList();
  } else if (page === 'tv') {
    await mediaStore.fetchTvList();
  }
});

</script>

<template>
<div
 v-if="page === 'movies'"
  class="flex h-dvh w-dvw">
    <h1 class="text-3xl font-bold justify-center items-center">Filmler</h1>
    <div
      v-for="(movie, id) in mediaStore.Movies"
      :key="id"
      class="flex flex-wrap gap-4 items-center justify-center w-full"
    >
      <UCard class="min-w-[200px]" @click="$router.push(`/movie/${movie.id}`)">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-2xl font-bold">{{ movie.title }}</h1>
        </UCardBody>
      </UCard>
    </div>
</div>
<div v-else-if="page === 'tv'">
    <h1 class="text-3xl font-bold">Diziler</h1>
</div>
<div v-else>404 Not Found</div>
</template>
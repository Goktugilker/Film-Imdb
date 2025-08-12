<script setup lang="ts">
const mediaStore = useMediaStore()
onMounted(async () => {
  await mediaStore.fetchMovieList()
})
watch(lang, async () => {
  await mediaStore.fetchMovieList()
})
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  mediaStore.page = 1
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
function handleScroll() {
  const scrollPosition = window.scrollY + window.innerHeight
  const pageHeight = document.body.offsetHeight
  if (scrollPosition >= pageHeight) {
    mediaStore.movieFetch = false
    mediaStore.page += 1
    mediaStore.fetchMovieList()
  }
}
</script>

<template>
  <div
    class="flex flex-wrap h-full w-full justify-center"
  >
    <h1 class="text-3xl font-bold w-full text-center mb-4">
      Filmler
    </h1>
    <div
      v-for="(movie, id) in mediaStore.Movies.slice(0, mediaStore.Movies.length - (mediaStore.Movies.length % 3))"
      :key="id"
      class="flex flex-wrap gap-4 justify-center items-center p-4 w-[400px]"
    >
      <UCard class="w-full rounded-4xl" @click="$router.push({ name: 'Media Details', params: { media: 'movies', id: movie.id } })">
        <UCardHeader class="flex justify-center items-center rounded-4xl">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="" class="w-full h-auto rounded-4xl">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-2xl font-bold text-center">
            {{ movie.title }}
          </h1>
        </UCardBody>
      </UCard>
    </div>
  </div>
</template>

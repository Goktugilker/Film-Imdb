<script setup lang="ts">
const mediaStore = useMediaStore()
const searchStore = useSearchStore()
onMounted(async () => {
  await mediaStore.fetchMovieList()
  await mediaStore.fetchTvList()
})
watch(() => mediaStore.searchQuery, () => {
  searchStore.search(mediaStore.searchQuery)
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
      <div class="flex flex-col items-center mb-6 gap-4" v-for="(media, id) in searchStore.results.slice(0, 5)" :key="id" >
        <UCard v-if="media.backdrop_path !== null"   class=" max-w-5xl flex flex-row cursor-pointer w-full h-[100px] " @click="$router.push({ name: 'media-id', params: { media: media.title ? 'movies' : 'tv', id: media.id } })">
          <div class="flex flex-row justify-between w-[400px] h-[100px] " >
            <img  :src="`https://image.tmdb.org/t/p/w500${media.backdrop_path}`" alt="" class="w-full h-[70px] object-contain mb-16 ">
            <h1 class="text-xl font-bold mb-20">
              {{ media.title || media.name }}
            </h1>
            <MediaRateStar :vote_average="media.vote_average" />
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
      <UCard v-for="(media, id) in mediaStore.Movies.slice(0, 40)" :key="id" class="min-w[200px]  " @click="$router.push({ name: 'media-id', params: { media: 'movies', id: media.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${media.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-2xl font-bold">
            {{ media.title }}
          </h1>
          <div class="flex justify-center items-center mt-2">
            <MediaRateStar :vote_average="media.vote_average" />
          </div>
        </UCardBody>
      </UCard>
    </div>
    <h1 class="text-2xl font-bold">
      DİZİLER
    </h1>
    <div class="flex animate-scroll-x-reverse space-x-6 w-max px-4 py-2">
      <UCard v-for="(media, id) in mediaStore.TvShows.slice(0, 40).reverse()" :key="id" class="min-w[200px]  " @click="$router.push({ name: 'media-id', params: { media: 'tv', id: media.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${media.backdrop_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-3xl font-bold">
            {{ media.name }}
          </h1><br>
          <MediaRateStar :vote_average="media.vote_average" />
        </UCardBody>
      </UCard>
    </div>
  </div>
</template>

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
    <div class="p-8 max-w-5xl mx-auto w-full">
      <UInput
        v-model="mediaStore.searchQuery"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        class="mb-6 w-full"
      />
    </div>
    <div v-if="mediaStore.searchQuery" class="w-full max-w-5xl mx-auto px-4">
      <div v-for="(media, id) in searchStore.results.slice(0, 5)" :key="id" class="mb-4">
        <UCard v-if="media.poster_path !== null" class="cursor-pointer transition-all hover:shadow-lg" @click="$router.push({ name: 'Media Details', params: { media: media.title ? 'movies' : 'tv', id: media.id } })">
          <div class="flex flex-row items-center gap-4 p-4">
            <div class="flex-shrink-0">
              <img :src="`https://image.tmdb.org/t/p/w200${media.poster_path}`" alt="" class="w-16 h-24 object-cover rounded">
            </div>
            <div class="flex-grow">
              <h1 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ media.title || media.name }}
              </h1>
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {{ media.overview?.slice(0, 100) }}...
              </p>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">{{ media.release_date || media.first_air_date }}</span>
                <MediaRateStar :vote_average="media.vote_average" />
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
    <div>
      <h1 class="text-2xl font-bold">
        FİLMLER
      </h1>
    </div>
    <div class="flex animate-scroll-x space-x-6 w-max px-4 py-2 h-[400px] ">
      <UCard v-for="(media, id) in mediaStore.Movies.slice(0, 40)" :key="id" class="min-w-[200px] w-[200px] cursor-pointer hover:scale-105 transition-transform" @click="$router.push({ name: 'Media Details', params: { media: 'movies', id: media.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex flex-wrap ">
          <h1 class="text-2xl font-bold justify-center">
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
      <UCard v-for="(media, id) in mediaStore.TvShows.slice(0, 40).reverse()" :key="id" class="min-w-[200px] w-[200px] h-[400px] cursor-pointer hover:scale-105 transition-transform" @click="$router.push({ name: 'Media Details', params: { media: 'tv', id: media.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex flex-wrap">
          <h1 class="text-3xl font-bold justify-center">
            {{ (media.name ?? '').length > 20 ? `${(media.name ?? '').slice(0, 20)}...` : media.name }}
          </h1><br>
          <MediaRateStar :vote_average="media.vote_average" />
        </UCardBody>
      </UCard>
    </div>
  </div>
</template>

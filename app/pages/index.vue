<script setup lang="ts">
const { locale } = useI18n()
const mediaStore = useMediaStore()
const searchStore = useSearchStore()
onMounted(async () => {
  await mediaStore.fetchMovieList()
  await mediaStore.fetchTvList()
})
watch(() => mediaStore.searchQuery, () => {
  searchStore.search(mediaStore.searchQuery)
})
watch(locale, async () => {
  mediaStore.page = 1
  mediaStore.Movies = []
  mediaStore.tvFetch = false
  mediaStore.movieFetch = false
  await mediaStore.fetchMovieList()
  await mediaStore.fetchTvList()
}, { immediate: false, deep: true })
</script>

<template>
  <div class=" page overflow-hidden flex flex-col justify-center items-center">
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
        {{ $t('movies') }}
      </h1>
      <br>
    </div>
    <!-- Filmler: Skeleton -->
    <div
      v-if="mediaStore.Movies.length < 20"
      class="flex animate-scroll-x space-x-6 w-max px-4 py-2 h-[400px]"
    >
      <UCard
        v-for="n in 40"
        :key="n"
        class="min-w-[200px] w-[200px] cursor-pointer hover:scale-100 transition-transform rounded-4xl"
      >
        <USkeleton class="w-auto h-64 rounded-4xl" />
      </UCard>
    </div>
    <!-- Filmler: İçerik -->
    <div
      v-else
      class="flex animate-scroll-x space-x-3.5 w-max px-4 py-2 h-[400px]"
    >
      <div
        v-for="(media, id) in mediaStore.Movies.slice(0, 20)"
        :key="id"
        class="min-w-[200px] w-[200px] cursor-pointer hover:scale-110 transition-transform rounded-4xl border -mb-7"
        :class="isDark ? 'border-gray-700' : 'border-gray-900'"
        @click="$router.push({ name: 'Media Details', params: { media: 'movies', id: media.id } })"
      >
        <div>
          <img
            v-if="media.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
            alt=""
            class="w-xl h-auto rounded-4xl"
          >
        </div>
        <div class="flex flex-col justify-center items-center h-[100px] p-2">
          <h1 class="text-2xl font-bold flex flex-wrap justify-center ">
            {{ (media.title ?? '').length > 20 ? `${(media.title ?? '').slice(0, 20)}...` : media.title }}
          </h1>
          <div class="flex justify-center items-center mt-2">
            <MediaRateStar :vote_average="media.vote_average" />
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <h1 class="text-2xl font-bold">
      {{ $t('Tv_Shows') }}
    </h1>
    <!-- TvShows: Skeleton -->
    <div
      v-if="mediaStore.TvShows.length < 20"
      class="flex animate-scroll-x-reverse space-x-3.5 w-max px-4 py-2"
    >
      <UCard
        v-for="n in 40"
        :key="n"
        class="min-w-[200px] w-[200px] cursor-pointer hover:scale-100 transition-transform rounded-4xl"
      >
        <USkeleton class="w-auto h-64 rounded-4xl" />
      </UCard>
    </div>
    <!-- TvShows: İçerik -->
    <div
      v-else
      class="flex animate-scroll-x-reverse space-x-3.5 w-max px-4 py-2"
    >
      <div
        v-for="(media, id) in mediaStore.TvShows.slice(0, 20).reverse()"
        :key="id"
        class="min-w-[200px] w-[200px] h-[400px] cursor-pointer hover:scale-110 transition-transform rounded-4xl border"
        :class="isDark ? 'border-gray-700' : 'border-gray-300'"
        @click="$router.push({ name: 'Media Details', params: { media: 'tv', id: media.id } })"
      >
        <div>
          <img
            :src="`https://image.tmdb.org/t/p/w342${media.poster_path}`"
            alt=""
            class="w-full h-[300px] object-cover rounded-t-4xl"
          >
        </div>
        <div class="flex flex-col justify-center items-center h-[100px] p-2">
          <h1 class="text-2xl font-bold flex flex-wrap justify-center  ">
            {{ (media.name ?? '').length > 18 ? `${(media.name ?? '').slice(0, 18)}...` : media.name }}
          </h1>
          <div class="flex justify-center items-center mt-1">
            <MediaRateStar :vote_average="media.vote_average" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'home',
})
const { locale } = useI18n()
const mediaStore = useMediaStore()
const searchStore = useSearchStore()

onMounted(async () => {
  await mediaStore.fetchMedias('movie')
  await mediaStore.fetchMedias('tv')
})

watch(() => mediaStore.searchQuery, () => {
  searchStore.search(mediaStore.searchQuery)
})

watch(locale, async () => {
  await mediaStore.fetchMedias('movie')
  await mediaStore.fetchMedias('tv')
}, { immediate: false, deep: true })

onBeforeUnmount(() => {
  mediaStore.page = 1
  mediaStore.medias = []
})

// TV shows için ayrı computed property
const tvShows = computed(() => {
  return mediaStore.medias.slice(20, 41)
})
</script>

<template>
  <div class=" overflow-hidden flex flex-col justify-center items-center h-full">
    <div class="p-8 max-w-5xl mx-auto w-full">
      <UInput
        v-model="mediaStore.searchQuery"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        class="mb-6 w-full "
      />
    </div>
    <div v-if="mediaStore.searchQuery" class="w-full max-w-5xl mx-auto px-4">
      <div v-for="(media, id) in searchStore.results.slice(0, 5)" :key="id" class="mb-4">
        <UCard v-if="media.poster_path !== null" class="cursor-pointer transition-all hover:shadow-lg" @click="$router.push({ name: 'Media Details', params: { media: media.title ? 'movie' : 'tv', id: media.id } })">
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
      v-if="mediaStore.medias.length < 20"
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
      <MediaCard
        v-for="(media, id) in mediaStore.medias.slice(0, 20)"
        :key="id"
        :media="media"
        @click="$router.push({ name: 'Media Details', params: { media: 'movie', id: media.id } })"
      />
    </div>
    <br><br>
    <div>
      <h1 class="text-2xl font-bold">
        {{ $t('Tv_Shows') }}
      </h1>
      <br>
    </div>

    <!-- TvShows: Skeleton -->
    <div
      v-if="mediaStore.medias.length < 40"
      class="flex animate-scroll-x-reverse space-x-3.5 w-max px-4 py-2 h-[400px]"
    >
      <UCard
        v-for="n in 20"
        :key="n"
        class="min-w-[200px] w-[200px] cursor-pointer hover:scale-100 transition-transform rounded-4xl"
      >
        <USkeleton class="w-auto h-64 rounded-4xl" />
      </UCard>
    </div>

    <!-- TvShows: İçerik -->
    <div
      v-else
      class="flex animate-scroll-x-reverse space-x-3.5 w-max px-4 py-2 mb-16 h-[400px]"
    >
      <MediaCard
        v-for="(media, id) in tvShows"
        :key="id"
        :media="media"
        @click="$router.push({ name: 'Media Details', params: { media: 'tv', id: media.id } })"
      />
    </div>
  </div>
</template>

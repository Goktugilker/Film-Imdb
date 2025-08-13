<script setup lang="ts">
const route = useRoute()
const mediaType = route.params.media as string
const mediaStore = useMediaStore()
onMounted(() => {
  if (mediaType === 'movies') {
    mediaStore.fetchMovieList()
  }
  else if (mediaType === 'tv') {
    mediaStore.fetchTvList()
  }
})
</script>

<template>
  <div>
    <UCard
      v-for="(media, id) in mediaStore.Movies.slice(0, 20)"
      :key="id"
      class="min-w-[200px] w-[200px] cursor-pointer hover:scale-105 transition-transform rounded-4xl"
      @click="$router.push({ name: 'Media Details', params: { media: 'movies', id: media.id } })"
    >
      <UCardHeader>
        <img
          v-if="media.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
          alt=""
          class="w-xl h-auto rounded-4xl"
        >
      </UCardHeader>
      <UCardBody class="flex flex-wrap">
        <h1 class="text-2xl font-bold justify-center">
          {{ (media.title ?? '').length > 20 ? `${(media.title ?? '').slice(0, 20)}...` : media.title }}
        </h1>
        <div class="flex justify-center items-center mt-2">
          <MediaRateStar :vote_average="media.vote_average" />
        </div>
      </UCardBody>
    </UCard>
  </div>
</template>

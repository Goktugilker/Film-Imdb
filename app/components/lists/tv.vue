<script setup lang="ts">
const mediaStore = useMediaStore()
onMounted(async () => {
  await mediaStore.fetchTvList()
})
watch(lang, async () => {
  await mediaStore.fetchTvList()
},)
</script>

<template>
  <div class="flex flex-wrap h-full w-full justify-center">
    <h1 class="text-3xl font-bold w-full text-center mb-4">
      Diziler
    </h1>
    <div
      v-for="(tv, id) in mediaStore.TvShows"
      :key="id"
      class="flex flex-wrap gap-4 justify-center items-center p-4 w-[400px]"
    >
      <UCard class="w-full" @click="$router.push({ name: 'Media Details', params: { media: 'tv', id: tv.id } })">
        <UCardHeader>
          <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" alt="">
        </UCardHeader>
        <UCardBody class="flex justify-center items-center">
          <h1 class="text-2xl font-bold text-center">
            {{ tv.name }}
          </h1>
        </UCardBody>
      </UCard>
    </div>
  </div>
</template>

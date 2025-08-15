<script setup lang="ts">
definePageMeta({
  name: 'Genre Lists',
})

const route = useRoute()
const genreStore = useGenreStore()
const {locale} = useI18n()
const mediaType = computed(() => route.params.genre as string) 
const genreId = computed(() => route.params.id)
const genreName = computed(() => {
  const genre = genreStore.moviesGenres?.find(g => g.id === Number(genreId.value)) || 
                genreStore.tvGenres?.find(g => g.id === Number(genreId.value))
  return genre ? genre.name : ''
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  genreStore.page = "1"
  genreStore.genreMedia = []
})
onMounted(async() => {
  genreStore.genreMedia=[]
    await genreStore.fetchGenreMedia(mediaType.value as MediaType, Number(genreId.value))
})
watch(locale, async () => {
  genreStore.genreMedia = []
  await genreStore.fetchGenreMedia(mediaType.value as MediaType, Number(genreId.value))
}, { immediate: false, deep: true })
watch(mediaType, async () => {
  await genreStore.fetchGenreMedia(mediaType.value as MediaType, Number(genreId.value))
}, { immediate: false, deep: true })
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  genreStore.page = "1"
  genreStore.genreMedia = []
})
function handleScroll() {
  const scrollPosition = window.scrollY + window.innerHeight + 35
  const pageHeight = document.body.offsetHeight
  if (scrollPosition >= pageHeight) {
    genreStore.page = String(Number(genreStore.page) + 1)
    genreStore.fetchGenreMedia(mediaType.value as MediaType, Number(genreId.value))
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 uppercase">
      {{ mediaType === 'movie' ? 'MOVIES' : 'TV SHOWS' }} - {{ genreName }}
    </h1>
    
    <div v-if="genreStore.genreMedia?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <media-card
        v-for="media in genreStore.genreMedia"
        :key="media.id"
        :media="media"
        class="cursor-pointer hover:scale-105 transition-transform"
        @click="$router.push({ 
          name: 'Media Details', 
          params: { media: mediaType, id: media.id } 
        })"
      />
    </div>
    
    
  </div>
</template>
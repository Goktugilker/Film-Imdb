<script setup lang="ts">
const mediaStore = useMediaStore()
const { locale } = useI18n()

onMounted(async () => {
  mediaStore.fetchMedias('tv')
})
watch(locale, async () => {
  mediaStore.fetchMedias('tv')
}, { immediate: false, deep: true })
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  mediaStore.page = 1
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  mediaStore.page = 1
  mediaStore.medias = []
})
function handleScroll() {
  const scrollPosition = window.scrollY + window.innerHeight + 25
  const pageHeight = document.body.offsetHeight
  if (scrollPosition >= pageHeight) {
    mediaStore.page += 1
    mediaStore.fetchMedias('tv')
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-4 h-full w-full justify-center">
    <h1 class="text-3xl font-bold w-full text-center mb-4">
      {{ $t('Tv_Shows') }}
    </h1>
    <media-card
      v-for="(media, id) in mediaStore.medias"
      :key="id"
      :media="media"
      class="w-[250px] cursor-pointer transition-all hover:shadow-2xl mb-12 mx-5 hover:shadow-red-800"
      @click="$router.push({ name: 'Media Details', params: { media: 'tv', id: media.id } })"
    />
  </div>
</template>

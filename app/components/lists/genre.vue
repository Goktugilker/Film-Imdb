<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const genreStore = useGenreStore()
const router = useRouter()
const {locale}=useI18n()

onMounted(async () => {
  await Promise.all([
    genreStore.fetchGenres('movie'),
    genreStore.fetchGenres('tv'),
  ])
})
watch(locale, () => {
  genreStore.tvGenres=[]
  genreStore.moviesGenres=[]
  genreStore.fetchGenres('movie')
  genreStore.fetchGenres('tv')
})

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Movies',
    icon: 'i-lucide-film',
    children: genreStore.moviesGenres?.map(genre => ({
      label: genre.name,
      onSelect: () => router.push({ name: 'Genre Lists', params: { genre: 'movie', id: genre.id } }),
    })) || [],
  },
  {
    label: 'Tv',
    icon: 'i-lucide-tv',
    children: genreStore.tvGenres?.map(genre => ({
      label: genre.name,
      onSelect: () => router.push({ name: 'Genre Lists', params: { genre: 'tv', id: genre.id } }),
    })) || [],
  },
])
</script>

<template>
  <UNavigationMenu
    arrow
    content-orientation="vertical"
    :items="items"
    class="w-full justify-center text-lg [&_button]:!text-primary [&_button:hover]:!text-primary-600 [&_button_*]:!text-primary [&_button:hover_*]:!text-primary-600"
  />
</template>

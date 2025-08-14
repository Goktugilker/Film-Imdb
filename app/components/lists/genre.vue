<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const genreStore = useGenreStore()
const router = useRouter()

onMounted(async () => {
  await Promise.all([
    genreStore.fetchGenres('movie'),
    genreStore.fetchGenres('tv'),
  ])
})

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: 'Movies',
    icon: 'i-lucide-film',
    children: genreStore.moviesGenres?.map(genre => ({
      label: genre.name,
      onSelect: () => router.push({ name: 'Genre Lists', params: { media: 'movie', genre: genre.id } }),
    })) || [],
  },
  {
    label: 'Tv',
    icon: 'i-lucide-tv',
    children: genreStore.tvGenres?.map(genre => ({
      label: genre.name,
      onSelect: () => router.push({ name: 'Genre Lists', params: { media: 'tv', genre: genre.id } }),
    })) || [],
  },
])
</script>

<template>
  <UButtonGroup>
    <UDropdownMenu :items="items">
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-chevron-down"
      />
    </UDropdownMenu>
  </UButtonGroup>
</template>

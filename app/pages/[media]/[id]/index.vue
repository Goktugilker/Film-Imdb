<script setup lang="ts">
import type { MediaType } from '~/type'

definePageMeta({
  name: 'Media Details',
})

const route = useRoute()
const mediaType: string | undefined = (route.params.media as MediaType | undefined) ?? undefined
</script>

<template>
  <!-- Filmler -->
  <details-movie v-if="mediaType === 'movies'" />
  <!-- Diziler -->
  <details-tv v-if="mediaType === 'tv'" />
</template>

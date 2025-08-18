<script setup lang="ts">
definePageMeta({
  name: 'Media List',
})
const route = useRoute()
const router = useRouter()
const mediaType = route.params.media as string
if (mediaType !== 'movie' && mediaType !== 'tv') {
  router.push({ name: '404 Not Found' })
}
</script>

<template>
  <ListsMedia />
</template>

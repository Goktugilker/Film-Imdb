<script setup lang="ts">
const props = defineProps<{
  vote_average: number
}>()
</script>

<template>
  <div>
    <span v-for="index in Math.floor(props.vote_average / 2)" :key="`full-${index}`" class="text-yellow-400">★</span>
    <span v-for="index in 5 - Math.floor(props.vote_average / 2)" :key="`empty-${index}`" class="text-gray-400">★</span>
  </div>
</template>

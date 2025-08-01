<script setup lang="ts">
const props = defineProps<{
  vote_average: number
}>()

function getStarWidth(index: number) {
  const rating = props.vote_average / 2
  let value = (rating - (index - 1)) * 100
  if (value > 100)
    value = 100
  if (value < 0)
    value = 0
  return `${value}%`
}
</script>

<template>
  <div class="flex">
    <span v-for="index in 5" :key="index" class="relative text-gray-400">
      <span
        class="absolute inset-0 overflow-hidden text-yellow-400"
        :style="{ width: getStarWidth(index) }"
      >★</span>
      ★
    </span>
  </div>
</template>

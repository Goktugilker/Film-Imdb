<script setup lang="ts">
defineProps<{
  media: Media
}>()
</script>

<template>
  <div
    class="min-w-[200px] w-[200px] cursor-pointer hover:scale-110 transition-transform rounded-4xl border -mb-7"
    :class="isDark ? 'border-gray-700' : 'border-gray-900'"
  >
    <div>
      <img
        v-if="media.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
        alt=""
        class="w-xl h-auto rounded-4xl"
      >
    </div>
    <div class="flex flex-col justify-center items-center h-[100px] p-2">
      <h1 class="text-2xl font-bold flex flex-wrap justify-center ">
        {{ (media.title ?? media.name ?? '').length > 25 ? `${(media.title ?? media.name ?? '').slice(0, 25)}...` : (media.title ?? media.name) }}
      </h1>
      <div class="flex justify-center items-center mt-2">
        <MediaRateStar :vote_average="media.vote_average" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  media: Media
}>()
</script>

<template>
  <div v-if="media.poster_path && (media.title || media.name)" class="min-w-[200px] w-[200px] h-[400px] cursor-pointer hover:scale-110 transition-transform rounded-4xl overflow-hidden flex flex-col">
    <img
      v-if="media.poster_path"
      :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
      alt=""
      class="w-full h-[300px] object-cover rounded-t-4xl flex-shrink-0"
    >

    <div class="bg-gradient-to-b to-fuchsia-600/80 from-transparent md:bg-gradient-to-b md:to-transparent md:from-transparent md:bg-gray-100 md:dark:bg-gray-800  rounded-b-4xl h-[100px] flex flex-col justify-center">
      <h1 class="text-md font-bold text-center mb-2 line-clamp-3 leading-tight text-white md:text-gray-900 md:dark:text-white">
        {{ media.title ?? media.name ?? '' }}
      </h1>
      <div class="flex justify-center items-center">
        <MediaRateStar :vote_average="media.vote_average" />
      </div>
    </div>
  </div>
</template>

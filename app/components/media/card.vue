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

    <div class=" bg-gray-100 dark:bg-gray-800  rounded-b-4xl h-[150px] flex flex-col ">
      <h1 class="text-sm font-bold ml-3 mt-3 line-clamp-3 leading-tight text-gray-900dark:text-white">
        {{ media.title?.slice(0, 25) ?? media.name?.slice(0, 25) ?? '' }}
        <span v-if="(media.title && media.title.length > 25) || (media.name && media.name.length > 25)">...</span>
      </h1>
      <h3 class="text-xs text-gray-500 dark:text-gray-400 ml-3">
        {{ media.release_date ?? media.first_air_date ?? '' }}
      </h3>
      <div class="flex ml-3 items-center">
        <MediaRateStar :vote_average="media.vote_average" />
      </div>
    </div>
  </div>
</template>

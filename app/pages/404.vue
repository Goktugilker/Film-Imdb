<script setup lang="ts">
definePageMeta({
  name: '404 Not Found',
})
</script>

<template>
    <div class="flex flex-col items-center justify-center h-dvh">
        <h1 class="text-4xl font-bold text-gray-600">{{$t("404_Page")}}</h1>
        <p class="text-gray-500 mt-2">{{$t("looking_page")}}</p>
    </div>
</template>

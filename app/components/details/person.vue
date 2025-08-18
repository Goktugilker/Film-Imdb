<script setup lang="ts">
const route = useRoute()
const mediaType = route.params.media as 'movie' | 'tv'
const personId = route.params.person as string
const detailsStore = useDetailStore()
onMounted(() => {
       detailsStore.fetchPersonDetail(mediaType, personId)
})
</script>

<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Person Details</h1>
        <div v-if="detailsStore.person.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(person, index) in detailsStore.person" :key="index" class="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <img :src="`https://image.tmdb.org/t/p/w200${person.profile_path}`" alt="" class="w-full h-64 object-cover rounded mb-4">
            <h2 class="text-xl font-semibold">{{ person.name }}</h2>
            <p class="text-gray-600 dark:text-gray-300">{{ person.character }}</p>
        </div>
        </div>
        <div v-else class="text-gray-500 dark:text-gray-400">No person details found.</div>
    </div>
</template>
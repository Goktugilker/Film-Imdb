<script setup lang="ts">

const favoriteMovie = useFavoriteMovie()
onMounted(async () => {
  await favoriteMovie.fetchData()
})
</script>

<template>
  <div class="overflow-hidden justify-center items-center">
    <h1 class="text-2xl font-bold">
      FİLMLER
    </h1>
    <div>
      {{ favoriteMovie.Movies.length }} adet film
    </div>
    <div class="flex animate-scroll-x space-x-6 w-max px-4 py-2">
      <UCard v-for="(movie,id) in favoriteMovie.Movies" :key="id" class="min-w[200px]  " @click="$router.push(`/movie/${id}`)">
        <UCardHeader>
          <h1 class="text-2xl font-bold">
            Welcome to the Home Page
          </h1>
        </UCardHeader>
        <UCardBody @click="$router.push(`/movie/${id}`)">
          <p>This is the main content area of the home page.</p>
        </UCardBody>
      </UCard>
    </div>
  </div>
</template>

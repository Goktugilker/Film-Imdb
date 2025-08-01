<script setup lang="ts">
import type { MediaType } from '~/type'

const route = useRoute()
const videostore = useVideoStore()
const detailsStore = useDetailStore()
const ratedStore = useRatedStore()
const mediaType: string | undefined = (route.params.media as MediaType | undefined) ?? undefined
const movieId = Number(route.params.id)

onMounted(async () => {
  detailsStore.details = []
  detailsStore.cast = []
  videostore.movieVideos = []
  await detailsStore.fetchDetails(movieId, 'movie')
  await detailsStore.fetchCreditsMovie(movieId)
  await ratedStore.fetchRatedMovies()
  await videostore.fetchMovieVideos(movieId)
})
</script>

<template>
  <div v-if="mediaType === 'movies'" class="overflow-hidden flex flex-col justify-center">
    <div class="w-full relative ">
      <div class="bottom-0 left-0 z-1 absolute p-4 text-white flex flex-col gap-2">
        <div class="flex flex-row gap-2">
          <h1 class="text-2xl">
            {{ detailsStore.details[0]?.title }}
          </h1>
          <media-rate-star :vote_average="detailsStore.details[0]?.vote_average ?? 0" />
        </div>
        <h4>{{ detailsStore.details[0]?.overview }}</h4>
      </div>
      <img :src="`https://image.tmdb.org/t/p/original${detailsStore.details[0]?.backdrop_path}`" alt="TV Show Backdrop" class="w-full h-[450px] object-cover object-top">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
    <div class="w-full p-4 flex flex-col md:flex-row gap-4">
      <div class="w-full md:w-1/4">
        <img :src="`https://image.tmdb.org/t/p/w500${detailsStore.details[0]?.poster_path}`" alt="Movie Backdrop" class="w-full object-cover mb-4">
      </div>
      <div class="w-full md:w-3/4 md:p-16">
        <h1 class="text-xl md:text-3xl font-bold mb-4">
          {{ detailsStore.details[0]?.title }}
        </h1>
        <div class="flex flex-row gap-4 w-full mt-6">
          <div class="w-1/2 flex flex-col">
            <p class="mt-2 text-lg md:text-xl --ui-txt-color">
              Release Date: {{ detailsStore.details[0]?.release_date }}
            </p>
            <p class="mt-2 text-lg md:text-xl --ui-txt-color">
              Popularity: {{ detailsStore.details[0]?.popularity }}
            </p>
            <p class="mt-2 text-lg md:text-xl --ui-txt-color">
              Vote Count: {{ detailsStore.details[0]?.vote_count }}
            </p>
            <p class="mt-2 text-lg md:text-xl --ui-txt-color">
              Vote Average: {{ detailsStore.details[0]?.vote_average }}
            </p>
          </div>
          <div class="w-1/2 flex flex-col">
            <p class="mt-2 text-lg md:text-xl --ui-txt-color">
              Original Language: {{ detailsStore.details[0]?.original_language }}
            </p>
            <p class="mt-2 text-lg md:text-xl --ui-txt-color">
              Runtime: {{ detailsStore.details[0]?.runtime }} minutes
            </p>
            <p class="mt-2 text-lg md:text-xl --ui-txt-color">
              Genres:
              <span v-for="(genre, index) in detailsStore.details[0]?.genres" :key="index" class="text-gray-500">
                {{ genre.name }}<span v-if="index < (detailsStore.details[0]?.genres?.length ?? 0) - 1">, </span>
              </span>
            </p>
            <p class="mt-2 text-sm text-gray-500">
              Rating: {{ detailsStore.details[0]?.vote_average }}
            </p>
          </div>
        </div>
        <div class="flex overflow-x-auto gap-4 w-full px-4 py-2">
          <u-card v-for="(cast, index) in detailsStore.cast.slice(0, 20)" :key="index" class="flex flex-row items-center gap-4 mt-4 min-w-max flex-shrink-0">
            <img :src="`https://image.tmdb.org/t/p/w200${cast.profile_path}`" alt="Cast Image" class="w-20 h-20 object-cover rounded-full">
            <div>
              <h2 class="text-lg font-semibold whitespace-nowrap">
                {{ cast.name }}
              </h2>
              <p class="text-sm text-gray-500 whitespace-nowrap">
                {{ cast.character }}
              </p>
            </div>
          </u-card>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-4  justify-around w-full">
      <div v-if="videostore.movieVideos.length >= 3" class="flex flex-row gap-4 w-full ">
        <iframe v-for="(video, id) in 3" :key="id" class="w-1/3 aspect-video mb-4" :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
      </div>
      <div v-else-if="videostore.movieVideos.length === 2" class="flex flex-row gap-4 mb-4 w-full">
        <iframe v-for="(video, id) in videostore.movieVideos.length" :key="id" class=" aspect-video mb-4 w-1/2 " :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
      </div>
      <div v-else-if="videostore.movieVideos.length === 1" class="flex flex-row gap-4 mb-4 w-full">
        <iframe v-for="(video, id) in videostore.movieVideos.length" :key="id" class="w-full aspect-video mb-4 " :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
      </div>
    </div>
    <h1 class="text-lg md:text-xl font-bold pl-6">
      Top Rated Movies
    </h1>
    <div class="flex overflow-x-auto gap-4 w-full px-4 py-2">
      <div v-for="(rated, index) in ratedStore.rated" :key="index">
        <u-card class="flex flex-row items-center gap-4 mt-4 min-w-max flex-shrink-0 cursor-pointer" @click="$router.push({ name: 'Media Details', params: { media: 'movies', id: rated.id } })">
          <div>
            <img :src="`https://image.tmdb.org/t/p/w185${rated.poster_path}`" alt="">
            <p class="text-lg whitespace-normal break-words">
              {{ rated.title }}
            </p>
          </div>
        </u-card>
      </div>
    </div>
  </div>
</template>

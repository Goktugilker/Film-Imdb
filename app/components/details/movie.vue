<script setup lang="ts">
import type { MediaType } from '~/type'

const { locale } = useI18n()
const route = useRoute()
const videostore = useVideoStore()

const detailsStore = useDetailStore()
const ratedStore = useRatedStore()
const mediaType: string | undefined = (route.params.media as MediaType | undefined) ?? undefined
const movieId = Number(route.params.id)
const page = ref<'overview' | 'videos'>('overview')

onMounted(async () => {
  detailsStore.details = []
  detailsStore.cast = []
  videostore.movieVideos = []
  watch(locale, async () => {
    await detailsStore.fetchDetails(movieId, 'movie')
    await ratedStore.fetchRatedMovies()
  }, { immediate: true, deep: true })
  await detailsStore.fetchCreditsMovie(movieId)
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
      <img :src="`https://image.tmdb.org/t/p/original${detailsStore.details[0]?.backdrop_path}`" alt="Movie Backdrop" class="w-full h-[450px] object-cover object-top">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
    <div class="flex flex-col md:flex-row gap-4 mt-5 px-14 py-4">
      <div class="w-full flex flex-row gap-4">
        <u-button
          :label="$t('Overview')"
          variant="outline"
          size="xl"
          :class="{ 'bg-primary text-white': page === 'overview' }"
          class="w-full"
          @click="page = 'overview'"
        />

        <u-button
          :label="$t('Videos')"
          size="xl"
          variant="outline"
          class="w-full"
          :class="{ 'bg-primary text-white': page === 'videos' }"
          @click="page = 'videos'"
        />
      </div>
    </div>
    <div class="w-full p-4 flex flex-col md:flex-row gap-4 pt-8">
      <div class="w-full md:w-1/4">
        <img :src="`https://image.tmdb.org/t/p/w500${detailsStore.details[0]?.poster_path}`" alt="Movie Poster" class="w-full object-cover rounded-4xl">
      </div>

      <div v-if="page === 'overview'" class="w-full md:w-3/4 ">
        <div class="flex flex-col">
          <div>
            <h1 class="text-xl md:text-3xl font-bold mb-4">
              {{ detailsStore.details[0]?.title }}
            </h1>
            <div class="flex flex-row gap-4 w-full mt-6">
              <div class="w-1/2 flex flex-col">
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{ $t('Release-Date') }}: {{ detailsStore.details[0]?.release_date }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{ $t('Popularity') }}: {{ detailsStore.details[0]?.popularity }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{ $t('Vote_Count') }}: {{ detailsStore.details[0]?.vote_count }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{ $t('Vote_Average') }}: {{ detailsStore.details[0]?.vote_average }}
                </p>
              </div>
              <div class="w-1/2 flex flex-col">
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{ $t('Original_Language') }}: {{ detailsStore.details[0]?.original_language }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{ $t('Runtime') }}: {{ detailsStore.details[0]?.runtime }} minutes
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{ $t('Genres') }}:
                  <span v-for="(genre, index) in detailsStore.details[0]?.genres" :key="index" class="text-gray-500">
                    {{ genre.name }}<span v-if="index < (detailsStore.details[0]?.genres?.length ?? 0) - 1">, </span>
                  </span>
                </p>
                <p class="mt-2 text-sm text-gray-500">
                  {{ $t('Rating') }}: {{ detailsStore.details[0]?.vote_average }}
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
      </div>
      <div v-if="page === 'videos'" class="w-full md:w-11/16 flex flex-col py-5">
        <div class="flex flex-row gap-4  justify-around w-full overflow-x-auto px-10 ">
          <div v-if="videostore.movieVideos.length >= 3" class="flex flex-row gap-4 w-full ">
            <iframe v-for="(video, id) in 10" :key="id" class="w-full aspect-video mb-4  rounded-4xl" :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
          <div v-else-if="videostore.movieVideos.length === 2" class="flex flex-row gap-4 mb-4 w-full">
            <iframe v-for="(video, id) in videostore.movieVideos.length" :key="id" class=" aspect-video mb-4 w-full  rounded-4xl " :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
          <div v-else-if="videostore.movieVideos.length === 1" class="flex flex-row gap-4 mb-4 w-full">
            <iframe v-for="(video, id) in videostore.movieVideos.length" :key="id" class="w-full aspect-video mb-4  rounded-4xl " :src="`https://www.youtube.com/embed/${videostore.movieVideos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-lg md:text-xl font-bold pl-6 pt-8">
      {{ $t('Top_Rated') }} {{ $t('movies') }}
    </h1>
    <div class="flex overflow-x-auto gap-4 w-full px-4 py-2">
      <div v-for="(rated, index) in ratedStore.rated" :key="index">
        <u-card class="flex flex-row gap-4 mt-4 w-[215px] flex-shrink-0 cursor-pointer h-[330px] rounded-[50px]" @click="$router.push({ name: 'Media Details', params: { media: 'movies', id: rated.id } })">
          <div class="flex flex-col items-center justify-between">
            <img :src="`https://image.tmdb.org/t/p/w185${rated.poster_path}`" alt="" class=" object-cover rounded-4xl">
            <p class="text-lg whitespace-normal break-words">
              {{ rated.title }}
            </p>
          </div>
        </u-card>
      </div>
    </div>
  </div>
</template>

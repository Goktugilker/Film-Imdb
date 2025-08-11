<script setup lang="ts">
import type { MediaType } from '~/type'

const route = useRoute()
const ratedStore = useRatedStore()
const videostore = useVideoStore()
const detailsStore = useDetailStore()
const mediaType: string | undefined = (route.params.media as MediaType | undefined) ?? undefined
const tvId = Number(route.params.id)
const page = ref<'overview' | 'videos'>('overview')

onMounted(async () => {
  detailsStore.details = []
  detailsStore.cast = []
  videostore.tvVideos = []
  watch(lang, async () => {
    await detailsStore.fetchDetails(tvId, 'tv')
    await ratedStore.fetchRatedTv()
  }, { immediate: true })
  await detailsStore.fetchCreditsTv(tvId)
  await videostore.fetchTvVideos(tvId)
})
</script>

<template>
  <div v-if="mediaType === 'tv'" class="overflow-hidden flex flex-col justify-center">
    <div class="w-full relative ">
      <div class="bottom-0 left-0 z-1 absolute p-4 text-white flex flex-col gap-2">
        <div class="flex flex-row gap-2">
          <h1 class="text-2xl">
            {{ detailsStore.details[0]?.name }}
          </h1>
          <media-rate-star :vote_average="detailsStore.details[0]?.vote_average ?? 0" />
        </div>
        <h4>{{ detailsStore.details[0]?.overview }}</h4>
      </div>
      <img :src="`https://image.tmdb.org/t/p/original${detailsStore.details[0]?.backdrop_path}`" alt="TV Show Backdrop" class="w-full h-[450px] object-cover object-top">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
    <div class="w-full p-4 flex flex-col md:flex-row gap-4 pt-8 ">
      <div class="w-full md:w-1/4">
        <img :src="`https://image.tmdb.org/t/p/w500${detailsStore.details[0]?.poster_path}`" alt="TV Show Poster" class="w-full object-cover mb-4 rounded-4xl">
      </div>

      <div v-if="page === 'overview'" class="w-full md:w-3/4 ">
        <div class="flex flex-col">
          <div class="flex flex-col md:flex-row gap-4 mb-5">
            <div class="w-full flex flex-row gap-4">
              <u-button
                label="Overview"
                variant="outline"
                :class="{ 'bg-primary text-white': page === 'overview' }"
                class="w-full"
                @click="page = 'overview'"
              />

              <u-button
                label="Videos"
                variant="outline"
                class="w-full"
                @click="page = 'videos'"
              />
            </div>
          </div>
          <div>
            <h1 class="text-xl md:text-3xl font-bold mb-4">
              {{ detailsStore.details[0]?.name }}
            </h1>
            <div class="flex flex-row gap-4 w-full mt-6">
              <div class="w-1/2 flex flex-col">
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{$t('First Air Date')}}: {{ detailsStore.details[0]?.first_air_date }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{$t('Popularity')}}: {{ detailsStore.details[0]?.popularity }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{$t('Vote_Count')}}: {{ detailsStore.details[0]?.vote_count }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{$t('Vote_Average')}}: {{ detailsStore.details[0]?.vote_average }}
                </p>
              </div>
              <div class="w-1/2 flex flex-col">
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{$t('Original_Language')}}: {{ detailsStore.details[0]?.original_language }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{$t('Seasons')}}: {{ detailsStore.details[0]?.number_of_seasons }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{$t('Episodes')}}: {{ detailsStore.details[0]?.number_of_episodes }}
                </p>
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  {{$t('Genres')}}:
                  <span v-for="(genre, index) in detailsStore.details[0]?.genres" :key="index" class="text-gray-500">
                    {{ genre.name }}<span v-if="index < (detailsStore.details[0]?.genres?.length ?? 0) - 1">, </span>
                  </span>
                </p>
                <p class="mt-2 text-sm text-gray-500">
                  {{$t('Rating')}}: {{ detailsStore.details[0]?.vote_average }}
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
      <div v-if="page === 'videos'" class="w-full flex flex-col">
        <div class="flex flex-col md:flex-row gap-4 mb-5">
          <div class="w-full flex flex-row gap-4 mt">
            <u-button
              label="Overview"
              variant="outline"
              class="w-full"
              @click="page = 'overview'"
            />

            <u-button
              label="Videos"
              variant="outline"
              class="w-full"
              :class="{ 'bg-primary text-white': page === 'videos' }"
              @click="page = 'videos'"
            />
          </div>
        </div>
        <div class="flex flex-row gap-4  justify-around w-full overflow-x-auto px-10 py-16">
          <div v-if="videostore.tvVideos.length >= 3" class="flex flex-row gap-4 w-full ">
            <iframe v-for="(video, id) in 10" :key="id" class="w-3/6 aspect-video mb-4  rounded-4xl" :src="`https://www.youtube.com/embed/${videostore.tvVideos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
          <div v-else-if="videostore.tvVideos.length === 2" class="flex flex-row gap-4 mb-4 w-full">
            <iframe v-for="(video, id) in videostore.tvVideos.length" :key="id" class=" aspect-video mb-4 w-1/2  rounded-4xl " :src="`https://www.youtube.com/embed/${videostore.tvVideos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
          <div v-else-if="videostore.tvVideos.length === 1" class="flex flex-row gap-4 mb-4 w-full">
            <iframe v-for="(video, id) in videostore.tvVideos.length" :key="id" class="w-full aspect-video mb-4  rounded-4xl " :src="`https://www.youtube.com/embed/${videostore.tvVideos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-lg md:text-xl font-bold pl-6 pt-8">
      {{$t('Top_Rated')}} {{$t('Tv_Shows')}}
    </h1>
    <div class="flex overflow-x-auto gap-4 w-full px-4 py-2">
      <div v-for="(rated, index) in ratedStore.rated" :key="index">
        <u-card class="flex flex-row gap-4 mt-4 w-[215px] flex-shrink-0 cursor-pointer h-[330px] rounded-[50px]" @click="$router.push({ name: 'Media Details', params: { media: 'tv', id: rated.id } })">
          <div class="flex flex-col items-center justify-between">
            <img :src="`https://image.tmdb.org/t/p/w185${rated.poster_path}`" alt="" class=" object-cover rounded-4xl">
            <p class="text-lg whitespace-normal break-words">
              {{ rated.name }}
            </p>
          </div>
        </u-card>
      </div>
    </div>
  </div>
</template>

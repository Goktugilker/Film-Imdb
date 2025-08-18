<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locale } = useI18n()
const route = useRoute()
const videostore = useVideoStore()
const detailsStore = useDetailStore()
const ratedStore = useRatedStore()
const mediaType: MediaType = (route.params.media as MediaType | undefined) ?? 'movie'
const mediaId = Number(route.params.id)
const page = ref<'overview' | 'videos'>('overview')

onMounted(async () => {
  await detailsStore.fetchDetails(mediaId, mediaType)
  await detailsStore.fetchCredits(mediaId, mediaType)
  await videostore.fetchVideos(mediaId, mediaType)
  await ratedStore.fetchRated(mediaType)
  await ratedStore.fetchRecommendations(mediaType, mediaId)
})
onBeforeUnmount(() => {
  detailsStore.details = []
  detailsStore.cast = []
  videostore.videos = []
  ratedStore.rated = []
  ratedStore.ratedPage = '1'
  ratedStore.recommendations = []
  ratedStore.recommendationsPage = '1'
})

watch(locale, async () => {
  ratedStore.ratedPage = '1'
  ratedStore.recommendationsPage = '1'

  ratedStore.rated = []
  ratedStore.recommendations = []

  await nextTick()

  // Yeni dilde verileri çek (sayfa 1'den başlayarak)
  await detailsStore.fetchDetails(mediaId, mediaType)
  await detailsStore.fetchCredits(mediaId, mediaType)
  await videostore.fetchVideos(mediaId, mediaType)

  await ratedStore.fetchRated(mediaType)
  await ratedStore.fetchRecommendations(mediaType, mediaId)
}, { immediate: false, deep: true })

const scrollContainer = ref<HTMLElement>()
const recommendationsScrollContainer = ref<HTMLElement>()
let scrollInterval: NodeJS.Timeout | null = null
let recommendationsScrollInterval: NodeJS.Timeout | null = null

// Mouse pozisyonuna göre scroll (Rated için)
function handleMouseMove(event: MouseEvent) {
  if (!scrollContainer.value)
    return

  const container = scrollContainer.value
  const rect = container.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const containerWidth = rect.width

  // Sağ tarafta mı kontrolü (son %20'lik kısım)
  if (mouseX > containerWidth * 0.8) {
    startAutoScroll('right')
  }
  // Sol tarafta mı kontrolü (ilk %20'lik kısım)
  else if (mouseX < containerWidth * 0.2) {
    startAutoScroll('left')
  }
  else {
    stopAutoScroll()
  }
}

// Mouse pozisyonuna göre scroll (Recommendations için)
function handleRecommendationsMouseMove(event: MouseEvent) {
  if (!recommendationsScrollContainer.value)
    return

  const container = recommendationsScrollContainer.value
  const rect = container.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const containerWidth = rect.width

  // Sağ tarafta mı kontrolü (son %20'lik kısım)
  if (mouseX > containerWidth * 0.8) {
    startRecommendationsAutoScroll('right')
  }
  // Sol tarafta mı kontrolü (ilk %20'lik kısım)
  else if (mouseX < containerWidth * 0.2) {
    startRecommendationsAutoScroll('left')
  }
  else {
    stopRecommendationsAutoScroll()
  }
}

// Otomatik scroll başlat (Rated için)
function startAutoScroll(direction: 'left' | 'right') {
  if (scrollInterval)
    return

  scrollInterval = setInterval(() => {
    if (!scrollContainer.value)
      return

    const scrollAmount = direction === 'right' ? 5 : -5
    scrollContainer.value.scrollLeft += scrollAmount
  }, 16) // 60fps
}

// Otomatik scroll başlat (Recommendations için)
function startRecommendationsAutoScroll(direction: 'left' | 'right') {
  if (recommendationsScrollInterval)
    return

  recommendationsScrollInterval = setInterval(() => {
    if (!recommendationsScrollContainer.value)
      return

    const scrollAmount = direction === 'right' ? 5 : -5
    recommendationsScrollContainer.value.scrollLeft += scrollAmount
  }, 16) // 60fps
}

// Otomatik scroll durdur (Rated için)
function stopAutoScroll() {
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

// Otomatik scroll durdur (Recommendations için)
function stopRecommendationsAutoScroll() {
  if (recommendationsScrollInterval) {
    clearInterval(recommendationsScrollInterval)
    recommendationsScrollInterval = null
  }
}

const scrollPosition = ref(0)

// Scroll kontrol fonksiyonu (Rated için)
function onRatedScroll(event: Event) {
  const element = event.target as HTMLElement
  const { scrollLeft, scrollWidth, clientWidth } = element
  scrollPosition.value = scrollLeft

  if (scrollLeft + clientWidth >= scrollWidth - 50) {
    ratedStore.ratedPage = String(Number(ratedStore.ratedPage) + 1)
    ratedStore.fetchRated(mediaType)
  }
}

// Scroll kontrol fonksiyonu (Recommendations için)
function onRecommendationsScroll(event: Event) {
  const element = event.target as HTMLElement
  const { scrollLeft, scrollWidth, clientWidth } = element
  scrollPosition.value = scrollLeft

  if (scrollLeft + clientWidth >= scrollWidth - 50) {
    ratedStore.recommendationsPage = String(Number(ratedStore.recommendationsPage) + 1)
    ratedStore.fetchRecommendations(mediaType, mediaId)
  }
}

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: $t('Overview'),
      value: 'overview',
      onClick: () => {
        page.value = 'overview'
        nextTick(() => {
          const overviewSection = document.getElementById('overview-section')
          if (overviewSection) {
            overviewSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        })
      },
    },
    {
      label: $t('Videos'),
      value: 'videos',
      onClick: () => {
        page.value = 'videos'
        nextTick(() => {
          const videosSection = document.getElementById('videos-section')
          if (videosSection) {
            videosSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        })
      },
    },
    {
      label: $t('Top_Rated'),
      value: 'rated',
      onClick: () => {
        const ratedSection = document.getElementById('rated-section')
        if (ratedSection) {
          ratedSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      },
    },
    {
      label: $t('recommendations'),
      value: 'recommendations',
      onClick: () => {
        const recommendationsSection = document.getElementById('recommendations-section')
        if (recommendationsSection) {
          recommendationsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      },
    },
  ],
])
</script>

<template>
  <div class="overflow-hidden flex flex-col justify-center">
    <div class="w-full relative ">
      <div class="bottom-0 left-0 z-1 absolute p-4 text-white flex flex-col gap-2">
        <div class="flex flex-row gap-2">
          <h1 class="text-2xl">
            {{ detailsStore.details[0]?.title || detailsStore.details[0]?.name }}
          </h1>
          <media-rate-star :vote_average="detailsStore.details[0]?.vote_average ?? 0" />
        </div>
        <h4>{{ detailsStore.details[0]?.overview }}</h4>
      </div>
      <img :src="`https://image.tmdb.org/t/p/original${detailsStore.details[0]?.backdrop_path}`" alt="Movie Backdrop" class="w-full h-[450px] object-cover object-top">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
    <div class="flex flex-col md:flex-row gap-4 mt-5 px-14 py-4">
      <div class="w-full flex flex-row gap-4 relative">
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

        <UDropdownMenu
          :items="items"
          :ui="{
            content: 'w-48',
          }"
        >
          <UButton
            icon="i-lucide-menu" color="primary" variant="ghost" :ui="{
            }"
          />
        </UDropdownMenu>
      </div>
    </div>
    <div class="w-full p-4 flex flex-col md:flex-row gap-12 pt-8 px-14">
      <div class="w-full md:w-1/4">
        <img :src="`https://image.tmdb.org/t/p/w500${detailsStore.details[0]?.poster_path}`" alt="Movie Poster" class="w-full object-cover rounded-4xl">
      </div>

      <div v-if="page === 'overview'" id="overview-section" class="w-full md:w-3/4 ">
        <div class="flex flex-col">
          <div>
            <h1 class="text-xl md:text-3xl font-bold mb-4">
              {{ detailsStore.details[0]?.title || detailsStore.details[0]?.name }}
            </h1>
            <div class="flex flex-row gap-4 w-full mt-6">
              <div class="w-1/2 flex flex-col">
                <p class="mt-2 text-lg md:text-xl --ui-txt-color">
                  <span v-if="mediaType === 'movie'"> {{ $t('Release-Date') }}:</span>
                  <span v-else> {{ $t('First_Aired') }}:</span>
                  {{ detailsStore.details[0]?.release_date || detailsStore.details[0]?.first_air_date }}
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
              <u-card 
              v-for="(cast, index) in detailsStore.cast.slice(0, 20)" :key="index"
               class="flex flex-row items-center gap-4 mt-4 min-w-max flex-shrink-0"
               @click="$router.push({ name: 'Person-Details', params: { type: mediaType, id: cast.id } })"
               >
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
      <div v-if="page === 'videos'" id="videos-section" class="w-full md:w-11/16 flex flex-col py-5">
        <div v-if="videostore.videos.length === 0" class="flex flex-row items-center justify-center w-full h-full">
          <p class="text-gray-500 text-6xl text-center">
            {{ $t('No_Videos_Available') }}
          </p>
        </div>
        <div v-else class="flex flex-row gap-4  justify-around w-full overflow-x-auto px-10 ">
          <div v-if="videostore.videos.length >= 3" class="flex flex-row gap-4 w-full ">
            <iframe v-for="(video, id) in 10" :key="id" class="w-full aspect-video mb-4  rounded-4xl" :src="`https://www.youtube.com/embed/${videostore.videos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
          <div v-else-if="videostore.videos.length === 2" class="flex flex-row gap-4 mb-4 w-full">
            <iframe v-for="(video, id) in videostore.videos.length" :key="id" class=" aspect-video mb-4 w-full  rounded-4xl " :src="`https://www.youtube.com/embed/${videostore.videos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
          <div v-else-if="videostore.videos.length === 1" class="flex flex-row gap-4 mb-4 w-full">
            <iframe v-for="(video, id) in videostore.videos.length" :key="id" class="w-full aspect-video mb-4  rounded-4xl " :src="`https://www.youtube.com/embed/${videostore.videos[id]?.key}`" frameborder="0" allowfullscreen />
          </div>
        </div>
      </div>
    </div>
    <div id="rated-section">
      <h1 class="text-lg md:text-xl font-bold pl-6 pt-8">
        {{ $t('Top_Rated') }}
        <span v-if="mediaType === 'movie'">{{ $t('Movies') }}</span>
        <span v-else>{{ $t('Tv_Shows') }}</span>
      </h1>
      <div
        ref="scrollContainer"
        class="flex overflow-x-auto gap-4 w-full px-4 mb-8 min-h-[460px] items-start scrollbar-hide"
        @scroll="onRatedScroll"
        @mousemove="handleMouseMove"
        @mouseleave="stopAutoScroll"
      >
        <media-card
          v-for="(rated, id) in ratedStore.rated" :key="id"
          :media="rated"
          class="flex-shrink-0 mt-6"
          @click="$router.push({ name: 'Media Details', params: { media: mediaType, id: rated.id } })"
        />
      </div>
      <h1 class="text-lg md:text-xl font-bold pl-6 pt-8">
        {{ $t('recommendations') }}
        <span v-if="mediaType === 'movie'">{{ $t('Movies') }}</span>
        <span v-else>{{ $t('Tv_Shows') }}</span>
      </h1>
      <div
        id="recommendations-section"
        ref="recommendationsScrollContainer"
        class="flex overflow-x-auto gap-4 w-full px-4 mb-8 min-h-[460px] items-start scrollbar-hide"
        @scroll="onRecommendationsScroll"
        @mousemove="handleRecommendationsMouseMove"
        @mouseleave="stopRecommendationsAutoScroll"
      >
        <media-card
          v-for="(recommendations, id) in ratedStore.recommendations" :key="id"
          :media="recommendations"
          class="flex-shrink-0 mt-6"
          @click="$router.push({ name: 'Media Details', params: { media: mediaType, id: recommendations.id } })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

<script setup lang="ts">
const route = useRoute()
const personId = route.params.id as string
const detailsStore = useDetailStore()
const showFullBio = ref(false)
const BIO_LIMIT = 350
const { locale } = useI18n()

onMounted(() => {
  detailsStore.fetchPersonDetail(personId)
  detailsStore.fetchPersonMedia(personId)
})
onBeforeUnmount(() => {
  detailsStore.person = []
})
watch(locale, () => {
  detailsStore.fetchPersonDetail(personId)
  detailsStore.fetchPersonMedia(personId)
})
const biography = computed(() => detailsStore.person[0]?.biography || '')
const isLong = computed(() => biography.value.length > BIO_LIMIT)
const shortBio = computed(() => biography.value.slice(0, BIO_LIMIT))
</script>

<template>
  <div class="overflow-x-hidden pl-4 w-full left-24 md:px-18 py-8 flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 mb-6 md:mb-0">
      <div class="flex flex-col justify-center">
        <img
          :src="`https://image.tmdb.org/t/p/original${detailsStore.person[0]?.profile_path}`"
          alt=""
          class="w-full max-w-3xs aspect-[2/3] object-cover rounded-4xl"
        >
        <h2 class="font-bold text-lg mt-5">
          {{ $t('Known_For') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ detailsStore.person[0]?.known_for_department || $t('Unknown') }}
        </p>
        <h2 class="font-bold text-lg mt-4">
          {{ $t('Birthday') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ detailsStore.person[0]?.birthday || $t('Unknown') }}
        </p>
        <h2 class="text-lg mt-4 font-bold">
          {{ $t('Gender') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ detailsStore.person[0]?.gender === 1 ? $t('Female') : $t('Male') }}
        </p>
        <h2 class="text-lg mt-4 font-bold">
          {{ $t('Place_of_Birth') }}
        </h2>
        <p>{{ detailsStore.person[0]?.place_of_birth }}</p>
        <h2 class="text-lg mt-4 font-bold">
          {{ $t('Also_Known_As') }}
        </h2>
        <div v-if="detailsStore.person[0]?.also_known_as && detailsStore.person[0].also_known_as.length > 0">
          <p v-for="(name, key) in detailsStore.person[0].also_known_as" :key="key">
            {{ name }}
          </p>
        </div>
        <div v-else>
          <p>{{ $t('Unknown') }}</p>
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/3 ">
      <h2 class="text-xl font-bold mt-4">
        {{ detailsStore.person[0]?.name }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line break-words">
        <span>

          {{ showFullBio || !isLong ? biography : `${shortBio}...` }}
        </span>
        <span v-if="biography === ''">
          {{ $t('Biography_Not_Available') }}  

        </span>
      </p>
      <button
        v-if="isLong"
        class="mt-2 text-primary-600 hover:underline focus:outline-none"
        @click="showFullBio = !showFullBio"
      >
        {{ showFullBio ? $t('Show_Less') : $t('Show_More') }}
      </button>

      <div class="mt-12 ">
        <h1 class="font-bold">
          {{ $t('Works_Featured') }}
        </h1>
        <div class="w-full flex flex-row h-116 gap-2 overflow-x-scroll overflow-y-hidden max-w-full">
          <media-card
            v-for="(media, id) in detailsStore.personMedia[0]?.cast ?? []"
            :key="id"
            :media="media"
            class="mt-6 ml-3 flex-shrink-0"
            @click="$router.push({ name: 'Media Details', params: { media: media.media_type, id: media.id } })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

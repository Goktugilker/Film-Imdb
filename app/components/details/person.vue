<script setup lang="ts">
const route = useRoute()
const personId = route.params.id as string
const detailsStore = useDetailStore()
const showFullBio = ref(false)
const BIO_LIMIT = 350

onMounted(() => {
  detailsStore.fetchPersonDetail(personId)
  detailsStore.fetchPersonMedia(personId)
})
onBeforeUnmount(() => {
  detailsStore.person = []
})

const biography = computed(() => detailsStore.person[0]?.biography || '')
const isLong = computed(() => biography.value.length > BIO_LIMIT)
const shortBio = computed(() => biography.value.slice(0, BIO_LIMIT))
</script>

<template>
  <div class="overflow-x-hidden w-full px-16 md:px-18 py-8 flex flex-col md:flex-row">
    <div class="w-full md:w-1/3 mb-6 md:mb-0">
      <div class="flex flex-col justify-center">
        <img
          :src="`https://image.tmdb.org/t/p/original${detailsStore.person[0]?.profile_path}`"
          alt=""
          class="w-full max-w-3xs aspect-[2/3] object-cover rounded-4xl"
        >
        <h2 class="font-bold text-lg mt-5">
          Bilinen İşi
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ detailsStore.person[0]?.known_for_department || 'Bilinmiyor' }}
        </p>
        <h2 class="font-bold text-lg mt-4">
          Doğum Tarihi
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ detailsStore.person[0]?.birthday || 'Bilinmiyor' }}
        </p>
        <h2 class="text-lg mt-4 font-bold">
          Cinsiyet
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          {{ detailsStore.person[0]?.gender === 1 ? 'Kadın' : 'Erkek' }}
        </p>
        <h2 class="text-lg mt-4 font-bold">Doğum Yeri</h2>
        <p>{{ detailsStore.person[0]?.place_of_birth }}</p>
        <h2 class="text-lg mt-4 font-bold">
          Ayrıca Bilindiği İsimleri
        </h2>
        <div v-if="detailsStore.person[0]?.also_known_as && detailsStore.person[0].also_known_as.length > 0">
          <p v-for="(name, key) in detailsStore.person[0].also_known_as" :key="key">
            {{ name }}
          </p>
        </div>
        <div v-else>
          <p>Bilinmiyor</p>
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/3 -mx-8 ">
      <h2 class="text-xl font-bold mt-4">
        {{ detailsStore.person[0]?.name }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line break-words">
        {{ showFullBio || !isLong ? biography : `${shortBio}...` }}
      </p>
      <button
        v-if="isLong"
        class="mt-2 text-primary-600 hover:underline focus:outline-none"
        @click="showFullBio = !showFullBio"
      >
        {{ showFullBio ? 'Daha az göster' : 'Daha fazla oku' }}
      </button>

      <div class="mt-12 ">
        <h1 class="font-bold">Yer aldığı işler</h1>
        <div class="w-full flex flex-row h-116 gap-2 overflow-x-scroll overflow-y-hidden max-w-full">
          <media-card
          v-for="(media, id) in detailsStore.personMedia[0]?.cast ?? []"
          :key="id"
          :media="media"
          class="mt-6 ml-3 flex-shrink-0"
          />
        </div> 
      </div>
    </div>
  </div>
</template>

export const useMediaStore = defineStore('MediaStore', () => {
  const { locale } = useI18n()
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const medias = ref<Media[]>([])
  const selectedMovie = ref<Media[]>([])
  const selectedTvShow = ref<Media>()
  const searchQuery = ref('')
  const page = ref(1)
  const langChange = ref(false)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  function changeLang() {
    langChange.value = true
    page.value = 1
    medias.value = []
  }

  async function fetchMedias(type: MediaType) {
    if (locale.value === 'tr') {
      const response = await fetch(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_null_first_air_dates=false&language=tr-TR&page=${page.value}&sort_by=popularity.desc`, options)
      const data = await response.json()
      medias.value.push(...(data.results as Media[]))
      langChange.value = false
    }
    else if (locale.value === 'en') {
      const response = await fetch(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page.value}&sort_by=popularity.desc`, options)
      const data = await response.json()
      medias.value.push(...(data.results as Media[]))
      langChange.value = false
    }
  }
  async function fetchTvVideos() {
    if (!selectedTvShow.value) {
      throw new Error('No TV show selected')
    }
    if (locale.value === 'tr') {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${selectedTvShow.value.id}/videos?language=tr-TR`, options)
      const data = await response.json()
      selectedTvShow.value = data.results
    }
    if (locale.value === 'en') {
      const response = await fetch(`https://api.themoviedb.org/3/tv/259909/videos?language=en-US`, options)
      const data = await response.json()
      selectedTvShow.value = data.results
    }
  }

  return {
    changeLang,
    fetchMedias,
    fetchTvVideos,
    langChange,
    medias,
    page,
    apiKey,
    selectedMovie,
    searchQuery,
    selectedTvShow,

  }
})

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
   
      const response = await fetch(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_null_first_air_dates=false&language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}&page=${page.value}&sort_by=popularity.desc`, options)
      const data = await response.json()
      medias.value.push(...(data.results as Media[]))
      langChange.value = false
  
  }
  async function fetchTvVideos() {
    if (!selectedTvShow.value) {
      throw new Error('No TV show selected')
    }
   
      const response = await fetch(`https://api.themoviedb.org/3/tv/${selectedTvShow.value.id}/videos?language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}`, options)
      const data = await response.json()
      selectedTvShow.value = data.results
    
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

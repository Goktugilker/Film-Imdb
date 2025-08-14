
export const useSearchStore = defineStore('SearchStore', () => {
  const { locale } = useI18n()
  const resultMovies = ref<Media[]>([])
  const resultTv = ref<Media[]>([])
  const results = ref<Media[]>([])
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }
  async function search(query: string) {
    await searchMovies(query)
    await searchTv(query)
    results.value = [...resultMovies.value, ...resultTv.value]
  }
  async function searchMovies(query: string) {
    if (!query) {
      return []
    }
    if (locale.value === 'tr') {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=tr-TR&page=1`, options)
      const data = await response.json()
      resultMovies.value = data.results
    }
    if (locale.value === 'en') {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
      const data = await response.json()
      resultMovies.value = data.results
    }
  }
  async function searchTv(query: string) {
    if (!query) {
      return []
    }
    if (locale.value === 'tr') {
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=tr-TR&page=1`, options)
      const data = await response.json()
      resultTv.value = data.results
    }
    if (locale.value === 'en') {
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`, options)
      const data = await response.json()
      resultTv.value = data.results
    }
  }

  return {
    search,
    searchMovies,
    searchTv,
    resultMovies,
    resultTv,
    results,

  }
})

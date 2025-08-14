export const useGenreStore = defineStore('GenreStore', () => {
  const moviesGenres = ref<Genre[]>([])
  const tvGenres = ref<Genre[]>([])
  const { locale } = useI18n()
  const lang = locale.value === 'en' ? 'en-US' : 'tr-Tr'
  const accessToken = ref(useRuntimeConfig().public.accessToken)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }
  async function fetchGenres(mediaType: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?language=${lang}`, options)
    const data = await response.json()

    const targetGenres = mediaType === 'movie' ? moviesGenres : tvGenres
    targetGenres.value = data.genres
  }
  return {
    fetchGenres,
    moviesGenres,
    tvGenres,
  }
})

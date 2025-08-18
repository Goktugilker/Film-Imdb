export const useGenreStore = defineStore('GenreStore', () => {
  const moviesGenres = ref<Genre[]>([])
  const tvGenres = ref<Genre[]>([])
  const page = ref('1')
  const genreMedia = ref<Media[]>([])
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
    const response = await fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}`, options)
    const data = await response.json()

    const targetGenres = mediaType === 'movie' ? moviesGenres : tvGenres
    targetGenres.value = data.genres
  }
  async function fetchGenreMedia(mediaType: MediaType, genre: number) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}&page=${page.value}&sort_by=popularity.desc&with_genres=${genre}`, options)
    const data = await response.json()
    genreMedia.value.push(...(data.results as Media[]))
  }
  return {
    fetchGenreMedia,
    fetchGenres,
    moviesGenres,
    tvGenres,
    page,
    genreMedia,
  }
})

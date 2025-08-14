export const useVideoStore = defineStore('VideoStore', () => {
  const { locale } = useI18n()
  const movieVideos = ref<Media[]>([])
  const tvVideos = ref<Media[]>([])
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }
  async function fetchMovieVideos(movieId: number) {
    if (locale.value === 'tr') {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=tr-TR`, options)
      const data = await response.json()
      movieVideos.value = data.results
    }
    if (locale.value === 'en') {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
      const data = await response.json()
      movieVideos.value = data.results
    }
  }
  async function fetchTvVideos(tvId: number) {
    if (locale.value === 'tr') {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?language=tr-TR`, options)
      const data = await response.json()
      tvVideos.value = data.results
    }
    if (locale.value === 'en') {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`, options)
      const data = await response.json()
      tvVideos.value = data.results
    }
  }
  return {
    movieVideos,
    tvVideos,
    apiKey,
    accessToken,
    fetchMovieVideos,
    fetchTvVideos,
  }
})


export const useMediaStore = defineStore('MediaStore', () => {
  const {locale} = useI18n()
  const tvFetch = ref(false)
  const movieFetch = ref(false)
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Movies = ref<Media[]>([])
  const TvShows = ref<Media[]>([])
  const selectedMovie = ref<Media[]>([])
  const selectedTvShow = ref<Media>()
  const searchQuery = ref('')
  const page = ref(1)

 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function fetchMovieList() {
        if (movieFetch.value) {
          return
        }
       else if (locale.value === 'tr') {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=tr-TR&page=${page.value}&sort_by=popularity.desc`, options)
          const data = await response.json()
          Movies.value.push(...data.results)
        }
       else if (locale.value === 'en') {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false &include_video=false&language=en-US&page=${page.value}&sort_by=popularity.desc`, options)
          const data = await response.json()
          Movies.value.push(...data.results)
        }
        movieFetch.value = true
  }
  async function fetchTvList() {
        if (tvFetch.value) {
          return
        }
        if (locale.value === 'tr') {
          const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=tr-TR&page=${page.value}&sort_by=popularity.desc`, options)
          const data = await response.json()
          TvShows.value.push(...data.results)
        }
        if (locale.value === 'en') {
          const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page.value}&sort_by=popularity.desc`, options)
          const data = await response.json()
          TvShows.value.push(...data.results)
        }
        tvFetch.value = true
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
    fetchTvList,
    fetchTvVideos,
    fetchMovieList,
    tvFetch,
    movieFetch,
    page,
    apiKey,
    accessToken,
    Movies,
    TvShows,
    selectedMovie,
    searchQuery,
    selectedTvShow,

  }
})

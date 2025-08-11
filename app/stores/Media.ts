import type { Media } from '~/type'

export const useMediaStore = defineStore('MediaStore', () => {
  const tvfetch = ref(false)
  const moviefetch = ref(false)
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Movies = ref<Media[]>([])
  const TvShows = ref<Media[]>([])
  const selectedMovie = ref<Media[]>([])
  const selectedTvShow = ref<Media>()
  const searchQuery = ref('')

 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }

  async function fetchMovieList() {
    Movies.value = []
      for (let i = 1; i <= 10; i++) {
        if (lang.value === 'tr-TR') {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=tr-TR&page=${i}&sort_by=popularity.desc`, options)
          const data = await response.json()
          Movies.value.push(...data.results)
        }
        if (lang.value === 'en-US') {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false &include_video=false&language=en-US&page=${i}&sort_by=popularity.desc`, options)
          const data = await response.json()
          Movies.value.push(...data.results)
        }
      }
    moviefetch.value = true
  }
  async function fetchTvList() {
    TvShows.value = []
      for (let i = 1; i <= 10; i++) {
        if (lang.value === 'tr-TR') {
          const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=tr-TR&page=${i}&sort_by=popularity.desc`, options)
          const data = await response.json()
          TvShows.value.push(...data.results)
        }
        if (lang.value === 'en-US') {
          const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${i}&sort_by=popularity.desc`, options)
          const data = await response.json()
          TvShows.value.push(...data.results)
        }
      }
    tvfetch.value = true
  }
  async function fetchTvVideos() {
    if (!selectedTvShow.value) {
      throw new Error('No TV show selected')
    }
    if (lang.value === 'tr-TR') {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${selectedTvShow.value.id}/videos?language=tr-TR`, options)
      const data = await response.json()
      selectedTvShow.value = data.results
    }
    if (lang.value === 'en-US') {
      const response = await fetch(`https://api.themoviedb.org/3/tv/259909/videos?language=en-US`, options)
      const data = await response.json()
      selectedTvShow.value = data.results
    }
  }

  return {
    fetchTvList,
    fetchTvVideos,
    fetchMovieList,
    apiKey,
    accessToken,
    Movies,
    TvShows,
    selectedMovie,
    searchQuery,
    selectedTvShow,

  }
})

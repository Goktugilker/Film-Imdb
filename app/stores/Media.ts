import type { Media } from '~/type'

export const useMediaStore = defineStore('MediaStore', () => {
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Movies = ref<Media[]>([])
  const TvShows = ref<Media[]>([])
  const selectedMovie = ref<Media[]>([])
  const selectedTvShow = ref<Media>()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmQwZjk1MzU2ZGMwMzY1ZGI3ZDU4OTBmMjI2ZDE4YiIsIm5iZiI6MTc1MzM2MDkwOS45Miwic3ViIjoiNjg4MjJhMGRkZmYwMDgxZGFjNzJkZjk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gELsYl1bFRm4EfGec7ivrJfxI--9rttkYYZ4sHikiHU',
    },
  }

  async function fetchMovieList() {
    for(let i=1 ; i <= 10; i++) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i}&sort_by=popularity.desc`, options)
    const data = await response.json()
    Movies.value.push(...data.results)
    }
  }
  async function fetchTvList() {
    for(let i=1 ; i <= 10; i++) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${i}&sort_by=popularity.desc`, options)
    const data = await response.json()
    TvShows.value.push(...data.results)
    }
  }
  async function fetchTvVideos() {
    if (!selectedTvShow.value) {
      throw new Error('No TV show selected')
    }
    const response = await fetch(`https://api.themoviedb.org/3/tv/259909/videos?language=en-US`, options)
    const data = await response.json()
    selectedTvShow.value = data.results
  }
  
  return {
    apiKey,
    accessToken,
    fetchMovieList,
    fetchTvList,
    Movies,
    TvShows,
    selectedMovie,
    fetchTvVideos,
    selectedTvShow,
  }
})

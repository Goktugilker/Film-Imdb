import type { Media } from '~/type'

export const useMediaStore = defineStore('MediaStore', () => {
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Movies = ref<Media[]>([])
  const TvShows = ref<Media[]>([])
  const selectedMovie = ref<Media>()
  const selectedTvShow = ref<Media>()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmQwZjk1MzU2ZGMwMzY1ZGI3ZDU4OTBmMjI2ZDE4YiIsIm5iZiI6MTc1MzM2MDkwOS45Miwic3ViIjoiNjg4MjJhMGRkZmYwMDgxZGFjNzJkZjk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gELsYl1bFRm4EfGec7ivrJfxI--9rttkYYZ4sHikiHU',
    },
  }

  async function fetchMovieList() {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    const data = await response.json()
    Movies.value = data.results
  }
  async function fetchTvList() {
    const response = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
    const data = await response.json()
    TvShows.value = data.results
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

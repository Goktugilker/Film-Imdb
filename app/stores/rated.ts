import type { Media } from '~/type'

export const useRatedStore = defineStore('RatedStore', () => {
  const rated = ref<Media[]>([])
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }
  async function fetchRatedMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options)
    const data = await response.json()
    rated.value = data.results
  }
  async function fetchRatedTv() {
    const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, options)
    const data = await response.json()
    rated.value = data.results
  }
  return {
    fetchRatedMovies,
    fetchRatedTv,
    rated,

  }
})

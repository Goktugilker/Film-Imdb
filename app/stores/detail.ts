import type { Media } from '~/type'

export const useDetailStore = defineStore('DetailStore', () => {
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const details = ref<Media []>([])
  const cast = ref<Media []>([])
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }
  async function fetchDetails(id: number, type: string) {
    if (lang.value === 'en-US') {
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
      const data = await response.json()
      details.value = [data]
    }
    else if (lang.value === 'tr-TR') {
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=tr-TR`, options)
      const data = await response.json()
      details.value = [data]
    }
  }
  async function fetchCreditsMovie(id: number) {
    if (lang.value === 'tr-TR') {
      cast.value = []
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=tr-TR`, options)
      const data = await response.json()
      cast.value = data.cast
    }
    if (lang.value === 'en-US') {
      cast.value = []
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
      const data = await response.json()
      cast.value = data.cast
    }
  }
  async function fetchCreditsTv(id: number) {
    if (lang.value === 'tr-TR') {
      cast.value = []
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=tr-TR`, options)
      const data = await response.json()
      cast.value = data.cast
    }
    if (lang.value === 'en-US') {
      cast.value = []
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, options)
      const data = await response.json()
      cast.value = data.cast
    }
  }
  return {
    fetchDetails,
    fetchCreditsMovie,
    fetchCreditsTv,
    details,
    cast,
  }
})

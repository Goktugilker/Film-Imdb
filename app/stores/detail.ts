export const useDetailStore = defineStore('DetailStore', () => {
  const { locale } = useI18n()
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
  async function fetchDetails(id: number, type: MediaType) {
    if (locale.value === 'en') {
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
      const data = await response.json()
      details.value = [data]
    }
    else if (locale.value === 'tr') {
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=tr-TR`, options)
      const data = await response.json()
      details.value = [data]
    }
  }
  async function fetchCredits(id: number,type: MediaType) {
    if (locale.value === 'tr') {
      cast.value = []
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=tr-TR`, options)
      const data = await response.json()
      cast.value = data.cast
    }
    if (locale.value === 'en') {
      cast.value = []
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`, options)
      const data = await response.json()
      cast.value = data.cast
    }
  }
  
  return {
    fetchDetails,
    fetchCredits,
    details,
    cast,
  }
})

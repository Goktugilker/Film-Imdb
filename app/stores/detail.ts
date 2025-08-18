export const useDetailStore = defineStore('DetailStore', () => {
  const { locale } = useI18n()
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const details = ref<Media []>([])
  const cast = ref<Media []>([])
  const person = ref<Media []>([])
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }
  async function fetchDetails(id: number, type: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}`, options)
    const data = await response.json()
    details.value = [data]
  }
  async function fetchCredits(id: number, type: MediaType) {
    cast.value = []
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}`, options)
    const data = await response.json()
    cast.value = data.cast
  }
  async function fetchPersonDetail(type: MediaType, id:string) {
    person.value = []
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/${type}_credits?language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}`, options)
    const data = await response.json()
    person.value = data.cast
    
  }

  return {
    fetchDetails,
    fetchPersonDetail,
    fetchCredits,
    details,
    cast,
    person,
  }
})

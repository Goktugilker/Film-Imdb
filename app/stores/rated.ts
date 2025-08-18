export const useRatedStore = defineStore('RatedStore', () => {
  const { locale } = useI18n()
  const rated = ref<Media[]>([])
  const recommendations = ref<Media[]>([])
  const ratedPage = ref('1')
  const recommendationsPage = ref('1')
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }
  async function fetchRated(type: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}&page=${ratedPage.value}`, options)
    const data = await response.json()
    rated.value.push(...(data.results as Media[]))
  }
  async function fetchRecommendations(type:MediaType, id:number) {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}&page=${recommendationsPage.value}`, options)
    const data = await response.json()
    recommendations.value.push(...(data.results as Media[]))
  }
  return {
    fetchRated,
    fetchRecommendations,
    ratedPage,
    rated,
    recommendations,
    recommendationsPage
  }
})

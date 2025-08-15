export const useVideoStore = defineStore('VideoStore', () => {
  const { locale } = useI18n()
  const videos = ref<Media[]>([])
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    },
  }
  async function fetchVideos(id: number, type: MediaType) {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?language=${locale.value === 'tr' ? 'tr-TR' : 'en-US'}`, options)
    const data = await response.json()
    videos.value = data.results
  }

  return {
    videos,
    apiKey,
    accessToken,
    fetchVideos,
  }
})

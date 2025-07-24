
export const useTvList = defineStore('TvList', () => {
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)

  async function fetchData() {
    const response = await fetch('https://api.themoviedb.org/3/tv/changes?page=1', {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
        'x-api-key': apiKey.value as string
      }
    })
    return await response.json()
  }

  return {
    apiKey,
    accessToken,
    fetchData,
  }
})
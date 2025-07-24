
export const useFavoriteTv = defineStore('FavoriteTv', () => {
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)

  async function fetchData() {
    const response = await fetch('https://api.themoviedb.org/3/account/22171139/favorite/tv?language=en-US&page=1&sort_by=created_at.asc', {
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
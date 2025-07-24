
export const useMovieList = defineStore('MovieList', () => {
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)

  async function fetchData() {
    const response = await fetch('https://api.themoviedb.org/3/movie/changes?page=1', {
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
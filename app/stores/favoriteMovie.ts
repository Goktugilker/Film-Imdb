import type { Media } from "~/type"

export const useFavoriteMovie = defineStore('FavoriteMovie', () => {
  const apiKey = ref(useRuntimeConfig().public.apiKey)
  const accessToken = ref(useRuntimeConfig().public.accessToken)
  const Movies = ref<Media[]>([])

  async function fetchData() {
    const response = await fetch('https://api.themoviedb.org/3/account/22171139/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', {
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
        'x-api-key': apiKey.value as string
      }
    })
    const data = await response.json()
    Movies.value = data.results
  }

  return {
    apiKey,
    accessToken,
    Movies,
    fetchData,
  }
})
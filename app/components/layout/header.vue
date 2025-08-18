<script setup lang="ts">
const { setLocale, locale } = useI18n()
const mediaStore = useMediaStore()
const genreStore = useGenreStore()
const mounted = ref(false)
const mobileMenuOpen = ref(false)
const showMovieGenres = ref(false)
const showTvGenres = ref(false)

onMounted(async () => {
  mounted.value = true
  await Promise.all([
    genreStore.fetchGenres('movie'),
    genreStore.fetchGenres('tv'),
  ])
})

function closeMobileMenu() {
  mobileMenuOpen.value = false
  showMovieGenres.value = false
  showTvGenres.value = false
}

function toggleMovieGenres() {
  showMovieGenres.value = !showMovieGenres.value
  showTvGenres.value = false
}

function toggleTvGenres() {
  showTvGenres.value = !showTvGenres.value
  showMovieGenres.value = false
}
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50 bg-[var(--ui-bg-layout)] ">
    <div class="flex flex-row justify-between items-center w-full header relative px-4 py-2">
      <div class="flex flex-row items-center">
        <UButton
          size="xl"
          class="mr-2 md:mr-4 text-lg md:text-2xl items-center justify-between"
          variant="link"
          icon="mdi:movie"
          @click="$router.push({ name: 'home' })"
        >
          <span class="bg-gradient-to-r from-violet-600/100 via-sky-700/100 to-teal-400/100 bg-clip-text text-transparent font-bold text-sm md:text-base">
            NuxtPal
          </span>
        </UButton>

        <div class="hidden md:flex flex-row items-center">
          <UButton
            size="xl"
            label="Anasayfa"
            icon="mdi:home"
            variant="link"
            @click="$router.push({ name: 'home' })"
          />
          <lists-genre />
        </div>
      </div>

      <div class="flex flex-row items-center">
        <div class="hidden md:flex flex-row items-center">
          <UButton
            size="xl"
            variant="ghost"
            :icon="locale === 'en' ? 'circle-flags:uk' : 'circle-flags:tr'"
            @click="setLocale(locale === 'en' ? 'tr' : 'en'), mediaStore.changeLang()"
          />
          <UButton
            v-if="mounted"
            size="xl"
            :icon="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'"
            variant="ghost"
            @click="toggleTheme"
          />
          <UButton
            size="xl"
            icon="mdi:github"
            variant="link"
            href="https://github.com/goktugilker"
          />
        </div>

        <UButton
          class="md:hidden"
          size="lg"
          icon="mdi:menu"
          variant="ghost"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
      </div>

      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-black/50 z-40 md:hidden"
        @click="closeMobileMenu"
      />

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="fixed top-0 right-0 h-full w-72 sm:w-80 bg-white dark:bg-gray-900 shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto"
      >
        <div class="p-6">
          <div class="flex justify-end mb-6">
            <UButton
              size="md"
              icon="mdi:close"
              variant="ghost"
              @click="closeMobileMenu"
            />
          </div>

          <div class="flex flex-col space-y-3">
            <UButton
              size="lg"
              label="Anasayfa"
              icon="mdi:home"
              variant="ghost"
              class="justify-start w-full p-3 text-left"
              @click="$router.push({ name: 'home' }), closeMobileMenu()"
            />

            <UButton
              size="lg"
              label="Filmler"
              icon="mdi:film"
              variant="ghost"
              class="justify-start w-full p-3 text-left"
              @click="$router.push({ name: 'Media List', params: { media: 'movie' } }), closeMobileMenu()"
            />

            <UButton
              size="lg"
              label="Tv Dizileri"
              icon="mdi:television"
              variant="ghost"
              class="justify-start w-full p-3 text-left"
              @click="$router.push({ name: 'Media List', params: { media: 'tv' } }), closeMobileMenu()"
            />

            <div class="w-full">
              <UButton
                size="lg"
                label="Film Türleri"
                icon="mdi:film"
                :trailing-icon="showMovieGenres ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                variant="ghost"
                class="justify-between w-full p-3 text-left"
                @click="toggleMovieGenres"
              />
              <div v-if="showMovieGenres" class="pl-4 mt-2 space-y-2 max-h-40 overflow-y-auto">
                <UButton
                  v-for="genre in genreStore.moviesGenres"
                  :key="genre.id"
                  size="sm"
                  :label="genre.name"
                  variant="ghost"
                  class="justify-start w-full p-2 text-left text-sm"
                  @click="$router.push({ name: 'Genre Lists', params: { genre: 'movie', id: genre.id } }), closeMobileMenu()"
                />
              </div>
            </div>

            <div class="w-full">
              <UButton
                size="lg"
                label="Dizi Türleri"
                icon="mdi:television"
                :trailing-icon="showTvGenres ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                variant="ghost"
                class="justify-between w-full p-3 text-left"
                @click="toggleTvGenres"
              />
              <div v-if="showTvGenres" class="pl-4 mt-2 space-y-2 max-h-40 overflow-y-auto">
                <UButton
                  v-for="genre in genreStore.tvGenres"
                  :key="genre.id"
                  size="sm"
                  :label="genre.name"
                  variant="ghost"
                  class="justify-start w-full p-2 text-left text-sm"
                  @click="$router.push({ name: 'Genre Lists', params: { genre: 'tv', id: genre.id } }), closeMobileMenu()"
                />
              </div>
            </div>

            <hr class="my-6 border-gray-200 dark:border-gray-700">

            <div class="space-y-3">
              <UButton
                size="lg"
                :label="locale === 'en' ? 'English' : 'Türkçe'"
                :icon="locale === 'en' ? 'circle-flags:uk' : 'circle-flags:tr'"
                variant="ghost"
                class="justify-start w-full p-3 text-left"
                @click="setLocale(locale === 'en' ? 'tr' : 'en'), mediaStore.changeLang()"
              />

              <UButton
                v-if="mounted"
                size="lg"
                :label="isDark ? 'Koyu Tema' : 'Açık Tema'"
                :icon="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'"
                variant="ghost"
                class="justify-start w-full p-3 text-left"
                @click="toggleTheme"
              />

              <UButton
                size="lg"
                label="GitHub"
                icon="mdi:github"
                variant="ghost"
                class="justify-start w-full p-3 text-left"
                href="https://github.com/goktugilker"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .header {
    padding: 0.5rem 1rem;
  }
}
</style>

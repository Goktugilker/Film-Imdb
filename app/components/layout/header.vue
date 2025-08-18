<script setup lang="ts">
const { setLocale, locale } = useI18n()
const mediaStore = useMediaStore()
const mounted = ref(false)
const mobileMenuOpen = ref(false)

onMounted(() => mounted.value = true)

// Mobil menüyü kapat
function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div class="flex flex-row justify-between items-center w-full header relative">
    <!-- Sol taraf - Logo ve Desktop menü -->
    <div class="flex flex-row items-center">
      <UButton
        size="xl"
        class="mr-4 text-2xl items-center justify-between"
        variant="link"
        icon="mdi:movie"
        @click="$router.push({ name: 'home' })"
      >
        <span class="bg-gradient-to-r from-violet-600/100 via-sky-700/100 to-teal-400/100 bg-clip-text text-transparent font-bold">
          NuxtPal
        </span>
      </UButton>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex flex-row items-center">
        <UButton
          size="xl"
          label="Anasayfa"
          icon="mdi:home"
          variant="link"
          @click="$router.push({ name: 'home' })"
        />
        <!--- <UButton
          size="xl"
          label="Filmler"
          icon="mdi:film"
          variant="link"
          @click="$router.push({ name: 'Media List', params: { media: 'movie' } })"
        />
        <UButton
          size="xl"
          label="Tv"
          icon="mdi:television"
          variant="link"
          @click="$router.push({ name: 'Media List', params: { media: 'tv' } })"
        /> --->
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
        size="xl"
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

    <div
      v-if="mobileMenuOpen"
      class="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 md:hidden transform transition-transform duration-300"
    >
      <div class="p-4">
        <!-- Close Button -->
        <div class="flex justify-end mb-4">
          <UButton
            size="sm"
            icon="mdi:close"
            variant="ghost"
            @click="closeMobileMenu"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <UButton
            size="lg"
            label="Anasayfa"
            icon="mdi:home"
            variant="ghost"
            class="justify-start w-full"
            @click="$router.push({ name: 'home' }), closeMobileMenu()"
          />
          <UButton
            size="lg"
            label="Filmler"
            icon="mdi:film"
            variant="ghost"
            class="justify-start w-full"
            @click="$router.push({ name: 'Media List', params: { media: 'movie' } }), closeMobileMenu()"
          />
          <UButton
            size="lg"
            label="Tv"
            icon="mdi:television"
            variant="ghost"
            class="justify-start w-full"
            @click="$router.push({ name: 'Media List', params: { media: 'tv' } }), closeMobileMenu()"
          />

          <div class="w-full">
            <lists-genre />
          </div>

          <hr class="my-4 border-gray-200 dark:border-gray-700">

          <UButton
            size="lg"
            :label="locale === 'en' ? 'English' : 'Türkçe'"
            :icon="locale === 'en' ? 'circle-flags:uk' : 'circle-flags:tr'"
            variant="ghost"
            class="justify-start w-full"
            @click="setLocale(locale === 'en' ? 'tr' : 'en'), mediaStore.changeLang()"
          />
          <UButton
            v-if="mounted"
            size="lg"
            :label="isDark ? 'Koyu Tema' : 'Açık Tema'"
            :icon="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'"
            variant="ghost"
            class="justify-start w-full"
            @click="toggleTheme"
          />
          <UButton
            size="lg"
            label="GitHub"
            icon="mdi:github"
            variant="ghost"
            class="justify-start w-full"
            href="https://github.com/goktugilker"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .header {
    padding: 0.5rem;
  }
}
</style>

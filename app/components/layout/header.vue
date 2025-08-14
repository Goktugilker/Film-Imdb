<script setup lang="ts">
const { setLocale, locale } = useI18n()
const mediaStore = useMediaStore()
</script>

<template>
  <div class="flex justify-between items-center w-full header ">
    <div>
      <UButton
        size="xl"
        class="mr-4 text-green-600 :hover:text-green-800"
        label="NuxtPal"
        icon="mdi:movie"
        variant="link"
        @click="$router.push('/')"
      />
      <UButton
        size="xl"
        label="Anasayfa"
        icon="mdi:home"
        variant="link"
        @click="$router.push('/')"
      />
      <UButton
        size="xl"
        label="Filmler"
        icon="mdi:film"
        variant="link"
        @click="$router.push('/movies')"
      />
      <UButton
        size="xl"
        label="Tv"
        icon="mdi:television"
        variant="link"
        @click="$router.push('/tv')"
      />
    <lists-genre />

    </div>
    <div>
      <UButton
        size="xl"
        variant="ghost"
        :icon="locale === 'en' ? 'circle-flags:uk' : 'circle-flags:tr'"
        @click="setLocale(locale === 'en' ? 'tr' : 'en'), mediaStore.changeLang()"
      />

      <UButton
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
  </div>
</template>

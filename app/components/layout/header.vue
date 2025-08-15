<script setup lang="ts">
const { setLocale, locale } = useI18n()
const mediaStore = useMediaStore()
const mounted = ref(false)
onMounted(() => mounted.value = true)
</script>

<template>
  <div class="flex justify-between items-center w-full header ">
    <div>
      <UButton
        size="xl"
        class="mr-4 text-2xl items-center justify-between"
        variant="link"
        icon="mdi:movie"
        @click="$router.push({name: 'home'})"
      >
        
        <span class="bg-gradient-to-r from-violet-400/100 via-sky-500/100 to-teal-200/100 bg-clip-text text-transparent font-bold">
          NuxtPal
        </span>
      </UButton>
      <UButton
        size="xl"
        label="Anasayfa"
        icon="mdi:home"
        variant="link"
        @click="$router.push({name: 'home'})"
      />
      <UButton
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
  </div>
</template>

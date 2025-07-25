<script setup>
import { isDark, toggleTheme } from '~/utils/theme'
</script>

<template>

    <UButton
    size="xl"
    icon="mdi:github"
    variant="link"
    href="https://github.com/goktugilker"
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
    @click="$router.push('/media/movie')"
  />
  <UButton
    size="xl"
    label="Tv"
    icon="mdi:television"
    variant="link"
    @click="$router.push('/media/tv')"
  />
  <UButton
    size="xl"
    :icon="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'"
    variant="ghost"
    @click="toggleTheme"
    />
</template>

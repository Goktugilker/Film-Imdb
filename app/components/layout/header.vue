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
  />
  <UButton
    size="xl"
    label="Filmler"
    icon="mdi:film"
    variant="link"
  />
  <UButton
    size="xl"
    label="Tv"
    icon="mdi:television"
    variant="link"
  />
  <UButton
    size="xl"
    label="Diziler"
    icon="mdi:television-classic"
    variant="link"
  />
  <UButton
    size="xl"
    :icon="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'"
    variant="ghost"
    @click="toggleTheme"
    />
</template>

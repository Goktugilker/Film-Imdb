<script setup>
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
    </div>
    <div>
      <UButton
        size="xl"
        :icon="lang === 'en-US' ? 'flag:us-1x1' : 'flag:tr-1x1'"
        variant="ghost"
        @click="toggleLanguage"
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

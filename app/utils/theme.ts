export const isDark = computed(() => useColorMode().value === 'dark')
export function toggleTheme() {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
export const isHome = ref(false)
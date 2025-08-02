export const isDark = computed(() => useColorMode().value === 'dark')
export function toggleTheme() {
  const colorMode = useColorMode()
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
export const lang = computed(() => useCookie('lang').value || 'en-US')
export function toggleLanguage() {
  const lang = useCookie('lang')
  lang.value = lang.value === 'en-US' ? 'tr-TR' : 'en-US'
}

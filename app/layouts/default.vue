<template>
  <div class="min-h-screen flex flex-col">
    <layout-header />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <footer class="bg-[var(--ui-bg-layout)]">
      <layout-footer />
    </footer>
  </div>
</template>

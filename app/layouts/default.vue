<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-[var(--ui-bg-layout)]">

      <layout-header />
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="bg-[var(--ui-bg-layout)]">

      <layout-footer />
    </footer>
  </div>
</template>

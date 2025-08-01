<template>
  <header class=" bg-[var(--ui-bg-layout)] p-4 flex">
    <LayoutHeader />
  </header>
  <slot />
  <footer class="bg-[var(--ui-bg-layout)] p-4 flex justify-center items-center w-full">
    <LayoutFooter />
  </footer>
</template>

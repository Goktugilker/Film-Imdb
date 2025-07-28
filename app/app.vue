<script setup lang="ts">

</script>

<template class="flex w-dvw h-dvh overflow-hidden">
  <Uapp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Uapp>
</template>

<style>
div {
  font-family: Bitcount Prop Single, sans-serif;
}
@keyframes scrollX {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-x {
  animation: scrollX 50s linear infinite;
  display: flex;
  width: max-content;
}
</style>

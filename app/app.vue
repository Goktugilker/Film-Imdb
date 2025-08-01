<script setup lang="ts">

</script>

<template class="flex w-dvw h-dvh overflow-hidden">
  <Uapp>
    <NuxtLayout>
      <NuxtPage class="page" />
    </NuxtLayout>
  </Uapp>
</template>

<style>
.page{
  font-family: Poppins, sans-serif;
}
.header,.footer {
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
  animation: scrollX 100s linear infinite;
  display: flex;
  width: max-content;
}
@keyframes scrollXReverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
::-webkit-scrollbar {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: purple;
  border-radius: 10px;
}
.animate-scroll-x-reverse {
  animation: scrollXReverse 100s linear infinite;
  display: flex;
  width: max-content;
}
</style>

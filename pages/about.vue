<template>
  <div class="w-[900px] m-auto pt-32 pb-32">
    <h1 class="text-4xl tracking-tight font-extrabold sm:text-5xl text-white pb-6">{{ $t("about") }}</h1>
    <div class="mt-2 max-w-3xl mx-auto text-lg">
      <p>{{ $t("about_first") }}</p>
      <p class="pt-8">{{ $t("about_second") }}</p>
      <p class="pt-8">{{ $t("about_third") }} <a class="border-b pb-0.5" :href="/admin/">{{ $t("about_button") }}.</a></p>
    </div>
  </div>
</template>

<template>
  <div class="home-iss-explorer w-[800px] h-[300px] m-auto bg-white rounded-lg my-16 p-10 flex justify-center flex-col">
    <h1 class="text-3xl tracking-tight font-extrabold text-white">ISS Explorer</h1>
    <p class="mt-2">{{ $t("iss_explorer_text") }}</p>
    <a class="iss-button group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 outline-none ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 ring-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:ring-slate-500 mt-8 w-[150px]" :href="/iss/">{{ $t("more") }}</a>
  </div>
</template>

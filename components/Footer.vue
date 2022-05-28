<template>
  <div class="footer py-4 w-full">
    <div class="footer-inner m-auto flex justify-between">
      <p>&copy; {{ new Date().getFullYear() }} NASA Agregator</p>
      <span>{{ $t("madeby") }} <a href="https://github.com/hisakiyo/">Gauthier MARETTE</a> {{ $t("and") }} <a href="https://github.com/sotramp/">Damien CLAIRET</a></span>
    </div>
  </div>
</template>

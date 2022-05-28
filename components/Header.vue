<template>
    <div class="header w-full absolute">
        <div class="header-inner flex text-white m-auto py-4 justify-between">
          <div class="flex items-center">
            <router-link to="/" class="logo-container">
              <img id="logo" src="/nasa_agregator_logo_min.png" alt="NASA Agregator">
            </router-link>
            <nav>
              <router-link :to="localePath('/')" class="uppercase font-semibold">{{ $t("home") }}</router-link>
              <router-link :to="localePath('/news/')" class="uppercase font-semibold">{{ $t("news") }}</router-link>
              <router-link :to="localePath('/iss/')" class="uppercase font-semibold">ISS Explorer</router-link>
              <router-link :to="localePath('/about/')" class="uppercase font-semibold">{{ $t("about") }}</router-link>
            </nav>
          </div>
          <div class="switch-languages">
              <nuxt-link :to="switchLocalePath('en')" class="uppercase font-semibold">EN</nuxt-link> |
              <nuxt-link :to="switchLocalePath('fr')" class="uppercase font-semibold">FR</nuxt-link>
          </div>
        </div>
    </div>
</template>

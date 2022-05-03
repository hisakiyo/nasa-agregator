<template>
  <div>
      <!-- welcome message in a card -->
      <v-card
        class="elevation-0"
        dark
        flat
        tile
        align="center"
        >
        <v-card-title>
            <span class="headline">{{ $t('welcome') }}</span>
        </v-card-title>
        <v-card-text>
            {{ $t('welcome_message') }}
        </v-card-text>
        </v-card>
        <!-- end welcome message -->
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  layout: 'admin',
  data() {
    return {
      testContent: '',
    }
  },
  head() {
    return {
      title: 'Accueil',
    }
  },
  methods: {},
}
</script>
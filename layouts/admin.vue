<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                Nasa Agregator
            </v-list-item-title>
            <v-list-item-subtitle>
                Administration
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="(item, index) in menu"
            :key="index"
            link
            :to="item.url"
            >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
      >
      <template #activator="{ on, attrs }">
          <v-btn
          color="rgba(255, 255, 255, 0.15)"
          dark
          v-bind="attrs"
          v-on="on"
          >
          {{ $t('login') }}
          </v-btn>
      </template>
      <v-card>
          <v-card-title class="text-h5 mb-2">
          Connexion
          </v-card-title>
          <v-card-text>
              <v-form>
                <v-text-field
                    v-model="login"
                    label="Identifiant"
                    type="text"
                    required
                    >
                </v-text-field>
                <v-text-field
                    v-model="password"
                    label="Mot de passe"
                    type="password"
                    required
                    >
                </v-text-field>
              </v-form>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
              Annuler
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
              Envoyer
          </v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
        drawer: true,
        dialog: false,
        login: null,
        password: null,
        menu: [{
            title: 'dashboard',
            url: '/admin/',
            icon: 'mdi-view-dashboard',
        },
        {
            title: 'news_manage',
            url: '/admin/news',
            icon: 'mdi-newspaper',
        },
        {
            title: 'comments_manage',
            url: '/admin/comments',
            icon: 'mdi-comment-text-multiple',
        }]
    }),
    head() {
        return {
            title: 'Administration',
        }
    }
  }
</script>
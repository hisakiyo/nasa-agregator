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
            exact
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
      <span v-if="!$auth.user">
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
            <v-form ref="form" lazy-validation @submit.prevent="login">
              <v-card-title class="text-h5 mb-2">
              Connexion
              </v-card-title>
              <v-card-text>
                  <v-form>
                    <v-text-field
                        v-model="username"
                        label="Identifiant"
                        type="text"
                        required
                        @keyup.enter="onEnter"
                        >
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Mot de passe"
                        type="password"
                        required
                        @keyup.enter="onEnter"
                        >
                    </v-text-field>
                  </v-form>
              </v-card-text>
              {{ error }}
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
                    type="submit"
                    @click="login()"
                >
                    Envoyer
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </span>
      <span v-else>
        Logged in 
        <v-btn
          text
          color="green"
          @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </span>
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
        username: null,
        password: null,
        error: null,
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
    },
    methods: {
      onEnter() {
        this.login();
      },
      async login() {
        try {
          this.error = null
          await this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            },
          })
          this.username = ''
          this.password = ''
          this.dialog = false
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      async logout() {
        try {
          await this.$auth.logout('local')
        } catch (e) {
          console.log(e)
        }
      } 
  }
}
</script>
<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-col sm="2">
          <v-avatar size="40px" @click="drawer = !drawer" class="cursor-pointer">
            <v-img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
          </v-avatar>
        </v-col>

        <v-toolbar-title>{{ Nome }}</v-toolbar-title>

        <v-spacer></v-spacer>

      </v-app-bar>

      <v-navigation-drawer class="bg-primary" v-model="drawer">
        <v-list class="py-10">
          <v-list-item v-if="$route.path === '/home/feeds'" prepend-icon="mdi-account-box" title="Perfil"
            @click="$router.push('/profile-professional'); drawer = false;">
          </v-list-item>
          <v-list-item v-else prepend-icon="mdi-view-dashboard" title="Feeds"
            @click="$router.push('/home/feeds'); drawer = false;">
          </v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Configurações" @click="drawer = false;">
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-10">
            <v-btn block @click="logout">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main style="height: 100vh;">
        <slot name="content"></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { useRouter } from 'vue-router';


const router = useRouter();

export default {
  data() {
    return {
      drawer: false
    };
  },

  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};


</script>

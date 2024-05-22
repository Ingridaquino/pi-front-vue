<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-col sm="1">
          <v-avatar size="40px" @click="drawer = true" class="cursor-pointer">
            <v-img :src="avatar" alt="Avatar"></v-img>
          </v-avatar>
        </v-col>

        <v-toolbar-title>{{ name }}</v-toolbar-title>


        <v-spacer></v-spacer>

      </v-app-bar>

      <v-navigation-drawer class="bg-primary" v-model="drawer" temporary>
        <v-list class="py-10">
          <v-list-item v-if="$route.path === '/home/feeds'" prepend-icon="mdi-account-box" title="Perfil"
            @click="navigateTo('/user')">
          </v-list-item>
          <v-list-item v-else prepend-icon="mdi-view-dashboard" title="Feeds" @click="navigateTo('/home/feeds')">
          </v-list-item>
        <v-list-item prepend-icon="mdi-gavel" title="Configurações" @click="showSnackbar">
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

  <v-snackbar v-model="snackbar" :timeout="6000" vertical color="snackbar" top right>
    {{ snackbarMessage }}
    <template v-slot:actions>
      <v-btn color="primary" text @click="snackbar = false">
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      drawer: false,
      avatar: '',
      name: '',
      snackbar: false,
      snackbarMessage: '',
    };
  },
  created() {
    const userData = JSON.parse(localStorage.getItem('user'))

    let user = userData[0];

    this.name = user.nome;
    this.avatar = user.foto;
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
    navigateTo(route) {
      this.$router.push(route).then(() => window.location.reload());
      this.drawer = false;
    },

      showSnackbar(){
      this.snackbarMessage = 'Em construção';
      this.snackbar = true;
    }
  }
};


</script>
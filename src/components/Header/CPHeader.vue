<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent :elevation="7">
        <v-col sm="1">
          <v-avatar size="40px" @click="drawer = true" class="cursor-pointer">
            <v-img v-if="avatar" :src="avatar" alt="Avatar"></v-img>
            <v-icon size="50" color="#cccc" v-else>mdi-account-circle</v-icon>
          </v-avatar>
        </v-col>

        <v-toolbar-title>{{ name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-card-title class="text-h5">
          <span class="flexwork">
            FlexW<v-icon color="#ccc" size="34">mdi-radar</v-icon>rk
        </span>
        </v-card-title>
      </v-app-bar>


      <v-navigation-drawer class="bg-primary" v-model="drawer" temporary>
        <v-list class="py-10">
          <v-list-item v-if="$route.path === '/home/feeds'" prepend-icon="mdi-account-box" title="Perfil"
            @click="navigateTo('/user')">
          </v-list-item>
          <v-list-item v-else prepend-icon="mdi-view-dashboard" title="Feeds" @click="navigateTo('/home/feeds')">
          </v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Configurações" @click="navigateTo('/editar-perfil')">
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-10">
            <v-btn block @click="logout" color="#FB6F0B">
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
      this.$router.push('/login').then(() => window.location.reload());
    },
    navigateTo(route) {
      this.$router.push(route).then(() => window.location.reload());
      this.drawer = false;
    },

    showSnackbar() {
      this.snackbarMessage = 'Em construção';
      this.snackbar = true;
    }
  }
};


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap');
.flexwork {
  font-family: "Rowdies", sans-serif;
  font-size: 30px;
  color: #FB6F0B;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px 0 0;
}



</style>
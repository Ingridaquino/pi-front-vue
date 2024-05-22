<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-col sm="2">
          <v-avatar size="40px" @click="drawer = !drawer" class="cursor-pointer">
            <v-img :src="avatar" alt="Avatar"></v-img>
          </v-avatar>
        </v-col>

        <v-toolbar-title>{{ name }}</v-toolbar-title>

        <v-spacer></v-spacer>

      </v-app-bar>

      <v-navigation-drawer class="bg-primary" v-model="drawer" temporary>
        <v-list class="py-10">
          <v-list-item v-if="$route.path === '/home/feeds'" prepend-icon="mdi-account-box" title="Perfil"
            @click="$router.push('/user'); drawer = false;">
          </v-list-item>
          <v-list-item v-else prepend-icon="mdi-view-dashboard" title="Feeds"
            @click="$router.push('/home/feeds'); drawer = false;">
          </v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Configurações" @click="$router.push('/editar-perfil'); drawer = false;">
          </v-list-item>        
      </v-list>
      
      <template v-slot:append>
        <div class="pa-10">
          <v-btn block @click="logout">
            Logout
          </v-btn>
          <v-btn class="mt-2" block color="error" @click="handleDelete">Deletar</v-btn>
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


const router = useRouter();

export default {
  data() {
    return {
      drawer: false,
      avatar: '',
      name: '',
      snackbar: false,
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.avatar) {
      this.avatar = `data:image/jpeg;base64,${user.avatar}`;
      this.name = user.name;
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },


    async handleDelete() {
    const token = localStorage.getItem('token');
    const response = await fetch('/usuario', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        this.snackbarMessage = 'Perfil deletado com sucesso!';
        this.snackbar= true;
        localStorage.removeItem('token');
        this.router.push('/login');
    } else {
        this.snackbarMessage = 'Erro ao deletar o perfil!';
        this.snackbar= true;
    }
}
  }
};


</script>

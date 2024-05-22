<template>
  <div class="login__container">
    <CPBackground />

    <div class="login__container__box">
      <form @submit.prevent="login">
        <div class="login__container--form">
          <div class="inputs">
            <CPInput type="text" label="Usuário" v-model="user" required />
            <CPInput :type="show ? 'text' : 'password'" label="Senha" v-model="senha"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'" required @click:append-inner="show = !show" />
            <v-select :items="['Profissional', 'Cliente']" label="Tipo de Perfil" v-model="perfil" required
              variant="outlined"></v-select>
          </div>
          <div class="button">
            <CPButton text="Entrar" type="submit" variant="default" size="large"></CPButton>
          </div>

          <span>Não é cadastrado? <a href="/register">Cadastre-se.</a></span>
        </div>
      </form>
    </div>

    <v-snackbar v-model="snackbar" color="success">
      Login bem-sucedido!
      <v-btn color="white" text @click="snackbar = false"> Fechar </v-btn>
    </v-snackbar>
  </div>
</template>
<script setup>
import CPInput from '@/components/Input/CPInput.vue'
import CPButton from '@/components/Button/CPButton.vue'
import CPBackground from '@/components/Background/CPBackground.vue';
import axios from "axios";

import { useRouter } from 'vue-router';
import { ref } from 'vue'
const router = useRouter();

const user = ref('')
const senha = ref('')
const snackbar = ref(false)
const show = ref(false)
const perfil = ref('')



const login = async () => {
  let data = {
    usuario: user.value,
    senha: senha.value,
    tipo: perfil.value
  }

  localStorage.setItem('tipo', perfil.value);
  try {
    const response = await axios.post('http://localhost:5000/login', data);
 
    if (response.data.Success) {
      
      localStorage.setItem('token', response.data.Token);
 
      const userResponse = await axios({
        method: 'get',
        url: `http://localhost:5000/${perfil.value.toLocaleLowerCase()}?_id=${response.data._id}`,
        headers: { 'token': response.data.Token }
      }); 

      router.push('/home/feeds').then(() => {
        location.reload();
      });
 
      localStorage.setItem('user', JSON.stringify(userResponse.data.Data));
 
      snackbar.value = true;
    }
  } catch (error) {
    console.error(error);
    alert('Usuário ou senha inválidos');
  }
}
</script>

<style>
.login__container {
  display: grid;
  grid-template-columns: 330px 1fr;
  width: 100vw;
  height: 100vh;
}

.login__container__box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 20px;
}

.login__container--form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inputs {
  width: 400px;
  margin-bottom: 60px;
}

.button {
  margin-bottom: 8px;
}

span {
  font-size: 12px;

  a {
    text-decoration: none;
    font-weight: 600;
    color: var(--color-primary);
  }
}
</style>

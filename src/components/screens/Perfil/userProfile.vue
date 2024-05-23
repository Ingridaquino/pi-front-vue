<template>
  <div class="profile__container">
    <CardUser />
    <div class="textarea__flexA">
      <v-textarea label="Sobre" variant="solo" v-model="sobre" name="input-7-4" @blur="saveData"></v-textarea>
      <v-textarea label="Avaliações" variant="solo" v-model="avaliacoes" name="input-7-4" @blur="saveData"></v-textarea>
    </div>

    <div class="portfolio--button" v-if="userType !== 'Cliente'">
      <v-btn color="primary" @click="showModal = true" class="mb-5 mx-auto">
        Adicionar Portfólio
      </v-btn>
    </div>

    <v-dialog v-model="showModal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar ao Portfólio</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-file-input variant="outlined" v-model="capaFile" label="Capa" @change="handleFileUpload('capa', $event)"
              accept="image/*"></v-file-input>
            <v-text-field variant="outlined" v-model="titulo" label="Título"></v-text-field>
            <v-textarea variant="outlined" v-model="descricao" label="Descrição"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showModal = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="savePortfolio">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="portfolio__container" v-if="userType !== 'Cliente'">
      <v-card>
        <v-card-title>
          <h3>Portfólio</h3>
        </v-card-title>
        <div class="portfolio">

          <div class="feeds--bg">
            <v-img max-height="130" :width="1000" aspect-ratio="16/9" cover :src="capa"></v-img>
          </div>

          <div class="">
            <v-list-item class="mt-4">
              <template v-slot:title class="mb-2">
                <strong class="text-h6 mb-2">{{ titulo }}</strong>
              </template>
              <template v-slot:subtitle >
                {{ descricao }}
              </template>
            </v-list-item>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import CardUser from './components/CardUser.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios';

let user = null
let sobre = ref('')
let avaliacoes = ref('')
let portfolio = ref([])

let perfil = ref('')
let token = ref('')
let capa = ref('')
let imagem = ref([])
let descricao = ref('')
let titulo = ref('')
let showModal = ref(false)


let capaFile = ref(null)


onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('user'));
  user = userData[0];

  sobre.value = user.bio;

  perfil.value = localStorage.getItem('tipo');
  token.value = localStorage.getItem('token');

});

const getUserData = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/${perfil.value}?_id=${user._id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

const getPortfolio = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:5000/portfolio?_id=${user._id}`,
    });

    portfolio.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

const savePortfolio = async () => {
  let data = {
    capa: capa.value,
    descricao: descricao.value,
    titulo: titulo.value,
    imagens: ''
  };

  try {
    const response = await axios({
      method: 'post',
      url: `http://localhost:5000/portfolio?_id=${user._id}`,
      headers: { 'token': token.value },
      data
    });

    getPortfolio();
    showModal.value = false;
  } catch (error) {
    console.error(error);
  }
}

const saveData = async () => {
  try {
    let data = {
      ...user,
      bio: sobre.value || user.bio,
    }
    const response = await axios({
      method: 'put',
      url: `http://localhost:5000/${perfil.value.toLocaleLowerCase()}?_id=${user._id}`,
      headers: { 'token': token.value },
      data
    });

    getUserData();
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

function handleFileUpload(imageType, event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (imageType === 'capa') {
      capa.value = e.target.result;
    } else if (imageType === 'imagem') {
      imagem.value = e.target.result;
    }
  };
  reader.readAsDataURL(file);
}

</script>




<style scoped>
.profile__container {
  padding: 20px;
}

.textarea__flexA {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 20px;
}

.flex {
  padding: 20px;
  height: 100vh;
}

.feeds--bg {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.feeds--bg v-img__img {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  /* This ensures the image covers the entire area */
}


.feeds__avatar {
  margin-top: -25px;
  background-color: #fff;
  border: 2px solid #f0f0f0;
  border-radius: 50%;
}

.portfolio--button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.portfolio__container {
  margin: 20px;
}

.portfolio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.v-card-title {
  justify-content: center;
  text-align: center;
}

.v-card {
  padding: 20px;
}

.v-card-actions {
  display: flex;
  justify-content: flex-end;
}

.v-btn {
  margin: 10px;
}
</style>

<template>
  <div class="profile__container">
    <CardProfile />
    <div class="textarea__flexA">
      <v-textarea label="Sobre" variant="solo" v-model="sobre" name="input-7-4" disabled></v-textarea>
      <v-card :style="{ height: '170px' }">
        <v-card-title>
          <h3>Avaliação</h3>
        </v-card-title>
        <div class="text-center">
          <v-rating v-model="rating" active-color="orange" color="orange-lighten-1" @input="sendRating"></v-rating>
        </div>
      </v-card>
    </div>

    <div class="portfolio__container" v-if="userType !== 'Cliente'">
      <v-card disabled>
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
              <template v-slot:subtitle>
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
import CardProfile from './components/CardProfile.vue'
import { ref, onMounted, watchEffect} from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const sobre = ref('')
const avaliacoes = ref([])
const portfolio = ref([])

let user = null
let capa = ref('')

let descricao = ref('')
let titulo = ref('')

let rating = ref(2)
let totalRating = ref(0)

onMounted(async () => {

  const id = route.params.id
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:5000/profissional?_id=${id}`, {
      headers: { 'token': token }
    })
    user = response.data.Data;

    sobre.value = user[0].bio
    avaliacoes.value = user.avaliacoes


    const getPortfolio = await axios({
      method: 'get',
      url: `http://localhost:5000/portfolio`,
      headers: { 'token': token }
    });

    portfolio.value = getPortfolio.data.Data;


    portfolio.value.forEach(item => {
      capa.value = item.capa;
      descricao.value = item.descricao;
      titulo.value = item.titulo;
    });

  } catch (error) {
    console.error(error)
  }

})


const sendRating = async () => {
  const token = localStorage.getItem('token');
  const id = route.params.id
  try {
      await axios.post(`http://localhost:5000/avaliacao`, {
      avaliacao: rating.value,
      profissional_id: id
    }, {
      headers: { 'token': token }
    })

    fetchRating()
  } catch (error) {
    console.error(error)
  }
}

const fetchRating = async () => {
  const token = localStorage.getItem('token');
  const id = route.params.id;
  try {
    const response = await axios.get(`http://localhost:5000/avaliacao/profissional?_id=${id}`, {
      headers: { 'token': token }
    });
    
    totalRating.value = response.data.Data.media
  } catch (error) {
    console.error(error);
  }
};

watchEffect(() => {
  sendRating()

})


</script>

<style scoped>
.profile__container {
  padding: 20px;
}

.textarea__flexA {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 0 20px;
}

.flex {
  padding: 0 20px;
  height: 100vh;
}
</style>


<style scoped>
.profile__container {
  padding: 20px;

  overflow: auto;
  max-height: 100%;
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
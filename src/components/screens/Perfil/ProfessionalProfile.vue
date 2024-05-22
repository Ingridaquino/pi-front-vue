<template>
    <div class="profile__container">
        <CardProfile />
        <div class="textarea__flexA">
            <v-textarea label="Sobre" variant="solo" :value="sobre" name="input-7-4" disabled></v-textarea>
            <v-textarea label="Avaliações" variant="solo" :value="avaliacoes" name="input-7-4" disabled></v-textarea>
        </div>
        <div class="flex">
            <v-textarea label="Portfólio" variant="solo" :value="portfolio" name="input-7-4" disabled></v-textarea>
            <v-textarea label="Projetos" variant="solo" :value="projetos" name="input-7-4" disabled></v-textarea>
        </div>
    </div>
</template>

<script setup>
import CardProfile from './components/CardProfile.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const sobre = ref('')
const avaliacoes = ref([])
const portfolio = ref([])
const projetos = ref([])

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await axios.get(`professional/${id}`)

    sobre.value = response.data.sobre
    avaliacoes.value = response.data.avaliacoes
    portfolio.value = response.data.portfolio
    projetos.value = response.data.projetos
  } catch (error) {
    console.error(error)
  }
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
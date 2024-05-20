<template>
    <div class="profile__container">
        <CardUser />
        <div class="textarea__flexA">
            <v-textarea label="Sobre" variant="solo" :value="sobre" name="input-7-4" ></v-textarea>
            <v-textarea label="Avaliações" variant="solo" :value="avaliacoes" name="input-7-4" ></v-textarea>
        </div>
        <div class="flex">
            <v-textarea label="Portfólio" variant="solo" :value="portfolio" name="input-7-4" ></v-textarea>
            <v-textarea label="Projetos" variant="solo" :value="projetos" name="input-7-4" ></v-textarea>
        </div>
    </div>
</template>

<script setup>
import CardUser from './components/CardUser.vue'
import { ref, onMounted } from 'vue'

const sobre = ref('')
const avaliacoes = ref([])
const portfolio = ref([])
const projetos = ref([])

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    sobre.value = user.sobre;
    avaliacoes.value = user.avaliacoes;
    portfolio.value = user.portfolio;
    projetos.value = user.projetos;
  }
});
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
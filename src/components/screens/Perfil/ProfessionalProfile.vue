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
import { ref } from 'vue'

const sobre = ref('')
const avaliacoes = ref([])
const portfolio = ref([])
const projetos = ref([])
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
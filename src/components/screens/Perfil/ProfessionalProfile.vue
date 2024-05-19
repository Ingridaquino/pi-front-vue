<template>
    <div class="profile__container">
        <CardProfile />
        <div class="">
            <v-textarea label="Sobre" variant="solo" :value="sobre" name="input-7-4"></v-textarea>
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

</style>

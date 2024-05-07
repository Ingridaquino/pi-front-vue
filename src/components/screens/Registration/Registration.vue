<template>
    <div class="registration__container">
        <CPBackground />
        
        <div class="registration__boxes">
            <!-- <div class="box-switch">
                <v-switch v-model="selectedOption" :label="selectedOption === 'cliente' ? 'Cliente' : 'Profissional'" :value="selectedOption" :items="['cliente', 'profissional']" dense></v-switch>
            </div>
            <ClientRegister v-if="selectedOption === 'cliente'"/> -->
            <ProfessionalRegistration  />
        </div>
    </div>
</template>

<script setup>
import ProfessionalRegistration from './ProfessionalRegistration.vue'
import ClientRegister from './ClientRegister.vue';
import CPBackground from '@/components/Background/CPBackground.vue';
import { ref, onMounted } from 'vue';

const selectedOption = ref(localStorage.getItem('selectedOption'));

onMounted(() => {
    localStorage.setItem('selectedOption', selectedOption.value);
});
</script>

<style scoped>
.registration__container {
    display: grid;
    grid-template-columns: 330px 1fr;
    width: 100vw;
    height: 100vh;
}

.box-switch {
    display: flex;
    justify-content: flex-end;
    margin: 0 20px 0 0;
    height: 30px;
}

</style>


<template>
    <div class="registration__container">
        <CPBackground />
        
        <div class="registration__boxes">
            <div class="box-switch">
                <v-switch class="my-switch" v-model="selectedOption" :label="selectedOption ? 'Cliente' : 'Profissional'" :options="['cliente', 'profissional']" ></v-switch>
            </div>
            <ClientRegister v-if="selectedOption"/>
            <ProfessionalRegistration v-else />

            <div class="registration--button">
              <CPButton text="Salvar" type="submit" size="small" variant="default"  @click="router.push('/registration-email')"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import ProfessionalRegistration from './ProfessionalRegistration.vue'
import ClientRegister from './ClientRegister.vue';
import CPBackground from '@/components/Background/CPBackground.vue';
import { ref, onMounted } from 'vue';
import CPButton from '@/components/Button/CPButton.vue';
import router from '@/router';

const selectedOption = ref(true);


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
    height: 20px;
}

.registration--button {
    display: flex;
    justify-content: flex-end;
    margin: 40px 60px;
}

</style>


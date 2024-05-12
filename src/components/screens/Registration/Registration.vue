<template>
    <div class="registration__container">
        <CPBackground />

        <div class="registration__boxes">
            <div class="box-switch">
                <v-switch class="my-switch" v-model="selectedOption"
                    :label="selectedOption ? 'Cliente' : 'Profissional'"
                    :options="['cliente', 'profissional']"></v-switch>
            </div>

            <div class="professional__container--inputs">
                <form>
                    <CPStepper text="Dados Pessoais" />
                    <div class="inputs">
                        <PersonalData :form="form" />
                    </div>

                    <CPStepper text="Endereço" />
                    <div class="inputs">
                        <Address :form="form" />
                    </div>

                    <CPStepper text="Dados Profissionais" v-if="!selectedOption" />
                    <div class="inputs" v-if="!selectedOption">
                        <ProfessionalDetails :form="form" />
                    </div>

                    <CPStepper text="Contatos" />
                    <div class="inputs">
                        <Contacts :form="form" />
                    </div>
                </form>
            </div>

            <div class="registration--button">
                <CPButton text="Salvar" type="submit" size="small" variant="default" 
                    @click="redirectToRegistrationEmail" />
            </div>
        </div>
    </div>
</template>

<script setup>

import PersonalData from "./components/PersonalData.vue";
import Address from "./components/Address.vue";
import ProfessionalDetails from "./components/ProfessionalDetails.vue";
import Contacts from "./components/Contacts.vue";

import CPStepper from "@/components/Stepper/CPStepper.vue";
import CPBackground from '@/components/Background/CPBackground.vue';
import { ref, onMounted } from 'vue';
import CPButton from '@/components/Button/CPButton.vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const selectedOption = ref(true);


let form = ref({
    type: "",
    name: "",
    date: "",
    gender: "",
    cep: "",
    number: "",
    complement: "",
    neighborhood: "",
    area: "",
    specialty: "",
    phone: "",
    network: "",
});

function redirectToRegistrationEmail() {
    if (form.value !== '') {
        form.value.type = selectedOption.value ? 'cliente' : 'profissional';
        
        if (form.value.phone !== '') {
            localStorage.setItem('formData', JSON.stringify(form.value));
            router.push('registration-email');
        } else {
            alert('Preencha todos os campos obrigatórios');
        }
    } else {
        alert('Preencha todos os campos obrigatórios');
    }
}


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



.inputs {
    margin: 0 20px;
}

.v-field__input {
    display: inline !important;
}
</style>

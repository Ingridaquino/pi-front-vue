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
                <form @submit.prevent="handleSubmit">
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

                    <div class="registration--button">
                        <CPButton text="Salvar" type="submit" size="small" variant="default" />
                    </div>
                </form>
            </div>
        </div>

        <v-snackbar v-model="snackbar" :timeout="6000" vertical color="snackbar" top right> 
            {{ snackbarMessage }}
            <template v-slot:actions>
                <v-btn color="primary" text @click="snackbar = false">
                    Fechar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PersonalData from "./components/PersonalData.vue";
import Address from "./components/Address.vue";
import ProfessionalDetails from "./components/ProfessionalDetails.vue";
import Contacts from "./components/Contacts.vue";
import CPStepper from "@/components/Stepper/CPStepper.vue";
import CPBackground from '@/components/Background/CPBackground.vue';
import CPButton from '@/components/Button/CPButton.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

const router = useRouter();
const selectedOption = ref(true);
const type = ref('');

const snackbar = ref(false);
const snackbarMessage = ref('');

const form = ref({
    name: "",
    date: "",
    gender: "",
    document: "",

    number: "",
    complement: "",
    neighborhood: "",
    cep: '',
    city: '',
    state: '',

    area: "",
    specialty: "",

    phone: "",
    instagram: '',
    facebook: '',
    whatsapp: '',
    twitter: '',


    photo: '',
});

const rules = {
    name: { required },
    date: { required },
    gender: { required },
    document: { required },
    number: { required },
    complement: { required },
    neighborhood: { required },
    area: { required },
    specialty: { required },
    phone: { required },
    network: { required },
    cep: { required },
    city: { required },
    state: { required },
    
};

const v$ = useVuelidate(rules, form);

const isValid = v$.value.$validate();

async function handleSubmit() {

    if (isValid) {
        type.value = selectedOption.value ? 'cliente' : 'profissional';
        localStorage.setItem('formData', JSON.stringify(form.value));
        localStorage.setItem('type', JSON.stringify(type.value));

        snackbarMessage.value = 'Salvo!';
        snackbar.value = true;

        router.push('registration-email');
    } else {
        snackbarMessage.value = 'Preencha todos os campos!';
        snackbar.value = true;
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

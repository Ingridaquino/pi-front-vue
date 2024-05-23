<template>
    <div class="registration__container">
        <div class="background"></div>

        <div class="registration__boxes">
            <div class="registration--buttonVoltar">

                <v-btn variant="plain" color="orange" @click="handleBack" size="small">
                    <strong>Voltar</strong>
                </v-btn>
            </div>
            <div class="box-switch">
                <v-switch class="my-switch" v-model="selectedOption" color="orange"
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
import Contacts from "./components/Contacts.vue";
import CPStepper from "@/components/Stepper/CPStepper.vue";

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

    area: [],
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


const handleBack = () => {
    router.push('login');
    localStorage.clear();
}

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
.background {
    background-color: var(--color-primary);
    border-radius: 0 45px 45px 0;
    height: 100%;

}

.registration__container {
    display: grid;
    grid-template-columns: 20% 1fr;
    overflow: auto;
    max-height: 100%;
}

.box-switch {
    display: flex;
    justify-content: flex-end;
    margin: 0 40px 0 0;
    height: 20px;
}

.registration--button {
    display: flex;
    justify-content: flex-end;
    margin: 40px 60px;
}

.registration--buttonVoltar {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
}



.inputs {
    margin: 0 20px;
}

.v-field__input {
    display: inline !important;
}
</style>

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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import PersonalData from "./components/PersonalData.vue";
import Address from "./components/Address.vue";
import ProfessionalDetails from "./components/ProfessionalDetails.vue";
import Contacts from "./components/Contacts.vue";
import CPStepper from "@/components/Stepper/CPStepper.vue";
import CPBackground from '@/components/Background/CPBackground.vue';
import CPButton from '@/components/Button/CPButton.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

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
    area: "",
    specialty: "",
    phone: "",
    network: "",
});

const requiredMessage = helpers.withMessage('Este campo é obrigatório', required);

const rules = computed(() => ({
    name: { required: requiredMessage },
    date: { required: requiredMessage },
    gender: { required: requiredMessage },
    document: { required: requiredMessage },
    number: { required: requiredMessage },
    complement: { required: requiredMessage },
    neighborhood: { required: requiredMessage },
    area: { required: requiredMessage },
    specialty: { required: requiredMessage },
    phone: { required: requiredMessage },
    network: { required: requiredMessage },
}));

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
    const isValid = await v$.value.$validate();

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

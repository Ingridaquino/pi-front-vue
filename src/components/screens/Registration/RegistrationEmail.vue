<template>
    <div class="registration__container">
        <CPBackground />
        <div class="registration__box">
            <CPStepper text="E-mail e Senha" />
            <form @submit.prevent="handleSubmit">
              
                <div class="inputs">
                    <CPInput 
                        label="Digite o e-mail *"  
                        v-model="form.email"  
                        :error-messages="v$.email.$errors.map(e => e.$message)" 
                    />
                    <CPInput 
                        label="Confirme o e-mail *" 
                        v-model="form.confirmEmail" 
                        :error-messages="v$.confirmEmail.$errors.map(e => e.$message)" 
                    />
                    <div class="divider">
                        <v-divider class="border-opacity-50"></v-divider>
                    </div>
                    <CPInput 
                        label="Digite a senha *" 
                        v-model="form.password"  
                        type="password" 
                        :error-messages="v$.password.$errors.map(e => e.$message)"
                    />
                    <CPInput 
                        label="Confirme a senha *"  
                        v-model="form.confirmPassword" 
                        type="password" 
                        :error-messages="v$.confirmPassword.$errors.map(e => e.$message)"
                    />
                    <div>
                        <v-checkbox label="Concorda com os Termos?" v-model="form.agreeToTerms" :rules="[v$.agreeToTerms.required]" />
                    </div>
                </div>
    
                <div class="registration--button">
                    <CPButton text="Salvar" type="submit" size="small" variant="default" />
                </div>
            </form>
        </div>
        <v-snackbar v-model="snackbar" :timeout="18000000" vertical color="snackbar" top right> 
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
import CPBackground from '@/components/Background/CPBackground.vue'
import CPStepper from '@/components/Stepper/CPStepper.vue'
import CPInput from '@/components/Input/CPInput.vue'
import CPButton from '@/components/Button/CPButton.vue'

import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import axios from "axios";


import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';


const requiredMessage = helpers.withMessage('Este campo é obrigatório', required);
const emailMessage = helpers.withMessage('E-mail inválido', email);
const minLengthMessage = helpers.withMessage('A senha deve ter pelo menos 8 caracteres', minLength(8));
const sameAsMessage = (field, message) => helpers.withMessage(message, sameAs(field));



const form = ref({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
});

const snackbar = ref(false);
const snackbarMessage = ref('');

const rules = computed(() => ({
    email: { required: requiredMessage, email: emailMessage },
    confirmEmail: { required: requiredMessage, sameAs: sameAsMessage(form.value.email, 'Os e-mails devem ser iguais') },
    password: { required: requiredMessage, minLength: minLengthMessage },
    confirmPassword: { required: requiredMessage, sameAs: sameAsMessage(form.value.password, 'As senhas devem ser iguais') },
    agreeToTerms: { required: requiredMessage }
}));

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
    const result = await v$.value.$validate();

    if (!result) {
        snackbarMessage.value = 'Error!';
        snackbar.value = true;
        return;
    } else {
        createdProfile();
    }
}

async function createdProfile() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    const profile = JSON.parse(localStorage.getItem('type'));

    let data = {
        ...form.value,
        ...formData
    }

    if (formData) {
        await axios.post(`/${profile}`, data)
            .then(response => {
                snackbarMessage.value = 'Data sent successfully!';
                snackbar.value = true;
            })
            .catch(error => {
                snackbarMessage.value = 'Failed to send data';
                snackbar.value = true;
                console.error(error);
            });
    } else {
        snackbarMessage.value = 'No data found in localStorage';
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
.registration__box {
    margin: 20px 0;
}
.inputs {
    width: 400px;
    margin: 100px auto
}
.divider {
    width: 200px;
    height: 40px;
    margin: 0 auto;
}
.registration--button {
    display: flex;
    justify-content: flex-end;
    margin: 40px 60px;
}
.error-message {
    color: red;
    margin-top: 10px;
}
</style>
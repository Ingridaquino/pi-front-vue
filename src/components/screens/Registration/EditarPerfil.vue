<template>
    <div class="registration__container">
        <div class="background"></div>

        <div class="registration__boxes">
            <div class="box-switch">
                <p>Editar cadastro</p>
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

                    <CPStepper text="Dados Profissionais" v-if="type === 'Profissional'" />
                    <div class="inputs" v-if="type === 'Profissional'">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PersonalData from "./components/PersonalData.vue";
import Address from "./components/Address.vue";
import ProfessionalDetails from "./components/ProfessionalDetails.vue";
import Contacts from "./components/Contacts.vue";
import CPStepper from "@/components/Stepper/CPStepper.vue";
import CPBackground from '@/components/Background/CPBackground.vue';
import CPButton from '@/components/Button/CPButton.vue';

import axios from 'axios';

const router = useRouter();
const selectedOption = ref(true);
const type = ref(localStorage.getItem('tipo'));

const snackbar = ref(false);
const snackbarMessage = ref('');

const form = ref({
    name: '',
    date: '',
    gender: '',
    document: '',
    number: '',
    complement: '',
    neighborhood: '',
    cep: '',
    city: '',
    state: '',
    area: '',
    specialty: '',
    phone: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    twitter: '',
    photo: '',
});

const populateFormFromLocalStorage = () => {
    const userData = JSON.parse(localStorage.getItem('user'))

    let user = userData[0];

    console.log(   form.value.photo = user.foto , 'foto');
    form.value.name = user.nome || '';
    form.value.date = user.nascimento || '';
    form.value.gender = user.genero || '';
    form.value.document = user.document;
    form.value.number = user.endereco.numero || '';
    form.value.complement = user.endereco.rua || '';
    form.value.neighborhood = user.endereco.bairro || '';
    form.value.cep = user.endereco.cep || '';
    form.value.city = user.endereco.cidade || '';
    form.value.state = user.endereco.estado || '';
    form.value.area = user.atuacao || '';

    form.value.phone = user.contato.telefone || '';
    form.value.instagram = user.contato.instagram || '';
    form.value.facebook = user.contato.facebook || '';
    form.value.whatsapp = user.contato.whatsapp || '';
    form.value.twitter = user.contato.twitter || '';
    form.value.photo = user.foto || '';
};

onMounted(() => {
    populateFormFromLocalStorage();
});

const handleSubmit = async () => {
    await handleUpdate();
};

const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const tipo = localStorage.getItem('tipo').toLowerCase();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user[0];



    let data = {
        ...userId,
        contato: {
            email: userId.contato.email,
            facebook: form.value.facebook ,
            instagram: form.value.instagram,
            twitter: form.value.twitter,
            whatsapp: form.value.whatsapp,
            telefone: form.value.phone,
        },
        endereco: {
            bairro: form.value.neighborhood,
            cep: form.value.cep,
            cidade: form.value.city,
            estado: form.value.state,
            rua: form.value.complement,
            numero: form.value.number,
        },
        foto: form.value.photo,
        genero: form.value.gender,
        nome: form.value.name,
        nascimento: form.value.date,
        atuacao: form.value.area,
    };

const response = await axios.put(`http://localhost:5000/${tipo}?_id=${userId._id}`, data, {
    headers: { 'token': token},
});
if (response.status >= 200 && response.status < 300) {
    snackbarMessage.value = 'Dados atualizados com sucesso!';
    snackbar.value = true;
    router.push('/user').then(() => window.location.reload());
} else {
    snackbarMessage.value = 'Erro ao atualizar os dados!';
    snackbar.value = true;
}
};
</script>



<style scoped>
.background {
    background: var(--color-primary);
    border-radius: 0 45px 45px 0;
    height: 100%;
}

.registration__container {
    display: grid;
    grid-template-columns: 10% 1fr;
    overflow: auto;
    max-height: 100%;
}

.box-switch {
    display: flex;
    justify-content: flex-end;
    margin: 10px 30px 0 0;
    height: 20px;

    p {
        font-size: 14px;
        color: var(--color-primary);
    }
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

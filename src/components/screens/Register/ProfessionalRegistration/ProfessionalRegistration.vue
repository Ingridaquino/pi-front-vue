<template>
    <div class="professional__container">
        <CPBackground />
        <div class="professional__container--inputs">
            <form>
                <CPStepper text="Dados Pessoais"/>
                <div class="inputs">
                    <PersonalData  :form="form"/>
                </div>

                <CPStepper text="Endereço"/>
                <div class="inputs">
                    <Address :form="form"/>
                </div>

                <CPStepper text="Dados Profissionais"/>
                <div class="inputs">
                    <ProfessionalDetails :form="form"/>
                </div>

                <CPStepper text="Contatos"/>
                <div class="inputs">
                    <Contacts :form="form"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import CPStepper from '@/components/Stepper /CPStepper.vue';
import CPBackground from '@/components/Background/CPBackground.vue';
import PersonalData from './components/PersonalData.vue';
import Address from './components/Address.vue';
import ProfessionalDetails from './components/ProfessionalDetails.vue';
import Contacts from './components/Contacts.vue';


import { ref } from 'vue';


let form = ref({
    name: '',
    date: '',
    gender: '',
    text: '',
    number: '',
    complement: '',
    neighborhood: '',
    area: '',
    specialty: '',
    phone: '',
    network: ''


});


</script>

<style>
.professional__container {
    display: grid;
    grid-template-columns: 330px 1fr;
    width: 100vw;
    height: 100vh;
}

.professional__container--inputs {
    padding: 20px 0;
}

.inputs {
    margin: 0 20px
}


.v-field__input {
    display: inline !important;
}

</style>
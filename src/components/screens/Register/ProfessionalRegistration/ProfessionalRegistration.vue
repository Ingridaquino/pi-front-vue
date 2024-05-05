<template>
    <div class="professional__container">
        <CPBackground />

        <div class="professional__container--inputs">
            <CPStepper text="Dados Pessoais"/>
            <form>
                <div class="inputs">
                    <div class="inputs-gridA">
                        <CPInput v-model="name" label="Nome Completo" type="name" />
                        <CPInput v-model="text" label="CPF" type="text" size="small" />
                        <CPAvatar size="100"/>
                    </div>
                    <div class="inputs-gridB">
                        <CPInput v-model="date" label="Data de Nascimento" type="date" />
                        <CPSelect v-model="gender" label="Gênero" :options="genders" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import CPAvatar from '@/components/Avatar/CPAvatar.vue';
import CPBackground from '@/components/Background/CPBackground.vue';
import CPInput from '@/components/Input/CPInput.vue';
import CPSelect from '@/components/Select/CPSelect.vue';
import CPStepper from '@/components/Stepper /CPStepper.vue';


import { ref } from 'vue';

let name = ref('')
let date = ref('')
let gender = ref('')
let text = ref('')

console.log(name, '?')
const genders = ['Masculino', 'Feminino', 'Outro'];
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
    
}

.inputs-gridA {
    display: flex;
    flex-direction: row;
    gap: 8px;
}

.v-field__input {
    display: inline !important;
}

</style>
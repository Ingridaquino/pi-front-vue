<template>
    <div class="inputs-box">
        <div class="inputs-gridA">
            <CPInput v-model="form.name" label="Nome Completo *" type="name" :error-messages="v$.form.name.$error"  @blur="v$.form.name"/>
            <CPInput v-model="form.cep" label="CPF *" type="text" v-mask-cpf :error-messages="v$.form.text.$error" @blur="v$.form.text" />
            <CPInput v-model="form.date" label="Data de Nascimento *" type="date" :error-messages="v$.form.date.$error" @blur="v$.form.date" min="1899-12-30"
            max="2001-12-30" required/>
            <CPSelect v-model="form.gender" label="Gênero *" :options="genders" @change="v$.form.gender" />
        </div>
        <div class="inputs-gridB">
            <CPAvatar size="90" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';
import CPSelect from '@/components/Select/CPSelect.vue';
import CPAvatar from '@/components/Avatar/CPAvatar.vue';

const props = defineProps({
    form: {
        default: () => ({
            name: '',
            cep: '',  
            date: '',
            gender: '' 
        })
    }
});

const genders = ['Masculino', 'Feminino', 'Outro'];

const rules = {
    form: {
        name: { required },
        cep: { required, maxLength: maxLength(11), minLength: minLength(11) },
        date: { required },
    }
};

const v$ = useVuelidate(rules, props.form);


</script>

<style scoped>
.inputs-box {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 8px;
}

.inputs-gridA {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}
</style>
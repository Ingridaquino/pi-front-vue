<template>
    <div class="inputs-box">
        <div class="inputs-gridA">
            <CPInput v-model="form.name" label="Nome Completo" type="name" :error="v$.form.name.$error"  @blur="v$.form.name"/>
            <CPInput v-model="form.text" label="CPF" type="text" v-mask-cpf :error="v$.form.text.$error" @blur="v$.form.text" />
            <CPInput v-model="form.date" label="Data de Nascimento" type="date" :error="v$.form.date.$error" @blur="v$.form.date"/>
            <CPSelect v-model="form.gender" label="Gênero" :options="genders" @change="v$.form.gender" />
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
            text: '',  
            date: '',
            gender: '' 
        })
    }
});

const genders = ['Masculino', 'Feminino', 'Outro'];

const rules = {
    form: {
        name: { required },
        text: { required, maxLength: maxLength(11), minLength: minLength(11) },
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
<template>
    <div class="inputs-box">
        <div class="inputs-gridA">
            <CPInput v-model="form.name" label="Nome Completo" type="name" :error="v$.name.$error" />
            <CPInput v-model="form.text" label="CPF" type="text" v-mask-cpf :error="v$.text.$error" />
            <CPInput v-model="form.date" label="Data de Nascimento" type="date" :error="v$.date.$error" />
            <CPSelect v-model="form.gender" label="Gênero" :options="genders" />
        </div>
        <div class="inputs-gridB">
            <CPAvatar size="90"/>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength, email } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';
import CPSelect from '@/components/Select/CPSelect.vue';
import CPAvatar from '@/components/Avatar/CPAvatar.vue';

const props = defineProps({
    form: {}
});

const genders = ['Masculino', 'Feminino', 'Outro'];

const rules = {
    name: { required },
    text: { required, maxLength: maxLength(11), minLength: minLength(11) },
    date: { required },
    gender: { required }
};

const v$ = useVuelidate(rules, form);

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
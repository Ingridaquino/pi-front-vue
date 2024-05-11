<template>
    <div class="inputs-gridA">
        <CPInput v-model="form.phone" label="Telefone" type="text"  v-mask-phone.br :error-messages="v$.phone.$error ? 'Este campo é obrigatório' : ''" />
        <CPInput v-model="form.network" label="Rede Social" type="url" :error-messages="$v.network.$error ? 'Este campo é obrigatório' : ''" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, url } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';

const props = defineProps({
    form: {}
});


const rules = {
    phone: { required },
    network: { required, url }
}

const v$ = useVuelidate(rules, props.form);
</script>

<style scoped>
.inputs-gridA {
    display: grid;
    grid-template-columns: 1fr 1fr 200px;
    gap: 8px;
    margin-bottom: 70px;
}


</style>
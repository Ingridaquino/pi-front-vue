<template>
    <div class="inputs-gridA">
        <CPInput 
            v-model="form.phone" 
            label="Telefone *" 
            type="text" 
            v-mask-phone.br 
            :error-messages="v$.phone.$errors.length ? (v$.phone.$errors.find(e => e.$message)?.$message || '') : ''"
        />

        <CPInput 
            v-model="form.network" 
            label="Rede Social *" 
            type="text" 
            :error-messages="v$.network.$errors.length ? (v$.network.$errors.find(e => e.$message)?.$message || '') : ''"
        />
    </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';

const props = defineProps({
    form: {
        default: () => ({
            phone: '',
            network: ''
        })
    }
});

const requiredMessage = helpers.withMessage('Este campo é obrigatório', required);

const rules = {
    phone: { required: requiredMessage },
    network: { required: requiredMessage }
};

const { form } = toRefs(props);
const v$ = useVuelidate(rules, form);

</script>


<style scoped>
.inputs-gridA {
    display: grid;
    grid-template-columns: 1fr 1fr 200px;
    gap: 8px;
    margin-bottom: 70px;
}


</style>
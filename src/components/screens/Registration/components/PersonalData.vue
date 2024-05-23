<template>
    <div class="inputs-box">
        <div class="inputs-gridA">
            <CPInput v-model="form.name" label="Nome Completo *" type="name"  :error-messages="v$.name.$errors.length ? (v$.name.$errors.find(e => e.$message)?.$message || '') : ''"/>
            <CPInput v-model="form.document" label="CPF/CNPJ *" type="text" v-mask-cpf :error-messages="v$.document.$errors.length ? (v$.document.$errors.find(e => e.$message)?.$message || '') : ''" :disabled="$route.path === '/editar-perfil'"/>
            <CPInput v-model="form.date" label="Data de Nascimento *" type="date" min="1899-12-30" max="2009-12-30" required  />
            <CPSelect v-model="form.gender" label="Gênero *" :options="genders"  />
        </div>
        <div class="inputs-gridB">
            <CPAvatar size="90" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength, helpers } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';
import CPSelect from '@/components/Select/CPSelect.vue';
import CPAvatar from '@/components/Avatar/CPAvatar.vue';

const props = defineProps({
    form: {
        default: () => ({
            name: '',
            document: '',  
            date: '',
            gender: '',
        })
    }
});

const genders = ['Masculino', 'Feminino', 'Outro'];

const requiredMessage = helpers.withMessage('Este campo é obrigatório', required);
const cpfCnpjLengthMessage = helpers.withMessage('CPF/CNPJ deve ter exatamente 11 dígitos', minLength(11));

const rules = {
    name: { required: requiredMessage },
    document: { required: requiredMessage, minLength: cpfCnpjLengthMessage, maxLength: cpfCnpjLengthMessage },
    date: { required: requiredMessage }
};

const { form } = toRefs(props);
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
<template>
    <div class="inputs-gridA">
        <CPInput v-model="form.number" label="CEP" type="text" v-mask-cep :error-messages="v$.number.$error ? 'CEP deve ter exatamente 8 dígitos' : ''" @input="fetchAddress"/>
        <CPInput v-model="form.complement" label="Rua / AV" type="text" :error-messages="v$.complement.$error ? 'Este campo é obrigatório' : ''" />
        <CPInput v-model="form.neighborhood" label="Bairro" type="text" :error-messages="v$.neighborhood.$error ? 'Este campo é obrigatório' : ''" />
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';
import axios from 'axios';

const props = defineProps({
    form: {
        default: () => ({
            number: '',
            complement: '',
            neighborhood: ''
        })
    }
});

const rules = {
  number: { required, maxLength: maxLength(8) },
  complement: { required },
  neighborhood: { required }
};

const v$ = useVuelidate(rules, props.form);

const fetchAddress = async () => {
  const cep = props.form.number.replace(/\D/g, '');
  if (cep.length === 8) {
    try {
      const response = await axios.get(`https://opencep.com/v1/${cep}`);
      props.form.complement = response.data.logradouro;
      props.form.neighborhood = response.data.bairro;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.inputs-gridA {
    display: flex;
    flex-direction: row;
    gap: 8px;
}
</style>
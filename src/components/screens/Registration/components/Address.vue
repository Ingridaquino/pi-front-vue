<template>
  <div class="inputs-gridA">
      <CPInput 
          v-model="form.cep" 
          label="CEP *" 
          type="text" 
          v-mask-cep.br
          :error-messages="v$.cep.$errors.length ? (v$.cep.$errors.find(e => e.$message)?.$message || '') : ''"
          @input="fetchAddress"
      />
      <CPInput 
          v-model="form.complement" 
          label="Rua *" 
          type="text" 
          :error-messages="v$.complement.$errors.length ? (v$.complement.$errors.find(e => e.$message)?.$message || '') : ''" 
      />
      <CPInput 
          v-model="form.neighborhood" 
          label="Bairro *" 
          type="text" 
          :error-messages="v$.neighborhood.$errors.length ? (v$.neighborhood.$errors.find(e => e.$message)?.$message || '') : ''" 
      />
      
      <CPInput v-model="form.number" label="Número *" type="text" :error-messages="v$.number.$errors.length ? (v$.number.$errors.find(e => e.$message)?.$message || '') : ''" />

      <CPInput 
          v-model="form.city" 
          label="Cidade *" 
          type="text" 
          :error-messages="v$.city.$errors.length ? (v$.city.$errors.find(e => e.$message)?.$message || '') : ''" />
        <CPInput 
          v-model="form.state" 
          label="Estado *" 
          type="text" 
          :error-messages="v$.state.$errors.length ? (v$.state.$errors.find(e => e.$message)?.$message || '') : ''" />

  </div>
</template>


<script setup>
import { defineProps, toRefs } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';
import axios from 'axios';

const props = defineProps({
    form: {
        default: () => ({
            number: '',
            complement: '',
            neighborhood: '',
            cep: '',
            city: '',
            state: ''
        })
    }
});

const requiredMessage = helpers.withMessage('Este campo é obrigatório', required);
const cepLengthMessage = helpers.withMessage('CEP deve ter exatamente 8 dígitos', maxLength(8));

const rules = {
    cep: { required: requiredMessage, maxLength: cepLengthMessage },
    complement: { required: requiredMessage },
    neighborhood: { required: requiredMessage },
    city: { required: requiredMessage },
    state: { required: requiredMessage },
    complement: { required: requiredMessage },
    number: { required: requiredMessage }
};

const { form } = toRefs(props);
const v$ = useVuelidate(rules, form);

const fetchAddress = async () => {
  const numberCep = form.value.cep.replace(/\D/g, '');
  try {
      const { data } = await axios.get(`https://opencep.com/v1/${numberCep}`);
      console.log(data);

        form.value.neighborhood = data.bairro;
        form.value.city = data.localidade;
        form.value.complement = data.logradouro;
        form.value.state = data.uf;

    } catch (error) {
      console.error(error);
    }
};
</script>


<style scoped>
.inputs-gridA {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
}
</style>
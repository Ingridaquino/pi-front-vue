<template>
  <div class="inputs-gridA">
      <CPInput 
          v-model="form.number" 
          label="CEP *" 
          type="text" 
          v-mask-cep 
          :error-messages="v$.number.$errors.length ? (v$.number.$errors.find(e => e.$message)?.$message || '') : ''"
          @input="fetchAddress"
      />
      <CPInput 
          v-model="form.complement" 
          label="Rua / AV *" 
          type="text" 
          :error-messages="v$.complement.$errors.length ? (v$.complement.$errors.find(e => e.$message)?.$message || '') : ''" 
      />
      <CPInput 
          v-model="form.neighborhood" 
          label="Bairro *" 
          type="text" 
          :error-messages="v$.neighborhood.$errors.length ? (v$.neighborhood.$errors.find(e => e.$message)?.$message || '') : ''" 
      />
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
            neighborhood: ''
        })
    }
});

const requiredMessage = helpers.withMessage('Este campo é obrigatório', required);
const cepLengthMessage = helpers.withMessage('CEP deve ter exatamente 8 dígitos', maxLength(8));

const rules = {
  number: { required: requiredMessage, maxLength: cepLengthMessage },
  complement: { required: requiredMessage },
  neighborhood: { required: requiredMessage }
};

const { form } = toRefs(props);
const v$ = useVuelidate(rules, form);

const fetchAddress = async () => {
  const cep = form.value.number.replace(/\D/g, '');
  try {
      const response = await axios.get(`https://opencep.com/v1/${cep}`);
      form.value.complement = response.data.logradouro || form.value.complement;
      form.value.neighborhood = response.data.bairro || form.value.neighborhood;
    } catch (error) {
      console.error(error);
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
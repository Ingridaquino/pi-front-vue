<template>
    <div class="inputs-gridA">
        <CPInput v-model="form.phone" label="Telefone *" type="text" v-mask-phone.br
            :error-messages="v$.phone.$errors.length ? (v$.phone.$errors.find(e => e.$message)?.$message || '') : ''" append-inner-icon="mdi-phone" />
        <CPInput v-model="form.whatsapp" label="WhatsApp" type="text" append-inner-icon="mdi-whatsapp" />

        <CPInput v-model="form.instagram" label="Instagram" type="text" append-inner-icon="mdi-instagram" />
        <CPInput v-model="form.facebook" label="Facebook" type="text" append-inner-icon="mdi-facebook" />
        <CPInput v-model="form.twitter" label="Twitter" type="text" append-inner-icon="mdi-twitter" />




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
            instagram: '',
            facebook: '',
            whatsapp: '',
            twitter: ''
        })
    }
});

const requiredMessage = helpers.withMessage('Este campo é obrigatório', required);

const rules = {
    phone: { required: requiredMessage }
};

const { form } = toRefs(props);
const v$ = useVuelidate(rules, form);

</script>


<style scoped>
.inputs-gridA {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
}
</style>
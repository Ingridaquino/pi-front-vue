<template>
    <div  class="inputs-gridA">
        <CPInput v-model="form.area" label="Área de atuação" type="text" :error-messages="v$.form.area.$error"  />
        <CPSelect v-model="form.specialty" label="Especialidade" :error-messages="v$.form.specialty.$error"  />
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';
import CPSelect from '@/components/Select/CPSelect.vue';

const props = defineProps({
    form: {
        default: {
            area: '',
            specialty: ''
        }
    }
});

const rules = {
    form: {
        area: { required },
        specialty: { required }
    }
};

const v$ = useVuelidate(rules, props.form);

</script>

<style scoped>
.inputs-gridA {
    display: grid;
    grid-template-columns: 1fr 1fr 200px;
    gap: 8px;
}
</style>

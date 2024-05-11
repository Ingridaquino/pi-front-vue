<template>
    <div class="inputs-gridA">
        <CPInput v-model="form.area" label="Área de atuação" type="text" :error-messages="errors.area" />
        <CPSelect v-model="form.specialty" label="Especialidade" :error-messages="errors.specialty" />
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import CPInput from '@/components/Input/CPInput.vue';
import CPSelect from '@/components/Select/CPSelect.vue';

const props = defineProps({
    form: {}
});

const rules = {
    area: { required },
    specialty: { required }
};

const errors = useVuelidate(rules, form);

</script>

<style scoped>
.inputs-gridA {
    display: grid;
    grid-template-columns: 1fr 1fr 200px;
    gap: 8px;
}


</style>
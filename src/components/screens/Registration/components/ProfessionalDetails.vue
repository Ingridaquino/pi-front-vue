<template>
    <div class="inputs-gridA">
        <CPInput v-model="form.area" label="Área de atuação" type="text" />
        <CPSelect v-model="form.specialty" label="Especialidade"/>
    </div>

</template>
<script setup>
import CPInput from '@/components/Input/CPInput.vue';
import CPSelect from '@/components/Select/CPSelect.vue';

const props = defineProps({
    form: {}
})


</script>

<style scoped>
.inputs-gridA {
    display: grid;
    grid-template-columns: 1fr 1fr 200px;
    gap: 8px;
}


</style>
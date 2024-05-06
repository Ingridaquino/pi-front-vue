<template>
    <div class="inputs-gridA">
        <CPInput v-model="form.number" label="CEP" type="text" />
        <CPInput v-model="form.complement" label="Rua / AV" type="text" />
        <CPInput v-model="form.neighborhood" label="Bairro" type="text" />
    </div>

</template>
<script setup>
import CPInput from '@/components/Input/CPInput.vue';

const props = defineProps({
    form: {}
})

</script>

<style scoped>
.inputs-gridA {
    display: flex;
    flex-direction: row;
    gap: 8px;
}


</style>
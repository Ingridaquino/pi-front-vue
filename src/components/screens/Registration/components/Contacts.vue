<template>
    <div class="inputs-gridA">
        <CPInput v-model="form.phone" label="Telefone" type="text"  v-mask-phone.br/>
        <CPInput v-model="form.network" label="Rede Social" type="url" />
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
    display: grid;
    grid-template-columns: 1fr 1fr 200px;
    gap: 8px;
    margin-bottom: 70px;
}


</style>
<template>
    <div class="inputs-box">
        <div class="inputs-gridA">
            <CPInput v-model="form.name" label="Nome Completo" type="name" />
            <CPInput v-model="form.text" label="CPF" type="text" />
            <CPInput v-model="form.date" label="Data de Nascimento" type="date" />
            <CPSelect v-model="form.gender" label="Gênero" :options="genders" />
        </div>
        <div class="inputs-gridB">
            <CPAvatar size="90"/>
        </div>
    </div>
</template>

<script setup>
import CPInput from '@/components/Input/CPInput.vue';
import CPSelect from '@/components/Select/CPSelect.vue';
import CPAvatar from '@/components/Avatar/CPAvatar.vue';

const props = defineProps({
    form: {}
})


const genders = ['Masculino', 'Feminino', 'Outro'];

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
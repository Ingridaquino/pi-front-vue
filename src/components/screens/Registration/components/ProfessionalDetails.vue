<template>
  <v-autocomplete v-model="newArea" :items="areas" label="Área de atuação" item-title="descricao" item-value="_id"
    return-object @change="addArea" variant="outlined"></v-autocomplete>

  <v-btn @click="addArea" color="primary">Adicionar</v-btn>

  <v-row>
    <v-col cols="12" class="mt-5">
      <v-chip v-for="(area, index) in form.area" :key="index" closable @click:close="removeArea(area._id)">
        {{ area.descricao }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  form: {
    default: () => ({
      area: []
    })
  }
});

const newArea = ref('');
const areas = ref([]);

const getAreas = async () => {
  const token = localStorage.getItem('token');
  const headers = {
    headers: { 'token': token }
  };

  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user[0]._id;
    const response = await axios.get(`/api/profissional/atuacao?_id=${userId}`, headers);
    props.form.area = response.data.Data;
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await axios.get('/api/atuacao', headers);
    areas.value = response.data.Data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(getAreas);

const addArea = async () => {
  if (newArea.value) {
    props.form.area.push(newArea.value);
    newArea.value = '';

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user[0];

    const headers = {
      headers: { 'token': localStorage.getItem('token') }
    };

    try {
      const response = await axios.put(`/api/profissional?_id=${userId._id}`, { atuacao: props.form.area }, headers);
    } catch (error) {
      console.error(error);
    }
  }
};

const removeArea = async (area) => {
  const dt = props.form.area.filter((v, idx) => { if (v._id != area) return v })

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user[0];

  const headers = {
    headers: { 'token': localStorage.getItem('token') }
  };

  console.log(area)
  console.log(dt)

  try {
    const response = await axios.put(`/api/profissional?_id=${userId._id}`, { atuacao: dt }, headers);
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
.inputs-gridA {
  display: grid;
  grid-template-columns: 1fr 1fr 200px;
  gap: 8px;
}
</style>

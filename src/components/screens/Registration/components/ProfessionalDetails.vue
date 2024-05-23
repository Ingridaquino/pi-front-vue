<template>
    <v-autocomplete
        v-model="newArea"
        :items="areas"
        label="Área de atuação"
        item-text="area"
        item-value="_id"
        @change="addArea"
        variant="outlined"
    ></v-autocomplete>

    <v-btn @click="addArea" color="primary">Adicionar</v-btn>

    <v-row>
        <v-col cols="12" class="mt-5">
            <v-chip v-for="(area, index) in form.area" :key="index" closable >
                {{ area.area }}
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
        const response = await axios.get('http://localhost:5000/atuacao', headers);
        areas.value = response.data;
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
      const response = await axios.post(`http://localhost:5000/atuacao?_id=${userId._id}`, { area: props.form.area }, headers);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
  
  <style scoped>
  .inputs-gridA {
    display: grid;
    grid-template-columns: 1fr 1fr 200px;
    gap: 8px;
  }
  </style>
  



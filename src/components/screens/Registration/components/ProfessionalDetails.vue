<template>
    <v-text-field v-model="newArea" label="Área de atuação" variant="outlined"  @keyup.enter="addArea"></v-text-field>
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
import { defineProps, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
    form: {
      default: () => ({
        area: []
      })
    }
});

const newArea = ref('');

const addArea = async () => {
  if (newArea.value.trim().length > 0) {
    const codigo = Math.floor(Math.random() * 1000000);

    props.form.area.push({_id: codigo, area: newArea.value});
    newArea.value = '';

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user[0]; 

    const headers = {
        headers: { 'token': token }
    };

    const data = {
      area: props.form.area
    };

    try {
      const response = await axios.post(`http://localhost:5000/atuacao?_id${userId._id}`, data, headers);
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
  



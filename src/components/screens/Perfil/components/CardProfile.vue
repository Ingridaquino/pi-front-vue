<template>
    <div class="profile__container">
      <v-card>
        <div class="profile-bg"></div>
        <div class="profile__avatar">
          <v-avatar size="100px">
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-avatar>
        </div>
        <div class="profile__flexA">
            <v-list-item class="mt-4">
              <template v-slot:title class="mt-3">
                <strong class="text-h6 mb-2">John Doe</strong>
              </template>
              <template v-slot:subtitle> Software Developer </template>
            </v-list-item>
            <v-list-item>
              <div class="profile__flexB"  v-for="(item, i) in items"
              :key="i">
                  <v-icon>{{ item.icon }}</v-icon>
                  <p class="ml-2">{{ item.title }}</p>
              </div>
          </v-list-item>
                 
        </div>
      </v-card>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  
  const items = ref([
        { title: '@john', icon: 'mdi-instagram', to: '/' },
        { title: 'jhon@teste.com', icon: 'mdi-email'} 
  ])
  
  </script>
  
  <style scoped>
  .profile__container {
    width: 100%;
  }
  
  .profile-bg {
    background-color: var(--color-secondary);
    background-size: cover;
    background-position: center;
    height: 180px;
  }
  
  .profile__flexA{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 20px 0;
  }
  
  .profile__flexB {
      display: flex;
      flex-direction: row;
      align-items: center;    
  }
  
  
  .profile__avatar {
    position: absolute;
    top: 105px;
    left: 22px;
  }
  </style>
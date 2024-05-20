<template>
    <div class="profile__container">
      <v-card>
        <div class="profile-bg"></div>
        <div class="profile__avatar">
          <v-avatar size="100px">
            <v-img :src="avatar"></v-img>
          </v-avatar>
        </div>
        <div class="profile__flexA">
            <v-list-item class="mt-4">
              <template v-slot:title class="mt-3">
                <strong class="text-h6 mb-2">{{ nome }}</strong>
              </template>
              <template v-slot:subtitle> {{ profissao }} </template>
            </v-list-item>
            <v-list-item>
              <div class="profile__flexB"  v-for="(item, i) in items"
              :key="i">
                  <v-icon v-if="item.title">{{ item.icon }}</v-icon>
                  <p class="ml-2" v-if="item.title">{{ item.title }}</p>
              </div>
          </v-list-item>
                 
        </div>
      </v-card>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([
  { title: '', icon: 'mdi-instagram', to: '/' },
  { title: '', icon: 'mdi-email'},
  { title: '', icon: 'mdi-facebook'},
  { title: '', icon: 'mdi-twitter'},
  { title: '', icon: 'mdi-whatsapp'}
])

const avatar = ref('')
const nome = ref('')
const profissao = ref('')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    avatar.value = user.avatar;
    nome.value = user.nome;
    profissao.value = user.profissao;

    items.value = items.value.map(item => {
      if (item.icon === 'mdi-instagram' && user.instagram) {
        return { ...item, title: `@${user.instagram}` };
      } else if (item.icon === 'mdi-email' && user.email) {
        return { ...item, title: user.email };
      } else if (item.icon === 'mdi-facebook' && user.facebook) {
        return { ...item, title: user.facebook };
      } else if (item.icon === 'mdi-twitter' && user.twitter) {
        return { ...item, title: `@${user.twitter}` };
      } else if (item.icon === 'mdi-whatsapp' && user.whatsapp) {
        return { ...item, title: user.whatsapp };
      } else {
        return item;
      }
    });
  }
});
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
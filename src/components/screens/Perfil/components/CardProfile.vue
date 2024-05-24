<template>
  <div class="profile__container">
    <v-card>
      <div class="profile-bg"></div>
      <div class="profile__avatar">
        <v-avatar size="100px">
          <v-img :src="avatar" v-if="avatar"></v-img>
          <v-icon size="50"  color="#FB6F0B" v-else>mdi-account-circle</v-icon>
        </v-avatar>
      </div>
      <div class="profile__flexA">
        <div>
          <v-list-item class="mt-4">
            <template v-slot:title class="mt-3">
              <strong class="text-h6 mb-2">{{ nome }}</strong>
            </template>
            <template v-slot:subtitle> {{ profissao }} </template>
          </v-list-item>
        </div>

        <div>
          <v-list-item>
            <div class="contato">
              <ul>
                <li v-for="item in items" :key="item.title">
                  <v-icon>{{ item.icon }}</v-icon> {{ item.title }}
                </li>
              </ul>
            </div>
          </v-list-item>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const avatar = ref("");
const nome = ref("");
const profissao = ref("");

let items = ref([]);
let user = null;

const route = useRoute();

onMounted(async () => {
  const id = route.params.id;
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:5000/profissional?_id=${id}`,
    {
      headers: { token: token },
    }
  );
  user = response.data.Data[0];

  avatar.value = user.foto;
  nome.value = user.nome;

  atuacaoItems();
  addContactItems();
});

const atuacaoItems = () => {
  if(user.atuacao){
    const item_l = user.atuacao.map((a) => a.descricao)
    profissao.value = item_l.join(", ")
  }
}

function addContactItems() {
  const allowedKeys = ["email", "instagram", "whatsapp"];
  if (user && user.contato) {
    for (const [key, value] of Object.entries(user.contato)) {
      if (value && allowedKeys.includes(key)) {
        items.value.push({
          icon: `mdi-${key}`,
          title: value,
        });
      }
    }
  }
}
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

.profile__flexA {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
}

.profile__flexB {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.contato {
  width: 390px;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    gap: 10px;

    li {
      list-style: none;
    }
  }
}

.profile__avatar {
  position: absolute;
  top: 105px;
  left: 22px;
}
</style>

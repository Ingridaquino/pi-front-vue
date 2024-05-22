<template>
  <div class="registration__container">
    <CPBackground />
    <div class="registration__box">
      <CPStepper text="E-mail e Senha" />
      <form @submit.prevent="handleSubmit">
        <div class="inputs">
          <CPInput label="Digite seu usuário *" v-model="form.user"
            :error-messages="v$.user.$errors.map((e) => e.$message)" append-inner-icon="mdi-account" />
          <CPInput label="Digite seu e-mail *" v-model="form.email"
            :error-messages="v$.user.$errors.map((e) => e.$message)" append-inner-icon="mdi-email" />
          <div class="divider">
            <v-divider class="border-opacity-50"></v-divider>
          </div>
          <CPInput label="Digite a senha *" v-model="form.password" type="password"
            :error-messages="v$.password.$errors.map((e) => e.$message)" append-inner-icon="mdi-lock" />
          <div>
            <v-checkbox v-validate="'required'" label="Concorda com os Termos?" v-model="form.agreeToTerms"
              :rules="[v$.agreeToTerms.required]" />
          </div>
        </div>

        <div class="registration--button">
          <CPButton text="Salvar" type="submit" size="small" variant="default" />
        </div>
      </form>
    </div>
    <v-snackbar v-model="snackbar" :timeout="18000000" vertical color="snackbar" top right>
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn color="primary" text @click="snackbar = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import CPBackground from "@/components/Background/CPBackground.vue";
import CPStepper from "@/components/Stepper/CPStepper.vue";
import CPInput from "@/components/Input/CPInput.vue";
import CPButton from "@/components/Button/CPButton.vue";

import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import axios from "axios";

import {
  required,
  email,
  minLength,
  helpers,
} from "@vuelidate/validators";
import router from "@/router";

const requiredMessage = helpers.withMessage(
  "Este campo é obrigatório",
  required
);
const emailMessage = helpers.withMessage("E-mail inválido", email);
const minLengthMessage = helpers.withMessage(
  "A senha deve ter pelo menos 8 caracteres",
  minLength(8)
);


const form = ref({
  email: "",
  user: "",
  password: "",
});
const agreeToTerms = ref(false)

const snackbar = ref(false);
const snackbarMessage = ref("");

const rules = computed(() => ({
  email: { required: requiredMessage, email: emailMessage },
  user: { required: requiredMessage },
  password: { required: requiredMessage, minLength: minLengthMessage },

  agreeToTerms: { required: requiredMessage },
}));

const v$ = useVuelidate(rules, form);

async function handleSubmit() {
  const result = await v$.value.$validate();

  if (!result) {
    snackbarMessage.value = "Error!";
    snackbar.value = true;
    return;
  } else {
    createdProfile();
  }
}

async function createdProfile() {
  const formData = JSON.parse(localStorage.getItem("formData"));
  const profile = JSON.parse(localStorage.getItem("type"));
  const savedPhotoUrl = localStorage.getItem('photoUrl');

  if (!formData) {
    snackbarMessage.value = "No data found in localStorage";
    snackbar.value = true;
    return;
  }

  if (!profile) {
    snackbarMessage.value = "Profile type not found in localStorage";
    snackbar.value = true;
    return;
  }

  let data = {
    contato: {
      email: form.value.email,
      facebook: formData.facebook,
      instagram: formData.instagram,
      twitter: formData.twitter,
      whatsapp: formData.whatsapp,
      telefone: formData.phone,
    },
    endereco: {
      bairro: formData.neighborhood,
      cep: formData.cep,
      cidade: formData.city,
      estado: formData.state,
      rua: formData.complement,
      numero: formData.number,
    },
    foto: savedPhotoUrl,
    genero: formData.gender,
    nome: formData.name,
    nascimento: formData.date,
    senha: form.value.password,
    usuario: form.value.user,
  };

  if (profile === "profissional") {
    data = {
      ...data,
      atuacao: formData.area
    };
  }
  try {
    await axios.post(`http://localhost:5000/${profile}`, data);

    snackbarMessage.value = "Profile created successfully";
    snackbar.value = true;

    localStorage.clear();

    router.push("/login");
  } catch (error) {
    snackbarMessage.value = "Failed to send data";
    snackbar.value = true;
    console.error("Error sending data:", error);
  }
}

</script>

<style scoped>
.registration__container {
  display: grid;
  grid-template-columns: 330px 1fr;
  width: 100vw;
  height: 100vh;
}

.registration__box {
  margin: 20px 0;
}

.inputs {
  width: 400px;
  margin: 100px auto;
}

.divider {
  width: 200px;
  height: 40px;
  margin: 0 auto;
}

.registration--button {
  display: flex;
  justify-content: flex-end;
  margin: 40px 60px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>

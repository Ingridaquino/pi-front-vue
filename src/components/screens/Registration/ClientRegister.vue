<template>
    <div class="professional__container--inputs">
      <form>
        <CPStepper text="Dados Pessoais" />
        <div class="inputs">
          <PersonalData :form="form"  />
        </div>
  
        <CPStepper text="Endereço" />
        <div class="inputs">
          <Address :form="form"  />
        </div>

  
        <CPStepper text="Contatos" />
        <div class="inputs">
          <Contacts :form="form" />
        </div>
  
        <div class="footer-button">
          <CPButton text="Salvar" type="submit" size="small" variant="default" />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import CPStepper from "@/components/Stepper /CPStepper.vue";
  import CPButton from "@/components/Button/CPButton.vue";
  import PersonalData from "./components/PersonalData.vue";
  import Address from "./components/Address.vue";
  import Contacts from "./components/Contacts.vue";
  
  import { ref } from "vue";
  
  let form = ref({
    type: "Client",
    name: "",
    date: "",
    gender: "",
    text: "",
    number: "",
    complement: "",
    neighborhood: "",
    phone: "",
    network: "",
    rules: {
      required: (value) => !!value || "Campo obrigatório",
      email: (value) => {
        const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return pattern.test(value) || "E-mail inválido";
      },
      telefone: (value) => {
        const pattern = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/;
        return pattern.test(value) || "Telefone inválido.";
      },
      min: (value) => value.length >= 8 || "Valor inserido é muito curto.",
      max: (value) => value.length <= 60 || "Valor inserido é muito longo.",
    },
  });
  </script>
  
  <style scoped>
  
  .inputs {
    margin: 0 20px;
  }
  
  .v-field__input {
    display: inline !important;
  }
  
  .footer-button {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    margin: 220px 40px 0 0;
  }
  </style>
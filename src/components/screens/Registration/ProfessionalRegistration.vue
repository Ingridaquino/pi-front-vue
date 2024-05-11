<template>
  <div class="professional__container--inputs">
    <form>
      <CPStepper text="Dados Pessoais" />
      <div class="inputs">
        <PersonalData :form="form" />
      </div>

      <CPStepper text="Endereço" />
      <div class="inputs">
        <Address :form="form" />
      </div>

      <CPStepper text="Dados Profissionais" />
      <div class="inputs">
        <ProfessionalDetails :form="form" />
      </div>

      <CPStepper text="Contatos" />
      <div class="inputs">
        <Contacts :form="form" />
      </div>
    </form>
  </div>
</template>

<script setup>
import CPStepper from "@/components/Stepper/CPStepper.vue";
import PersonalData from "./components/PersonalData.vue";
import Address from "./components/Address.vue";
import ProfessionalDetails from "./components/ProfessionalDetails.vue";
import Contacts from "./components/Contacts.vue";

import { ref } from "vue";

let form = ref({
  type: "Profissional",
  name: "",
  date: "",
  gender: "",
  text: "",
  number: "",
  complement: "",
  neighborhood: "",
  area: "",
  specialty: "",
  phone: "",
  network: "",
  
});
</script>

<style scoped>

.inputs {
  margin: 0 20px;
}

.v-field__input {
  display: inline !important;
}



</style>

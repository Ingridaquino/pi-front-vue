<template>
  <div class="professional__container--inputs">
    <form >
      <CPStepper text="Dados Pessoais" />
      <div class="inputs">
        <PersonalData :form="form" />
      </div>

      <CPStepper text="Endereço" />
      <div class="inputs">
        <Address :form="form" />
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
import Contacts from "./components/Contacts.vue";

import { ref, computed } from "vue";

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
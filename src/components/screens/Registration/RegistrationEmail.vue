<template>
    <div class="registration__container">
        <CPBackground />
        <div class="registration__box">
            <CPStepper text="E-mail e Senha" />
            <form @submit.prevent="handleSubmit">
              
                <div class="inputs">
    
                    <CPInput label="Digite o e-mail *"  v-model="form.email"  :error-messages="v$.email.$error"/>
                    <CPInput label="Confirme o e-mail *" v-model="form.confirmEmail" :error-messages="v$.confirmEmail.$error"/>
                    <div class="divider">
                        <v-divider class="border-opacity-50"></v-divider>
                    </div>
    
                    <CPInput label="Digite a senha *" v-model="form.password"  type="password"/>
                    <CPInput label="Confirme a senha *"  v-model="form.confirmPassword" type="password"/>
    
                    <div>
                        <v-checkbox label="Concorda com os Termos?" ></v-checkbox>
                    </div>
                </div>
    
                <div class="registration--button">
                    <CPButton text="Salvar" type="submit" size="small" variant="default" />
                </div>
    
            </form>
        </div>
    </div>
</template>

<script setup>
import CPBackground from '@/components/Background/CPBackground.vue'
import CPStepper from '@/components/Stepper/CPStepper.vue'
import CPInput from '@/components/Input/CPInput.vue'
import CPButton from '@/components/Button/CPButton.vue'

import { ref, onMounted, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required, sameAs} from '@vuelidate/validators'

const form = ref({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
});

const rules = computed(() => {
    return {
        email: { required, email },
        confirmEmail: { required, sameAs: sameAs(form.email) },
        password: { required, minLength: minLength(8) },
        confirmPassword: { required, sameAs: sameAs(form.password)}
    }
})

const v$ = useVuelidate(rules, form);


async function handleSubmit() {
 
  const result = await v$.value.$validate()
  if (!result) {

    alert('The form has errors')
    return
  }

  alert('Form submitted successfully')
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
    margin: 100px auto
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
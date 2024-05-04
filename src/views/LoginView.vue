<template>
    <div class="login__container">
       <CPBackground />

        <div class="login__container__box">
            <div class="login__container--form">

                    <div class="inputs">
                        <CPInput type="email" label="E-mail" v-model="email" required/>
                        <CPInput typew="password" label="Senha" v-model="senha" required/>
                    </div>
                    <div  class="button">
                        <CPButton text="Entrar" type="button" @click="login"  variant="default" size="large"></CPButton>
                    </div>

                    <span>Não é cadastrado? <a href="#" target="_blank">Cadastre-se.</a></span>
            </div>
        </div>

    </div>
</template>
<script setup>
import CPInput from '../components/Input/CPInput.vue'
import CPButton from '../components/Button/CPButton.vue'
import CPBackground from '@/components/Background/CPBackground.vue';

import { ref } from 'vue'

const email = ref('')
const senha = ref('')

function login() {
    alert('aqui')
}


</script>
<style>
.login__container {
    display: grid;
    grid-template-columns: 330px 1fr;
    width: 100vw;
    height: 100vh;
}


.login__container__box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 20px;
}

.login__container--form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.inputs {
    width: 400px;
    margin-bottom: 60px;
}

.button {
    margin-bottom: 8px;
}

span {
    font-size: 12px;
    
    a {
        text-decoration: none;
        font-weight: 600;
        color: var(--color-primary);
    }
}
</style>
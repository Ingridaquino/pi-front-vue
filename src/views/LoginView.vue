<template>
    <div class="login__container">
        <div class="login__container--capa"></div>

        <div class="login__container__box">
            <div class="login__container--form">

                    <div class="inputs">
                        <CPInput type="email" placeholder="Email" label="E-mail"/>
                        <CPInput typew="password" placeholder="Senha" />

                    </div>
                    <div>

                        <CPButton text="Entrar" type="button" @click="login"  variant="default" size="large"></CPButton>
                    </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import CPInput from '../components/Input/CPInput.vue'
import CPButton from '../components/Button/CPButton.vue'

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

.login__container--capa {
    width: 100%;
    border-radius: 0 45px 45px 0;
    background-color: #698D6F;
    height: 100%;
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
    gap: 75px;

}

.inputs {
    width: 400px;

}
</style>
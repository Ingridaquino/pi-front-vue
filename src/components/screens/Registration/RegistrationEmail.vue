<template>
    <div class="registration__container">
        <CPBackground />
        <div class="registration__box">
            <CPStepper text="Email e Senha" />
            <form>
              
                <div class="inputs">
    
                    <CPInput label="Email" />
                    <CPInput label="Email" />
    
    
                    <div class="divider">
                        <v-divider class="border-opacity-50"></v-divider>
                    </div>
    
                    <CPInput label="Email" />
                    <CPInput label="Email" />
    
    
                    <div>
                        <CPButton  />
                    </div>
                </div>
            </form>

    

        </div>
    </div>
</template>

<script setup>
import CPBackground from '@/components/Background/CPBackground.vue';
import CPStepper from '@/components/Stepper/CPStepper.vue';
import CPInput from '@/components/Input/CPInput.vue';


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
</style>
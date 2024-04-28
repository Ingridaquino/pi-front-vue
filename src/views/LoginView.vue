<template>
   <div class="container">
    <div class="container__logo">logo</div>

    <div class="container__box">
        <form @submit.prevent="login">
            <input />
        </form>
    </div>

   </div>
</template>
<script setup>
function login(){
    
}
</script>
<style>
.container {
    display: grid;
    grid-template-columns: 1fr 400px;
    width: 100%;
    background-color: red;

}


</style>
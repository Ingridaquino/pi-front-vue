<template>
    <div class="CPBackground">
        <slot name="logo">     
            <div class="logo">
   
            </div>   
        </slot>
    </div>
</template>


<style scoped>
.CPBackground {
    width: 100%;
    border-radius: 0 45px 45px 0;
    background: var(--color-primary) ;
}



</style>
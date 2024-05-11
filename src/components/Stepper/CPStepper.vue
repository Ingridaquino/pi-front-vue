<template>
    <div class="stepper-box">
        <div class="stepper">
            <p>{{text}}</p>
        </div>
        <v-divider class="border-opacity-100" inset></v-divider>
    </div>
</template>
<script setup>
const props = defineProps({
    text: String
})
</script>

<style>
.stepper-box {
    display: grid;
    grid-template-columns: 200px 1fr;
    justify-content: center;
    align-items: center;
}

.stepper {
    width: 230px;
    height: 60px;
    background-color: var(--color-secondary);
    border-radius: 0 24px 24px 0;
    margin: 20px 10px 20px 0; 
    padding: 20px 25px;
}

p {
    color: var(--text-default);
}

</style>
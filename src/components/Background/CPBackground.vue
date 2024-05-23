<template>
    <div class="CPBackground">
        <span class="flexwork">
            FlexW<v-icon color="#ccc" size="66">mdi-radar</v-icon>rk
        </span>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap');

.CPBackground {
    width: 90%;
    border-radius: 0 45px 45px 0;
    background: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;
}

.flexwork {
    font-family: "Rowdies", sans-serif;
    font-size: 55px;
    color: rgba(251, 111, 11, 0.926);
    transform: rotate(-90deg);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
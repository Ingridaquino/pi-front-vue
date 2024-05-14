<template>
    <div class="card" >
        <div class="header">
           
        </div>
        <slot name="content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, exercitationem nesciunt vitae error quae impedit cumque sapiente ab! Pariatur libero totam consequatur voluptatum iste quidem quas quae assumenda maiores enim?
        </slot>
    </div>

</template>


<style scoped>
.card {
    background-color: tomato;
    border: 1px solid var(--color-primary);
    padding: 10px;
    margin: 30px;
    border-radius: 4px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    font-size: 16px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: var(--color-primary);
    color: white;
    border-radius: 4px 4px 0 0;
}

</style>
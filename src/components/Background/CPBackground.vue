<template>
    <div class="CPBackground">

        <slot name="logo">

        </slot>
    </div>
</template>
<style>

.CPBackground {
    width: 100%;
    border-radius: 0 45px 45px 0;
    background-color: var(--color-primary);
    height: 100%;
}
</style>
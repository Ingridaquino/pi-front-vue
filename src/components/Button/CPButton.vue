<template>
    <v-btn
      :type="type"
      :disabled="disabled"
      :value="modelValue"
      class="v-btn"
      :class="[
        variant === 'default' ? 'btn-default' : 'btn-outlined',
        size === 'large' ? 'btn-large' : size === 'medium' ? 'btn-medium' : 'btn-small'
      ]"
      density="default"
    >
      {{ text }}
    </v-btn>
  </template>
  
<script setup>
const props = defineProps({
    text: String,
    type: String,
    disabled: String,
    modelValue: String,
    size: String,
    variant: String
})

</script>

<style>

.btn-default {
    background: var(--color-primary) !important;
    color: white !important;
}


.btn-outlined {
    background: transparent !important;
    border: 1px solid var(--color-primary) !important;
    color: var(--color-primary) !important;
}


.btn-large {
    width: 300px;
}

.btn-medium {
    width: 200px;
}

.btn-small {
    width: 150px;
    height: 27px !important;
}
</style>
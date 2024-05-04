<template>
    <v-text-field
        :type="type"
        :placeholder="placeholder"
        :label="label"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
  ></v-text-field>
</template>

<script setup>
import { defineProps } from 'vue'


const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    type: String,
    placeholder: String,
    label: String,
    disabled: String,
    modelValue: String,
})
</script>
<style>
.CPInput {
    border: red;
}
</style>
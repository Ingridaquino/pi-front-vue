<template>
  <v-text-field variant="outlined" 
    :type="type" :placeholder="placeholder" 
    :label="label" :model-value="modelValue"
    @update:modelValue="updateValue"
    :size="size"></v-text-field>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  type: String,
  placeholder: String,
  label: String,
  disabled: String,
  modelValue: String,
  size: String,
})

const updateValue = (value) => {
  emit('update:modelValue', value)
}
</script>
<style scoped>
.custom-input .v-input__control .v-input__slot::before {
  border-bottom: 2px solid var(--color-primary) !important;
}
</style>
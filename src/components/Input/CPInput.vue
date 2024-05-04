<template>
  <v-text-field :type="type" :placeholder="placeholder" :label="label" :value="value" @input="onInput"></v-text-field>
</template>

<script setup>
import { defineProps } from 'vue'


const emit = defineEmits(['input'])
const props = defineProps({
  type: String,
  placeholder: String,
  label: String,
  disabled: String,
  value: String,
})

function onInput(newValue) {
  emit('input', newValue);
}
</script>
<style>
</style>
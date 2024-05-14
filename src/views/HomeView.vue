<script setup>
import { RouterView } from 'vue-router'

import CPHeader from '@/components/Header/CPHeader.vue'

</script>

<template>
  <main>
    <CPHeader>
      <template #content>
        <RouterView />
      </template>
    </CPHeader>
  </main>
</template>

<

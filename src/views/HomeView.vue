<script setup>
import { RouterView } from 'vue-router'

import CPHeader from '@/components/Header/CPHeader.vue'

</script>

<template>
  <v-app>
    <main>
      <CPHeader>
        <template #content>
          <RouterView />
        </template>
      </CPHeader>
    </main>
  </v-app>
</template>


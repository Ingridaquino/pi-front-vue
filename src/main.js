import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMask from '@devindex/vue-mask';

import './assets/global.css'



// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
})

const app = createApp(App)

app.use(VueMask);
app.use(vuetify).use(router).mount('#app')

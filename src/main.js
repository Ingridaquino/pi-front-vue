import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMask from '@devindex/vue-mask';
import Vuelidate from '@vuelidate/core'

import './assets/global.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
            primary: '#11212D',
            secondary: '#253745',
            snackbar: '#4A5C6A',

        }
      }
    }
  }
})


const app = createApp(App)

app.use(VueMask);
app.use(vuetify).use(router).use(Vuelidate).mount('#app')

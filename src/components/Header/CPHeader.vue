<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-col cols="4" md="1" sm="2">
          <v-avatar size="46px">
            <v-img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
          </v-avatar>
        </v-col>

        <v-toolbar-title>{{ Nome }}</v-toolbar-title>

        <v-spacer></v-spacer>

  
      </v-app-bar>

      <v-navigation-drawer class="bg-primary " permanent>
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main style="height: 100vh;">
        <slot name="content"></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Foo',
        value: 'foo',
      },
      {
        title: 'Bar',
        value: 'bar',
      },
      {
        title: 'Fizz',
        value: 'fizz',
      },
      {
        title: 'Buzz',
        value: 'buzz',
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
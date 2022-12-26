<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <h1 class="text-h4 font-weight-bold mx-auto">TO DO app</h1>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

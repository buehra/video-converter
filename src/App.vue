<template>
  <v-app>
    <Navigation />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Navigation,
    Footer,
  },

  data: () => ({
    //
  }),
});
</script>

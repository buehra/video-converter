<template>
<v-app-bar
      app
      flat
    >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Video-Converter</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-switch
        v-model="$vuetify.theme.dark"
        inset
      ></v-switch>
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class Navigation extends Vue {
}
</script>
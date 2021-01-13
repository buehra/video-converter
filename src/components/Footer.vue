<template>
    <v-footer padless>
    <v-col
      class="text-center"
      cols="12">
      {{ currentYear }} — <strong>Buehra</strong>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class Footer extends Vue {
    private get currentYear(): string {
        return new Date().getFullYear().toString();
    }
}
</script>
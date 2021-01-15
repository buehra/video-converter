<template>
<v-container m-2>
  <v-card
  class="mx-auto"
  color="secondary"
  elevation="24"
  shaped
  >
  <v-container m-2>
    <v-row>
      <v-col class="d-flex"
        cols="12"
        sm="10">
    <v-file-input
      v-on:change="onChange"
      accept="video/mp4,video/x-m4v,video/*"
      chips
      show-size
      truncate-length="20"
    ></v-file-input>
      </v-col>
      <v-col class="d-flex"
        cols="12"
        sm="2">
    <v-select 
    :items="supportetFormats"
    label="Convert to"
    outlined
    v-model="selectedFormat"
    ></v-select>
      </v-col>
    </v-row>
    </v-container>
    <v-container m-2>
      <v-btn block :loading="!ffmpeqIsLoaded" v-on:click="convertToGif">Convert</v-btn>
    </v-container>
    <v-container m-2>
      <v-row align="center">
        <v-col>
          <a v-if="gifUrl != ''" v-bind:href="gifUrl" download="Test.gif">
            <img v-bind:src="gifUrl" width="250"/>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ConvertService from './../services/ConverterService';

@Component
export default class VideoConverter extends Vue {
  @Prop() private msg!: string;
  private converterService: ConvertService = new ConvertService();
  private uploadedVideo?: File;
  private gifUrl: string = '';
  private ffmpeqIsLoaded: boolean = false;
  private selectedFormat: string = '';

  private onChange(file: File): void {
    this.uploadedVideo = file;
    // tslint:disable: no-console
  }

  private async convertToGif(): Promise<void> {
    this.ffmpeqIsLoaded = false;
    const outputBlob = await this.converterService.convert(this.uploadedVideo!, this.selectedFormat);
    this.gifUrl = URL.createObjectURL(outputBlob);
    this.ffmpeqIsLoaded = true;
  }

  private get supportetFormats(): string[] {
    return this.converterService.getSupportetFormats();
  }

  private async created() {
    await this.converterService.load();
    this.ffmpeqIsLoaded = true;
  }
}
</script>
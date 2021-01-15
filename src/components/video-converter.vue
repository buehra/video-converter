<template>

  <div>
    <v-file-input
      v-on:change="onChange"
      accept="video/mp4,video/x-m4v,video/*"
      chips
      show-size
      truncate-length="20"
    ></v-file-input>
    <br />
    <video controls width="250" v-if="uploadedVideoUrl != ''" v-bind:src="uploadedVideoUrl" />
    <br />
    <v-btn elevation="2" v-if="ffmpeqIsLoaded" v-on:click="convertToGif">Convert</v-btn>
    <br />
    <img v-if="gifUrl != ''" v-bind:src="gifUrl" width="250"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ConvertService from './../services/ConverterService';

@Component
export default class VideoConverter extends Vue {
  @Prop() private msg!: string;
  private converterService: ConvertService = new ConvertService();
  private uploadedVideo?: File;
  private uploadedVideoUrl: string = '';
  private gifUrl: string = '';
  private ffmpeqIsLoaded: boolean = false;

  private onChange(file: File): void {
    this.uploadedVideo = file;
    this.uploadedVideoUrl = this.videoUrl;
    // tslint:disable: no-console
  }

  private async convertToGif(): Promise<void> {
    const outputBlob = await this.converterService.convertToGif(this.uploadedVideo!);
    this.gifUrl = URL.createObjectURL(outputBlob);
  }

  private get videoUrl(): string {
    if (this.uploadedVideo != null) {
      return URL.createObjectURL(this.uploadedVideo as Blob);
    }
    return '';
  }

  private async created() {
    await this.converterService.load();
    this.ffmpeqIsLoaded = true;
  }
}
</script>

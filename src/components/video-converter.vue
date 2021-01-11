<template>
  <div>
    <input
      type="file"
      v-on:change="onUploadFile"
      ref="upload"
      accept="video/mp4,video/x-m4v,video/*"
    />
    <br />
    <video controls width="250" v-if="uploadedVideoUrl != ''" v-bind:src="uploadedVideoUrl" />
    <br />
    <button v-if="ffmpeqIsLoaded" v-on:click="convertToGif">Convert</button>
    <br />
    <img v-if="gifUrl != ''" v-bind:src="gifUrl" width="250"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });
@Component
export default class VideoConverter extends Vue {
  @Prop() private msg!: string;
  private uploadedVideo?: File;
  private uploadedVideoUrl: string = '';
  private gifUrl: string = '';
  private ffmpeqIsLoaded: boolean = false;

  private onUploadFile(event: InputEvent): void {
    const files: ReadonlyArray<File> = [
      ...(this.upload.files ? this.upload.files : []),
    ];
    // tslint:disable: no-console
    this.uploadedVideo = files[0];
    this.uploadedVideoUrl = this.videoUrl;
  }

  private async convertToGif(): Promise<void> {
    ffmpeg.FS('writeFile', 'test.MOV', await fetchFile(this.uploadedVideo));
    await ffmpeg.run('-i', 'test.MOV', '-t', '3', '-f', 'gif', 'out.gif');
    const data = ffmpeg.FS('readFile', 'out.gif');
    this.gifUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
  }

  private get videoUrl(): string {
    if (this.uploadedVideo != null) {
      return URL.createObjectURL(this.uploadedVideo as Blob);
    }
    return '';
  }

  private get upload(): HTMLInputElement {
    return this.$refs.upload as HTMLInputElement;
  }

  private async created() {
    await ffmpeg.load();
    this.ffmpeqIsLoaded = true;
  }
}
</script>

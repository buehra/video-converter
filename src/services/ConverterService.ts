import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

class ConverterSrvice {
    private ffmpeg: FFmpeg;

    constructor() {
        this.ffmpeg = createFFmpeg({ log: true });
    }

    public async load() {
        await this.ffmpeg.load();
    }

    public async convertToGif(file: File): Promise<Blob> {
        this.ffmpeg.FS('writeFile', 'test.MOV', await fetchFile(file));
        await this.ffmpeg.run('-i', 'test.MOV', '-t', '3', '-f', 'gif', 'out.gif');
        const data = this.ffmpeg.FS('readFile', 'out.gif');
        return new Blob([data.buffer], { type: 'image/gif' });
    }
}

export { ConverterSrvice as default };

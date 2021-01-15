import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';

class ConverterSrvice {
    private ffmpeg: FFmpeg;

    constructor() {
        this.ffmpeg = createFFmpeg({ log: true });
    }

    public async load() {
        await this.ffmpeg.load();
    }

    public async convert(file: File, format: string): Promise<Blob> {
        switch (format) {
            default: // default is gif
                return await this.convertToGif(file);
        }

    }

    public getSupportetFormats(): string[] {
        const list: string[] = ['gif'];
        return list;
    }

    private async convertToGif(file: File): Promise<Blob> {
        this.ffmpeg.FS('writeFile', file.name, await fetchFile(file));
        await this.ffmpeg.run('-i', file.name, 'out.gif');
        const data = this.ffmpeg.FS('readFile', 'out.gif');
        return new Blob([data.buffer], { type: 'image/gif' });
    }
}

export { ConverterSrvice as default };

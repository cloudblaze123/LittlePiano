export class Note {
    constructor(pitch, start, duration) {
        this.pitch = pitch;
        this.start = start;
        this.duration = duration;
    }
    toString() {
        return `Note(pitch=${this.pitch}, start=${this.start}, duration=${this.duration})`;
    }
}
// // Note 类，表示单个音符
// class Note {
//     constructor(pitch, duration, intensity = 'mf') {
//         this.pitch = pitch;        // 音高
//         this.duration = duration;  // 音符持续时间
//         this.intensity = intensity; // 强度（如音符的音量，用音乐术语表示，例如 p, mf, f 等）
//     }
// }

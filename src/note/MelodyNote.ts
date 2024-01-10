// // 定义旋律音符类型
// type MelodyNote = {
//     time: number;      // 音符开始的时间，可以是实际的秒数或者使用Tone.js的时间记法
//     note: string;      // 音高，例如"C4"是中央C
//     duration: string;  // 时值，例如"4n"是四分音符
// };


// 用例
// // 定义旋律数组
// const melody: MelodyNote[] = [
//     { time: 0, note: 'C4', duration: '4n' },
//     { time: '1n', note: 'E4', duration: '8n' },
//     { time: '2n', note: 'G4', duration: '16n' },
//     { time: '2:0', note: 'A4', duration: '4n' },
//     { time: '2:2', note: 'F4', duration: '2n' },
// ];







export class MelodyNote{
    pitch:string
    start:string
    duration:string

    constructor(pitch:string, start:string, duration:string){
        this.pitch=pitch;
        this.start=start;
        this.duration=duration;
    }

    toString(){
        return `Note(pitch=${this.pitch}, start=${this.start}, duration=${this.duration})`;
    }
}
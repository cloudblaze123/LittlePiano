
import { Note } from '../note/Note';



// // Melody 类，表示一系列的音符
// class Melody {
//     constructor(instrument) {
//         this.instrument = instrument; // 分配给旋律的乐器
//         this.notes = []; // 存储音符的数组
//     }

//     addNote(note) {
//         this.notes.push(note);
//     }

//     // 演奏整个旋律
//     play() {
//         console.log(`Playing melody on: ${this.instrument.name}`);
//         this.notes.forEach(note => {
//             this.instrument.play(note.pitch);
//         });
//     }
// }


// // Melody 类
// class Melody {
//     constructor() {
//         this.notes = []; // 存储音符的数组
//     }

//     addNote(note) {
//         this.notes.push(note);
//     }

//     // 仅管理音符，不涉及播放
//     getNotes() {
//         return this.notes;
//     }
// }







export class Melody {
    private notes:Note[];

    constructor() {
        this.notes = []; // 存储音符的数组
    }

    // 添加一个音符到旋律中
    addNote(note:Note) {
        this.notes.push(note);
    }

    // 移除旋律中的一个音符
    removeNoteAt(index:number) {
        if (index >= 0 && index < this.notes.length) {
            this.notes.splice(index, 1);
        } else {
            throw new Error("Invalid note index to remove.");
        }
    }

    // 获取旋律中的所有音符
    getNotes() {
        return this.notes;
    }

    // 通过传入的时间，获取该时间应该播放的音符
    getNoteAt(time:number) {
        // 这里的实现将依赖于音符的时长和起始时间，
        // 你需要一个额外的数据结构或信息来存储每个音符的播放时机（时间戳或节拍位置）
        return this.notes.find(note => note.start <= time && note.start + note.duration >= time);
    }

    // 获取旋律的总时长
    getDuration() {
        // 实现依赖于你音符对象有关音符时长(duration)的信息
        // 如果你按照乐谱的方式存储音符（每个音符对应一个小节或者节拍），你可能需要转换这些时间点
        return this.notes.reduce((totalDuration, note) => totalDuration + note.duration, 0);
    }

    // 可能的其他函数比如转换旋律的键，调整节奏，音量，重复旋律等。
}











// 使用示例
const piano = new Instrument(1, 'Piano', 'Keyboard');
const melody = new Melody(piano);
melody.addNote(new Note('C4', 1));
melody.addNote(new Note('E4', 1));
melody.addNote(new Note('G4', 1));

const recording = new Recording(melody);
recording.startRecording();
melody.play(); // 假定每个音都会立刻记录到录音中
recording.stopRecording();

recording.playback();
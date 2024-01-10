
// Instrument.ts
import { Note } from '../note/Note';

export interface Instrument {
    play(note: Note): void;
}


// // Instrument 类
// class Instrument {
//     constructor(id, name, type) {
//         this.id = id;
//         this.name = name;
//         this.type = type; // 表明乐器类型，例如：钢琴、吉他、鼓等
//     }

//     // 可以添加更多方法来操作乐器对象，例如发出声音等
//     play(note) {
//         console.log(`${this.name} is playing the note ${note}`);
//     }
// }
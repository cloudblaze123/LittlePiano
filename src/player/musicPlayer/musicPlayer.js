"use strict";
// MusicPlayer 类
class MusicPlayer {
    constructor(instrument) {
        this.instrument = instrument; // 分配给播放器的乐器
    }
    // 直接播放一个音符
    play(note) {
        console.log(`${this.instrument.name} is playing the note ${note.pitch}`);
    }
    // 播放一个旋律
    playMelody(melody) {
        console.log(`Playing melody on: ${this.instrument.name}`);
        melody.getNotes().forEach(note => {
            this.play(note);
        });
    }
}
// 使用示例
const piano = new Instrument(1, 'Piano', 'Keyboard');
const melody = new Melody();
melody.addNote(new Note('C4', 1));
melody.addNote(new Note('E4', 1));
melody.addNote(new Note('G4', 1));
const musicPlayer = new MusicPlayer(piano);
musicPlayer.playMelody(melody);

// Recording 类，表示音乐的录音
class Recording {
    constructor(melody, recordedAt = new Date()) {
        this.melody = melody;        // 关联的旋律
        this.recordedAt = recordedAt; // 录音日期
        this.duration = 0;           // 录音的持续时间
        this.notesRecorded = [];     // 存储录音过程中的音符信息数组
    }

    startRecording() {
        console.log(`Recording started for melody on: ${this.melody.instrument.name}`);
    }

    stopRecording() {
        console.log(`Recording stopped. Total duration: ${this.duration} seconds.`);
    }

    addNoteToRecording(note) {
        // 假设记录音符的当前时间戳和信息
        const noteWithTimestamp = { ...note, timestamp: new Date() };
        this.notesRecorded.push(noteWithTimestamp);
        this.duration += note.duration; // 累积录音时间
    }

    // 用于回放录音
    playback() {
        console.log(`Playing back recording of melody on: ${this.melody.instrument.name}`);
        // 实际实现可能包括使用音频API根据notesRecorded回放音符
        // 这里只是将其打印出来以示意
        this.notesRecorded.forEach(noteRecord => {
            console.log(`At ${noteRecord.timestamp.toISOString()}: Played ${noteRecord.pitch}`);
        });
    }
}
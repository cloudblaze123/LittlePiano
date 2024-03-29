// MusicService.ts
import { Melody } from '../melody/melody';
import { Note } from '../note/Note';
import { Instrument } from '../instrument/Instrument';

export class MusicService {
    private currentMelody: Melody;
    private currentInstrument: Instrument;

    constructor(instrument: Instrument) {
        this.currentMelody = new Melody();
        this.currentInstrument = instrument;
    }

    addNoteToMelody(note: Note) {
        this.currentMelody.addNote(note);
    }

    playMelody() {
        const notes = this.currentMelody.getNotes();
        notes.forEach((note) => {
            this.currentInstrument.play(note);
        });
    }

    changeInstrument(newInstrument: Instrument) {
        this.currentInstrument = newInstrument;
    }
}






// useCase

// // clientCode.ts
// import { MusicService } from './MusicService';
// import { Piano } from './Piano';
// import { Note } from './Note';

// const piano = new Piano();
// const musicService = new MusicService(piano);

// musicService.addNoteToMelody(new Note('C4', 1));
// musicService.addNoteToMelody(new Note('E4', 1));
// musicService.addNoteToMelody(new Note('G4', 1));

// musicService.playMelody(); // This will "play" the melody through the console logs.
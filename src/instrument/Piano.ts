

// Piano.ts
import { Note } from '../note/Note';
import { Instrument } from './Instrument';


export class Piano implements Instrument {
    play(note: Note) {
        console.log(`Piano playing: ${note.pitch} for duration: ${note.duration}`);
        // Here you would have actual audio implementation
    }
}
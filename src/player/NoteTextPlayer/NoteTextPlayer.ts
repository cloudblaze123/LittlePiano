import { Note } from "../../note/Note";





export class NoteTextPlayer{

    play(notes:Iterable<Note>){
        for(const note of notes){
            console.log(note);
        }
    }
    
}
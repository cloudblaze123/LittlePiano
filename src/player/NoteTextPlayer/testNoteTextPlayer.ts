import { Note } from "../../note/Note.js";
import { NoteTextPlayer } from "./NoteTextPlayer.js";




const notes:Note[]=[
    new Note("C5", 0, 100),
    new Note("D5", 0, 100),
    new Note("E5", 0, 100),
];

const player=new NoteTextPlayer();

player.play(notes);





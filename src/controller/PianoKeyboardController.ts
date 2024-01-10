

import { PianoKeyboard } from "../component/piano-keyboard/web_component/piano_keyboard.js"
import { MusicService } from "../server/MusicService.js";




export class PianoKeyboardController {
    _piano_keyboard:PianoKeyboard;
    _musicService: MusicService;


    constructor(piano_keyboard:PianoKeyboard, musicService: MusicService) {

        this._piano_keyboard = piano_keyboard;
        this._musicService = musicService;


        this._piano_keyboard.onTriggerAttacked = (function (this: PianoKeyboardController, pitch) {
            this._musicService.attackTrigger(pitch);
            console.log(this._piano_keyboard);
        }.bind(this));
        this._piano_keyboard.onTriggerReleased = (function (this: PianoKeyboardController, pitch) {
            this._musicService.releaseTrigger(pitch);
        }.bind(this));


    }
}

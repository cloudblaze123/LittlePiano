export class PianoKeyboardController {
    constructor(piano_keyboard, musicService) {
        this._piano_keyboard = piano_keyboard;
        this._musicService = musicService;
        this._piano_keyboard.onTriggerAttacked = (function (pitch) {
            this._musicService.attackTrigger(pitch);
            // console.log(this._piano_keyboard);
        }.bind(this));
        this._piano_keyboard.onTriggerReleased = (function (pitch) {
            this._musicService.releaseTrigger(pitch);
        }.bind(this));
    }
}

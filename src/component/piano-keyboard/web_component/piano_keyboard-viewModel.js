export class PianoKeyboardViewModel {
    constructor(pianoKeyboard, pianoKeyboardShadowRoot) {
        this._pianoKeyboard = pianoKeyboard;
        this._shadowRoot = pianoKeyboardShadowRoot;
        this._initAttribute();
    }
    _initAttribute() {
        this._keybuttons = {};
        const keybuttons = this._shadowRoot.querySelectorAll(".keybutton");
        for (const keybutton of keybuttons) {
            const pitch = keybutton.getAttribute("pitch");
            this._keybuttons[pitch] = keybutton;
        }
        this._lastPlayedKeybuttons = new Set();
    }
    getLastPlayedKeybuttons() {
        // console.log("getLastPlayedKeybuttons"+this._lastPlayedKeybuttons);
        // console.log(this._lastPlayedKeybuttons);
        return this._lastPlayedKeybuttons;
    }
    getKeybutton(pitch) {
        return this._keybuttons[pitch];
    }
    onKeybuttonDown(...keybuttons) {
        for (const keybutton of keybuttons) {
            this._onKeybuttonDown(keybutton);
        }
    }
    _onKeybuttonDown(keybutton) {
        this._lastPlayedKeybuttons.add(keybutton);
        keybutton.classList.add("active");
        const pitch = keybutton.getAttribute("pitch");
        this._pianoKeyboard._onTriggerAttacked(pitch);
    }
    onKeybuttonUp(...keybuttons) {
        // console.log("viewModel onKeybuttonUp");
        for (const keybutton of keybuttons) {
            this._onKeybuttonUp(keybutton);
        }
    }
    _onKeybuttonUp(keybutton) {
        this._lastPlayedKeybuttons.delete(keybutton);
        keybutton.classList.remove("active");
        const pitch = keybutton.getAttribute("pitch");
        // console.log(`viewModel._pianoKeyboard._onTriggerReleased(${pitch});`)
        this._pianoKeyboard._onTriggerReleased(pitch);
    }
    attackTrigger(pitch) {
        if (!(pitch in this._keybuttons)) {
            console.log(`${this}'s keybuttons don't support pitch:${pitch}`);
        }
        this._onKeybuttonDown(this._keybuttons[pitch]);
    }
    hidePitchTag() {
        const PianoKeyboardElement = this._shadowRoot.querySelector(".piano_keyboard");
        PianoKeyboardElement.setAttribute("hide_pitch_tag", "");
    }
    showPitchTag() {
        const PianoKeyboardElement = this._shadowRoot.querySelector(".piano_keyboard");
        PianoKeyboardElement.removeAttribute("hide_pitch_tag");
    }
}

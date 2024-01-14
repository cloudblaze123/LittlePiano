import { pianoKeyboardTemplate } from "./piano-keyboard-template.js";
import { pianoKeyboardStyle } from "./piano-keyboard-style.js";
import { PianoKeyboardViewModel } from "./piano_keyboard-viewModel.js";
import { PianoKeyboardMouseEventHandler } from "./piano_keyboard-mouseEventHandler.js";
import { PianoKeyboardTouchEventHandler } from "./piano_keyboard-touchEventHandler.js";
export class PianoKeyboard extends HTMLElement {
    constructor() {
        super(); // 调用父类的 constructor
        this._onTriggerAttacked = function (pitch) { console.log("attack trigger: " + pitch); };
        this._onTriggerReleased = function (pitch) { console.log("release trigger: " + pitch); };
        this._createDOM();
        this._viewModel = new PianoKeyboardViewModel(this, this.shadowRoot);
        this._mouseEventHandler = new PianoKeyboardMouseEventHandler(this._viewModel, this.shadowRoot);
        this._touchEventHandler = new PianoKeyboardTouchEventHandler(this._viewModel, this.shadowRoot);
    }
    _createDOM() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = pianoKeyboardStyle + pianoKeyboardTemplate;
    }
    static get observedAttributes() {
        return ['hide_pitch_tag', 'disabled'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        // console.log("attributeChangedCallback");
        if (attrName === 'hide_pitch_tag') {
            this._onAttributeHidePitchTagChanged(oldVal, newVal);
        }
        else if (attrName === 'disabled') {
            this._onAttributeDisabledChanged(oldVal, newVal);
        }
    }
    _isAttributeAdded(oldVal, newVal) {
        // console.log("_isAttributeAdded")
        if (oldVal === null) {
            return true;
        }
        else {
            return false;
        }
    }
    _isAttributeRemoved(oldVal, newVal) {
        // console.log("_isAttributeRemoved")
        if (newVal === null) {
            return true;
        }
        else {
            return false;
        }
    }
    _onAttributeDisabledChanged(oldVal, newVal) {
        /*目前暂时只关闭触控输入*/
        if (this._isAttributeAdded(oldVal, newVal)) {
            this._touchEventHandler.disableInput();
        }
        else if (this._isAttributeRemoved(oldVal, newVal)) {
            // console.log("enableInput")
            this._touchEventHandler.enableInput();
        }
    }
    _onAttributeHidePitchTagChanged(oldVal, newVal) {
        if (this._isAttributeAdded(oldVal, newVal)) {
            this._viewModel.hidePitchTag();
        }
        else if (this._isAttributeRemoved(oldVal, newVal)) {
            this._viewModel.showPitchTag();
        }
    }
    set onTriggerAttacked(callback) {
        this._onTriggerAttacked = callback;
    }
    get onTriggerAttacked() {
        return this._onTriggerAttacked;
    }
    set onTriggerReleased(callback) {
        this._onTriggerReleased = callback;
    }
    get onTriggerReleased() {
        return this._onTriggerReleased;
    }
    setInputContext(inputContext) {
        this._touchEventHandler.setInputContext(inputContext);
    }
    attackTrigger(pitch) {
        console.log(`PianoKeyboard attackTrigger(${pitch})`);
        this._viewModel.attackTrigger(pitch);
    }
}
customElements.define('piano-keyboard', PianoKeyboard);

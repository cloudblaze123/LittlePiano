


import { pianoKeyboardTemplate } from "./piano-keyboard-template.js";
import { pianoKeyboardStyle } from "./piano-keyboard-style.js";

import { PianoKeyboardViewModel } from "./piano_keyboard-viewModel.js";
import { PianoKeyboardMouseEventHandler } from "./piano_keyboard-mouseEventHandler.js";
import { PianoKeyboardTouchEventHandler } from "./piano_keyboard-touchEventHandler.js";


export class PianoKeyboard extends HTMLElement {
    _onTriggerAttacked:(pitch:string)=>void = function(pitch){console.log("attack trigger: "+pitch)};
    _onTriggerReleased:(pitch:string)=>void = function(pitch){console.log("release trigger: "+pitch)};
    // _onTriggerAttacked:(pitch:string)=>void = function(pitch){};
    // _onTriggerReleased:(pitch:string)=>void = function(pitch){};
    
    _viewModel:PianoKeyboardViewModel;
    _mouseEventHandler:PianoKeyboardMouseEventHandler;
    _touchEventHandler:PianoKeyboardTouchEventHandler;

    constructor() {
        super(); // 调用父类的 constructor
        
        this._createDOM();

        this._viewModel=new PianoKeyboardViewModel(this, this.shadowRoot as ShadowRoot);
        this._mouseEventHandler=new PianoKeyboardMouseEventHandler(this._viewModel, this.shadowRoot as ShadowRoot);
        this._touchEventHandler=new PianoKeyboardTouchEventHandler(this._viewModel, this.shadowRoot as ShadowRoot);
    }


    _createDOM(){
        const shadowRoot=this.attachShadow({mode:"open"});
        
        shadowRoot.innerHTML=pianoKeyboardStyle + pianoKeyboardTemplate;
    }


    set onTriggerAttacked(callback:(pitch:string)=>void){
        this._onTriggerAttacked=callback;
    }
    get onTriggerAttacked(){
        return this._onTriggerAttacked;
    }

    set onTriggerReleased(callback:(pitch:string)=>void){
        this._onTriggerReleased=callback;
    }
    get onTriggerReleased(){
        return this._onTriggerReleased;
    }


    attackTrigger(pitch:string){
        this._viewModel.attackTrigger(pitch);
    }
}




customElements.define('piano-keyboard', PianoKeyboard);
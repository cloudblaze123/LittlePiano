


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




    static get observedAttributes() {
        return ['hide_pitch_tag', 'disabled'];
    }


    attributeChangedCallback(attrName: string, oldVal: string | null, newVal: string | null){
        // console.log("attributeChangedCallback");
        if (attrName === 'hide_pitch_tag') {
            this._onAttributeHidePitchTagChanged(oldVal, newVal);
        }else if(attrName === 'disabled'){
            this._onAttributeDisabledChanged(oldVal, newVal);
        }
    }
    _isAttributeAdded(oldVal: string | null, newVal: string | null){
        // console.log("_isAttributeAdded")
        if(oldVal===null){
            return true;
        }else{
            return false;
        }
    }
    _isAttributeRemoved(oldVal: string | null, newVal: string | null){
        // console.log("_isAttributeRemoved")
        if(newVal===null){
            return true;
        }else{
            return false;
        }
    }

    _onAttributeDisabledChanged(oldVal: string | null, newVal: string | null){
        /*目前暂时只关闭触控输入*/
        if(this._isAttributeAdded(oldVal, newVal)){
            this._touchEventHandler.disableInput();
        }else if(this._isAttributeRemoved(oldVal, newVal)){
            // console.log("enableInput")
            this._touchEventHandler.enableInput();
        }
    }
    
    _onAttributeHidePitchTagChanged(oldVal: string | null, newVal: string | null){
        if(this._isAttributeAdded(oldVal, newVal)){
            this._viewModel.hidePitchTag();
        }else if(this._isAttributeRemoved(oldVal, newVal)){
            this._viewModel.showPitchTag();
        }
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


    setInputContext(this:PianoKeyboard, inputContext:HTMLElement){
        this._touchEventHandler.setInputContext(inputContext);
    }


    attackTrigger(pitch:string){
        console.log(`PianoKeyboard attackTrigger(${pitch})`);
        this._viewModel.attackTrigger(pitch);
    }
}




customElements.define('piano-keyboard', PianoKeyboard);
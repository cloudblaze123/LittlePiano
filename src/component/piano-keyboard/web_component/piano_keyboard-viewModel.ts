

import { PianoKeyboard } from "./piano_keyboard";


export class PianoKeyboardViewModel{
    _pianoKeyboard:PianoKeyboard;
    _shadowRoot:ShadowRoot;

    _keybuttons!:{[pitch:string]:HTMLButtonElement};
    _lastPlayedKeybuttons!:Set<HTMLButtonElement>;


    constructor(pianoKeyboard:PianoKeyboard, pianoKeyboardShadowRoot:ShadowRoot){
        this._pianoKeyboard=pianoKeyboard;
        this._shadowRoot=pianoKeyboardShadowRoot;

        this._initAttribute();
    }


    _initAttribute(){
        this._keybuttons={};
        const keybuttons:NodeListOf<HTMLButtonElement>=this._shadowRoot.querySelectorAll(".keybutton");
        for(const keybutton of keybuttons){
            const pitch=keybutton.getAttribute("pitch");
            this._keybuttons[pitch]=keybutton;
        }

        this._lastPlayedKeybuttons=new Set();
    }


    getLastPlayedKeybuttons(){
        // console.log("getLastPlayedKeybuttons"+this._lastPlayedKeybuttons);
        // console.log(this._lastPlayedKeybuttons);
        return this._lastPlayedKeybuttons;
    }


    getKeybutton(pitch:string){
        return this._keybuttons[pitch];
    }


    onKeybuttonDown(...keybuttons:HTMLButtonElement[]){
        for(const keybutton of keybuttons){
            this._onKeybuttonDown(keybutton);
        }
    }
    _onKeybuttonDown(keybutton:HTMLButtonElement){
        this._lastPlayedKeybuttons.add(keybutton);

        keybutton.classList.add("active");

        const pitch=keybutton.getAttribute("pitch") as string; 

        this._pianoKeyboard._onTriggerAttacked(pitch);
    }
    

    onKeybuttonUp(...keybuttons:HTMLButtonElement[]){
        // console.log("viewModel onKeybuttonUp");
        for(const keybutton of keybuttons){
            this._onKeybuttonUp(keybutton);
        }
    }
    _onKeybuttonUp(keybutton:HTMLButtonElement){
        this._lastPlayedKeybuttons.delete(keybutton);
        
        keybutton.classList.remove("active");

        const pitch=keybutton.getAttribute("pitch") as string; 

        // console.log(`viewModel._pianoKeyboard._onTriggerReleased(${pitch});`)
        this._pianoKeyboard._onTriggerReleased(pitch);
    }


    attackTrigger(pitch:string){
        if(!(pitch in this._keybuttons)){
            console.log(`${this}'s keybuttons don't support pitch:${pitch}`);
        }
        this._keybuttons[pitch].click();
    }
}
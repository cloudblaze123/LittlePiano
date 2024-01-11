

import { PianoKeyboardViewModel } from "./piano_keyboard-viewModel";



export class PianoKeyboardTouchEventHandler{
    _viewModel:PianoKeyboardViewModel;
    _shadowRoot:ShadowRoot;

    _inputContext!:HTMLElement;

    _isDisabled:boolean;

    /*绑定后的回调函数，以便之后解除事件监听*/
    _boundOnTouchStart!:(touchEvent:TouchEvent)=>void
    _boundOnTouchMove!:(touchEvent:TouchEvent)=>void
    _boundOnTouchEnd!:(touchEvent:TouchEvent)=>void
    
    
    constructor(pianoKeyboardViewModel:PianoKeyboardViewModel, pianoKeyboardShadowRoot:ShadowRoot){
        this._viewModel=pianoKeyboardViewModel;
        this._shadowRoot=pianoKeyboardShadowRoot;
        
        this._boundOnTouchStart=this._onTouchStart.bind(this);
        this._boundOnTouchMove=this._onTouchMove.bind(this);
        this._boundOnTouchEnd=this._onTouchEnd.bind(this);

        this._isDisabled=false;

        this._initHandler();
    }
    
    _initHandler(this:PianoKeyboardTouchEventHandler){
        // console.log("_initHandler");
        const keyboard=this._shadowRoot.querySelector(".piano_keyboard") as HTMLElement;
        this._setInputContext(keyboard);
    }




    _setInputContext(this:PianoKeyboardTouchEventHandler, inputContext:HTMLElement){
        this._inputContext=inputContext;
        /*绑定输入上下文的触控监听，当用户与输入上下文交互时执行*/
        inputContext.addEventListener("touchstart", this._boundOnTouchStart);
        inputContext.addEventListener("touchmove", this._boundOnTouchMove);
        inputContext.addEventListener("touchend", this._boundOnTouchEnd);

        // console.log("PianoKeyboardTouchEventHandler _setInputContext() this._boundOnTouchStart");
        // console.log(this._boundOnTouchStart);
    }

    _clearInputContext(this:PianoKeyboardTouchEventHandler){
        /*移除原有的输入上下文的触控监听*/
        this._inputContext.removeEventListener("touchstart", this._boundOnTouchStart);
        this._inputContext.removeEventListener("touchmove", this._boundOnTouchMove);
        this._inputContext.removeEventListener("touchend", this._boundOnTouchEnd);

        // console.log("PianoKeyboardTouchEventHandler _clearInputContext()");
        // console.log("PianoKeyboardTouchEventHandler _clearInputContext() this._boundOnTouchStart");
        // console.log(this._boundOnTouchStart);
    }
    
    _changeInputContext(this:PianoKeyboardTouchEventHandler, inputContext:HTMLElement){
        this._clearInputContext();
        this._setInputContext(inputContext);        
    }

    setInputContext(this:PianoKeyboardTouchEventHandler, inputContext:HTMLElement){
        this._changeInputContext(inputContext);
    }


    disableInput(){
        // console.log("PianoKeyboardTouchEventHandler disableInput()");
        this._isDisabled=true;
    }
    enableInput(){
        this._isDisabled=false;
    }



    _onTouchStart(this:PianoKeyboardTouchEventHandler, event:TouchEvent){
        if(this._isDisabled){
            return
        }
        event.preventDefault();//用来防止按键事件在mousedown再处理一次
        // console.log("touchstart");
        const keybuttons=this._getKeybuttonsFromTouch(event.touches);

        this._onKeybuttonsDown(...keybuttons);
    }


    _onTouchMove(this:PianoKeyboardTouchEventHandler, event:TouchEvent){
        if(this._isDisabled){
            return
        }
        event.preventDefault();//阻止默认的滚动行为
        // console.log("touchmove");
        const keybuttonsTouched=this._getKeybuttonsFromTouch(event.touches);
        const keybuttonsNewDown:HTMLButtonElement[]=[];
        const keybuttonsNewUp:HTMLButtonElement[]=[];

        // console.log("keybuttonsTouched "+keybuttonsTouched);
        for(const keybutton of keybuttonsTouched){
            // console.log("keybuttonsTouched "+keybutton);
            if(!this._isKeyButtonLastPlayed(keybutton)){
                keybuttonsNewDown.push(keybutton);
            }
        }
        for(const keybuttonLastPlayed of this._getKeyButtonsLastPlayed()){
            if(!(keybuttonsTouched.includes(keybuttonLastPlayed))){
                keybuttonsNewUp.push(keybuttonLastPlayed);
            }
        }
        // console.log("keybuttonsNewDown "+keybuttonsNewDown);
        // console.log("keybuttonsNewUp "+keybuttonsNewUp);
        this._onKeybuttonsDown(...keybuttonsNewDown);
        this._onKeybuttonsUp(...keybuttonsNewUp);
    }


    _onTouchEnd(this:PianoKeyboardTouchEventHandler, event:TouchEvent){
        if(this._isDisabled){
            return
        }
        // console.log("touchend");
        const keybuttonsTouchEnd=this._getKeybuttonsFromTouch(event.changedTouches);

        this._onKeybuttonsUp(...keybuttonsTouchEnd);
    }



    
    _getKeybuttonsFromTouch(touchs:TouchList) {
        const keybuttons:HTMLButtonElement[]=[];
        for(const touch of Array.from(touchs)){
            const keybutton:HTMLButtonElement|null=this._getKeybuttonFromTouch(touch);
            if(keybutton!==null){
                keybuttons.push(keybutton);
            }
        }
        return keybuttons;
    }
    _getKeybuttonFromTouch(touch:Touch):HTMLButtonElement|null {
        const x=touch.clientX;
        const y=touch.clientY;
        // console.log(`touch at (${x}, ${y})`);

        const targetElement = this._shadowRoot.elementFromPoint(x, y);

        // 检查是否为 key 类的元素，如果是，则返回该元素
        if (targetElement && targetElement.classList.contains('keybutton')) {
            // console.log(`get key ${targetElement}`);
            return targetElement as HTMLButtonElement;
        }else{
            // 如果不是钢琴键，则返回 null
            return null;
        }
    }
            

    _isKeyButtonLastPlayed(keybutton:HTMLButtonElement){
        // console.log("_isKeyButtonLastPlayed "+this._viewModel.getLastPlayedKeybuttons().has(keybutton));;
        return this._viewModel.getLastPlayedKeybuttons().has(keybutton);
    }
    _getKeyButtonsLastPlayed(){
        return this._viewModel.getLastPlayedKeybuttons()
    }


    _onKeybuttonsDown(...keybuttons:HTMLButtonElement[]){
        this._viewModel.onKeybuttonDown(...keybuttons);
    }

    _onKeybuttonsUp(...keybuttons:HTMLButtonElement[]){
        this._viewModel.onKeybuttonUp(...keybuttons);
    }
}
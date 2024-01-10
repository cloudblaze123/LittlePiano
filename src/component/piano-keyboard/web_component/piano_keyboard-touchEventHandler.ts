

import { PianoKeyboardViewModel } from "./piano_keyboard-viewModel";



export class PianoKeyboardTouchEventHandler{
    _viewModel:PianoKeyboardViewModel;
    _shadowRoot:ShadowRoot;

    _isMouseDown:boolean=false;


    constructor(pianoKeyboardViewModel:PianoKeyboardViewModel, pianoKeyboardShadowRoot:ShadowRoot){
        this._viewModel=pianoKeyboardViewModel;
        this._shadowRoot=pianoKeyboardShadowRoot;

        this._initHandler();
    }

    _initHandler(this:PianoKeyboardTouchEventHandler){
        /*初始化琴键事件，当用户与琴键交互时执行*/
        const keybuttons:NodeListOf<HTMLButtonElement>=this._shadowRoot.querySelectorAll(".keybutton");
        const keybuttonArea:HTMLElement=this._shadowRoot.querySelector(".piano_keyboard") as HTMLElement;


        keybuttonArea.addEventListener("touchstart", function(this:PianoKeyboardTouchEventHandler, event:TouchEvent){
            event.preventDefault();//用来防止按键事件在mousedown再处理一次
            // console.log("touchstart");
            const keybuttons=this._getKeybuttonsFromTouch(event.touches);

            this._onKeybuttonsDown(...keybuttons);
        }.bind(this));


        keybuttonArea.addEventListener("touchmove", function(this:PianoKeyboardTouchEventHandler, event:TouchEvent){
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
        }.bind(this));


        keybuttonArea.addEventListener("touchend", function(this:PianoKeyboardTouchEventHandler, event:TouchEvent){
            // console.log("touchend");
            const keybuttonsTouchEnd=this._getKeybuttonsFromTouch(event.changedTouches);

            this._onKeybuttonsUp(...keybuttonsTouchEnd);
        }.bind(this));

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
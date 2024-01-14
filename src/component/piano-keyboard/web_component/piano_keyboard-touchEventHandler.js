export class PianoKeyboardTouchEventHandler {
    constructor(pianoKeyboardViewModel, pianoKeyboardShadowRoot) {
        this._viewModel = pianoKeyboardViewModel;
        this._shadowRoot = pianoKeyboardShadowRoot;
        this._boundOnTouchStart = this._onTouchStart.bind(this);
        this._boundOnTouchMove = this._onTouchMove.bind(this);
        this._boundOnTouchEnd = this._onTouchEnd.bind(this);
        this._isDisabled = false;
        this._initHandler();
    }
    _initHandler() {
        // console.log("_initHandler");
        const keyboard = this._shadowRoot.querySelector(".piano_keyboard");
        this._setInputContext(keyboard);
    }
    _setInputContext(inputContext) {
        this._inputContext = inputContext;
        /*绑定输入上下文的触控监听，当用户与输入上下文交互时执行*/
        inputContext.addEventListener("touchstart", this._boundOnTouchStart);
        inputContext.addEventListener("touchmove", this._boundOnTouchMove);
        inputContext.addEventListener("touchend", this._boundOnTouchEnd);
        // console.log("PianoKeyboardTouchEventHandler _setInputContext() this._boundOnTouchStart");
        // console.log(this._boundOnTouchStart);
    }
    _clearInputContext() {
        /*移除原有的输入上下文的触控监听*/
        this._inputContext.removeEventListener("touchstart", this._boundOnTouchStart);
        this._inputContext.removeEventListener("touchmove", this._boundOnTouchMove);
        this._inputContext.removeEventListener("touchend", this._boundOnTouchEnd);
        // console.log("PianoKeyboardTouchEventHandler _clearInputContext()");
        // console.log("PianoKeyboardTouchEventHandler _clearInputContext() this._boundOnTouchStart");
        // console.log(this._boundOnTouchStart);
    }
    _changeInputContext(inputContext) {
        this._clearInputContext();
        this._setInputContext(inputContext);
    }
    setInputContext(inputContext) {
        this._changeInputContext(inputContext);
    }
    disableInput() {
        // console.log("PianoKeyboardTouchEventHandler disableInput()");
        this._isDisabled = true;
    }
    enableInput() {
        this._isDisabled = false;
    }
    _onTouchStart(event) {
        if (this._isDisabled) {
            return;
        }
        event.preventDefault(); //用来防止按键事件在mousedown再处理一次
        // console.log("touchstart");
        const keybuttons = this._getKeybuttonsFromTouch(event.touches);
        this._onKeybuttonsDown(...keybuttons);
    }
    _onTouchMove(event) {
        if (this._isDisabled) {
            return;
        }
        event.preventDefault(); //阻止默认的滚动行为
        // console.log("touchmove");
        const keybuttonsTouched = this._getKeybuttonsFromTouch(event.touches);
        const keybuttonsNewDown = [];
        const keybuttonsNewUp = [];
        // console.log("keybuttonsTouched "+keybuttonsTouched);
        for (const keybutton of keybuttonsTouched) {
            // console.log("keybuttonsTouched "+keybutton);
            if (!this._isKeyButtonLastPlayed(keybutton)) {
                keybuttonsNewDown.push(keybutton);
            }
        }
        for (const keybuttonLastPlayed of this._getKeyButtonsLastPlayed()) {
            if (!(keybuttonsTouched.includes(keybuttonLastPlayed))) {
                keybuttonsNewUp.push(keybuttonLastPlayed);
            }
        }
        // console.log("keybuttonsNewDown "+keybuttonsNewDown);
        // console.log("keybuttonsNewUp "+keybuttonsNewUp);
        this._onKeybuttonsDown(...keybuttonsNewDown);
        this._onKeybuttonsUp(...keybuttonsNewUp);
    }
    _onTouchEnd(event) {
        if (this._isDisabled) {
            return;
        }
        // console.log("touchend");
        const keybuttonsTouchEnd = this._getKeybuttonsFromTouch(event.changedTouches);
        this._onKeybuttonsUp(...keybuttonsTouchEnd);
    }
    _getKeybuttonsFromTouch(touchs) {
        const keybuttons = [];
        for (const touch of Array.from(touchs)) {
            const keybutton = this._getKeybuttonFromTouch(touch);
            if (keybutton !== null) {
                keybuttons.push(keybutton);
            }
        }
        return keybuttons;
    }
    _getKeybuttonFromTouch(touch) {
        const x = touch.clientX;
        const y = touch.clientY;
        // console.log(`touch at (${x}, ${y})`);
        const targetElement = this._shadowRoot.elementFromPoint(x, y);
        // 检查是否为 key 类的元素，如果是，则返回该元素
        if (targetElement && targetElement.classList.contains('keybutton')) {
            // console.log(`get key ${targetElement}`);
            return targetElement;
        }
        else {
            // 如果不是钢琴键，则返回 null
            return null;
        }
    }
    _isKeyButtonLastPlayed(keybutton) {
        // console.log("_isKeyButtonLastPlayed "+this._viewModel.getLastPlayedKeybuttons().has(keybutton));;
        return this._viewModel.getLastPlayedKeybuttons().has(keybutton);
    }
    _getKeyButtonsLastPlayed() {
        return this._viewModel.getLastPlayedKeybuttons();
    }
    _onKeybuttonsDown(...keybuttons) {
        this._viewModel.onKeybuttonDown(...keybuttons);
    }
    _onKeybuttonsUp(...keybuttons) {
        this._viewModel.onKeybuttonUp(...keybuttons);
    }
}

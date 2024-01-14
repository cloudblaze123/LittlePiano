export class PianoKeyboardMouseEventHandler {
    constructor(pianoKeyboardViewModel, pianoKeyboardShadowRoot) {
        this._isMouseDown = false;
        this._viewModel = pianoKeyboardViewModel;
        this._shadowRoot = pianoKeyboardShadowRoot;
        this._initHandler();
    }
    _initHandler() {
        /*初始化钢琴键盘事件*/
        this._shadowRoot.addEventListener("mousedown", function () {
            this._isMouseDown = true;
        }.bind(this));
        this._shadowRoot.addEventListener("mouseup", function () {
            this._isMouseDown = false;
        }.bind(this));
        this._shadowRoot.querySelector(".piano_keyboard").addEventListener("mouseleave", function () {
            //！！！hack！！！
            //此处(this._shadowRoot.querySelector(".piano_keyboard") as HTMLElement)是一个hack
            //原本的代码是this._shadowRoot.addEventListener("mouseleave", function(this:PianoKeyboardMouseEventHandler){
            //但使用"mouseleave"时，鼠标移出键盘外时不会触发mouseleave
            //以下是gpt的解释
            //因为"mouseleave" 事件并不会冒泡，也就是说它不会向父元素传递。而 Shadow DOM 是相对于主 DOM 视为封闭和独立的，主 DOM 中元素的事件无法传递给 Shadow DOM 中元素，除非该事件能够冒泡。
            //因此，如果您将 "mouseleave" 事件的监听添加到 shadow root，那么在 shadow root 内部的元素触发 "mouseleave" 事件时，监听函数并不会被调用，因为 "mouseleave" 事件不会冒泡到 shadow root。
            //你可以尝试使用 "mouseout" 事件替代 "mouseleave" 事件。 "mouseout" 事件也是在鼠标离开元素时触发，与 "mouseleave" 不同的是，"mouseout" 事件是可以冒泡的。
            //但请注意 "mouseout" 事件的行为与 "mouseleave" 并不完全相同，当鼠标指针移到元素的子元素上时也会触发 "mouseout" 事件。
            //如果你需要模拟 "mouseleave" 的行为，你可能需要在事件处理器里做一些额外的判断。
            //gpt的解释结束
            //对比使用mouseout的代码后
            //我决定暂时继续使用mouseleave（得益于模板中有一个<div class="piano_keyboard">根元素，所以可以暂时用它替代shadowRoot）
            this._isMouseDown = false;
        }.bind(this));
        /*初始化琴键事件，当用户与琴键交互时执行*/
        const keybuttons = this._shadowRoot.querySelectorAll(".keybutton");
        for (const keybutton of keybuttons) {
            /*初始化琴键鼠标事件，当用户使用鼠标与琴键交互时执行*/
            keybutton.addEventListener("mousedown", function (event) {
                // console.log("mousedown");
                const keybutton = event.target;
                this._onKeybuttonDown(keybutton);
            }.bind(this));
            keybutton.addEventListener("mouseenter", function (event) {
                // console.log("mouseenter");
                const keybutton = event.target;
                // console.log(this._isMouseDown);
                if (this._isMouseDown) {
                    this._onKeybuttonDown(keybutton);
                }
            }.bind(this));
            keybutton.addEventListener("mouseup", function (event) {
                // console.log("mouseup");
                const keybutton = event.target;
                if (this._isKeyButtonLastPlayed(keybutton)) {
                    this._onKeybuttonUp(keybutton);
                }
            }.bind(this));
            keybutton.addEventListener("mouseleave", function (event) {
                // console.log("mouseleave");
                const keybutton = event.target;
                if (this._isKeyButtonLastPlayed(keybutton)) {
                    this._onKeybuttonUp(keybutton);
                }
            }.bind(this));
        }
    }
    _isKeyButtonLastPlayed(keybutton) {
        return this._viewModel.getLastPlayedKeybuttons().has(keybutton);
    }
    _onKeybuttonDown(keybutton) {
        this._viewModel.onKeybuttonDown(keybutton);
    }
    _onKeybuttonUp(keybutton) {
        this._viewModel.onKeybuttonUp(keybutton);
    }
}

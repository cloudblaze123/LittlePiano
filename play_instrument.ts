import { MusicService } from "./src/server/MusicService.js";
import { PianoKeyboardController } from "./src/controller/PianoKeyboardController.js"
import { PianoKeyboard } from "./src/component/piano-keyboard/web_component/piano_keyboard.js";




function initControlbar(){

    const moveKeyboardButton:HTMLButtonElement=document.querySelector("button[action='move_keyboard']") as HTMLButtonElement;
    const zoomInKeyboardButton=document.querySelector("button[action='zoom_in_keyboard']") as HTMLButtonElement;
    const zoomOutKeyboardButton=document.querySelector("button[action='zoom_out_keyboard']") as HTMLButtonElement;
    
    const scrollKeyboardComponents=document.querySelectorAll(".scroll_keyboard_component") as NodeListOf<HTMLElement>;
    

    for(const scrollKeyboardComponent of scrollKeyboardComponents){

        moveKeyboardButton.addEventListener("click", function(){
            scrollKeyboardComponent.toggleAttribute("enable_scroll");
        });
        

        const scaleKeyboard=function(scale:number){
            //目前我们规定--keyboard-width的单位为vw
            //但如果查看css代码时，发现--keyboard-width的单位不再是vw，请立即检视以下代码的可用性
            const cssVarValue = getComputedStyle(scrollKeyboardComponent).getPropertyValue('--keyboard-width').trim();
            // console.log(cssVarValue);
            const old_width=parseFloat(cssVarValue);
            const new_width=old_width*scale;//缩放系数
            
            scrollKeyboardComponent.style.setProperty("--keyboard-width", new_width+"vw");
        }
        zoomInKeyboardButton.addEventListener("click", ()=>scaleKeyboard(1.1));
        zoomOutKeyboardButton.addEventListener("click", ()=>scaleKeyboard(0.9));
        
    }
}
    
    
    
    
function initPianoKeyboard(){
        
    const musicService=new MusicService();
    const piano_keyboards=document.querySelectorAll("piano-keyboard") as NodeListOf<PianoKeyboard>;

    for(const piano_keyboard of piano_keyboards){
        new PianoKeyboardController(piano_keyboard, musicService);
    }

    /*
    注意！
    脚本中设置自定义元素PianoKeyboard的类属性时需要等页面加载完毕
    直接设置并不会设置到PianoKeyboard实例上
    以下是gpt的解释
    如果你的自定义元素是在 HTML 解析时就已经存在，那么当你在外部脚本中尝试访问该自定义元素时，可能自定义元素的构造函数还未运行（因为HTML还在解析过程中），自定义元素实例还没有被正确初始化，这就导致属性为 undefined。
    解决方法是把外部脚本移到 window.onload 事件处理函数内或者将其放到 <body> 标签的结束标签后面。
    */
    // console.log(piano_keyboard);
}




function main(){

    initPianoKeyboard();

    initControlbar();
};


main();
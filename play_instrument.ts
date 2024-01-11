import { MusicService } from "./src/server/MusicService.js";
import { PianoKeyboardController } from "./src/controller/PianoKeyboardController.js"
import { PianoKeyboard } from "./src/component/piano-keyboard/web_component/piano_keyboard.js";




function initControlbar(){

    const keyboardsContainer=document.querySelector(".keyboards_container") as HTMLElement;
    const scrollKeyboardComponents=document.querySelectorAll(".scroll_keyboard_component") as NodeListOf<HTMLElement>;
    
    


    const moveKeyboardButton:HTMLButtonElement=document.querySelector("button[action='move_keyboard']") as HTMLButtonElement;
    moveKeyboardButton.addEventListener("click", function(){
        for(const scrollKeyboardComponent of scrollKeyboardComponents){
            scrollKeyboardComponent.toggleAttribute("enable_scroll");
        }

        const piano_keyboards=document.querySelectorAll(`
            .keyboards_container
            .scroll_keyboard_component
            piano-keyboard
        `) as NodeListOf<PianoKeyboard>;
        for(const piano_keyboard of piano_keyboards){
            piano_keyboard.toggleAttribute("disabled");
        }
    });
 
    
    
    
    const zoomInKeyboardButton=document.querySelector("button[action='zoom_in_keyboard']") as HTMLButtonElement;
    const zoomOutKeyboardButton=document.querySelector("button[action='zoom_out_keyboard']") as HTMLButtonElement;

    const scaleKeyboard=function(scale:number){
        for(const scrollKeyboardComponent of scrollKeyboardComponents){
            //目前我们规定--keyboard-width的单位为vw
            //但如果查看css代码时，发现--keyboard-width的单位不再是vw，请立即检视以下代码的可用性
            const cssVarValue = getComputedStyle(scrollKeyboardComponent).getPropertyValue('--keyboard-width').trim();
            // console.log(cssVarValue);
            const old_width=parseFloat(cssVarValue);
            const new_width=old_width*scale;//缩放系数
            
            scrollKeyboardComponent.style.setProperty("--keyboard-width", new_width+"vw");
        }
    }
    zoomInKeyboardButton.addEventListener("click", ()=>scaleKeyboard(1.1));
    zoomOutKeyboardButton.addEventListener("click", ()=>scaleKeyboard(0.9));

}
    
    


function initKeyboardsContainer(){
    const keyboardsContainer=document.querySelector(".keyboards_container") as HTMLElement;
    const piano_keyboards=keyboardsContainer.querySelectorAll("piano-keyboard") as NodeListOf<PianoKeyboard>;
    
    //创建PianoKeyboardController所需依赖
    const musicService=new MusicService();
    for(const piano_keyboard of piano_keyboards){
        new PianoKeyboardController(piano_keyboard, musicService);
        piano_keyboard.setInputContext(keyboardsContainer);
    }
}




function main(){

    initKeyboardsContainer();

    initControlbar();
};


main();
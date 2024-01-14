import { MusicService } from "./src/server/MusicService.js";
import { PianoKeyboardController } from "./src/controller/PianoKeyboardController.js";
function initControlbar() {
    const keyboardsContainer = document.querySelector(".keyboards_container");
    const scrollKeyboardComponents = document.querySelectorAll(".scroll_keyboard_component");
    const moveKeyboardButton = document.querySelector("button[action='move_keyboard']");
    moveKeyboardButton.addEventListener("click", function () {
        for (const scrollKeyboardComponent of scrollKeyboardComponents) {
            scrollKeyboardComponent.toggleAttribute("enable_scroll");
        }
        const piano_keyboards = document.querySelectorAll(`
            .keyboards_container
            .scroll_keyboard_component
            piano-keyboard
        `);
        for (const piano_keyboard of piano_keyboards) {
            piano_keyboard.toggleAttribute("disabled");
        }
    });
    const zoomInKeyboardButton = document.querySelector("button[action='zoom_in_keyboard']");
    const zoomOutKeyboardButton = document.querySelector("button[action='zoom_out_keyboard']");
    const scaleKeyboard = function (scale) {
        for (const scrollKeyboardComponent of scrollKeyboardComponents) {
            //目前我们规定--keyboard-width的单位为vw
            //但如果查看css代码时，发现--keyboard-width的单位不再是vw，请立即检视以下代码的可用性
            const cssVarValue = getComputedStyle(scrollKeyboardComponent).getPropertyValue('--keyboard-width').trim();
            // console.log(cssVarValue);
            const old_width = parseFloat(cssVarValue);
            const new_width = old_width * scale; //缩放系数
            scrollKeyboardComponent.style.setProperty("--keyboard-width", new_width + "vw");
        }
    };
    zoomInKeyboardButton.addEventListener("click", () => scaleKeyboard(1.1));
    zoomOutKeyboardButton.addEventListener("click", () => scaleKeyboard(0.9));
    const switchPitchTagKeyboardButton = document.querySelector("button[action='switch_pitch_tag']");
    switchPitchTagKeyboardButton.addEventListener("click", function () {
        const piano_keyboards = document.querySelectorAll("piano-keyboard");
        for (const piano_keyboard of piano_keyboards) {
            piano_keyboard.toggleAttribute("hide_pitch_tag");
        }
    });
    const switchKeyboardRowKeyboardButton = document.querySelector("button[action='switch_keyboard_row']");
    switchKeyboardRowKeyboardButton.addEventListener("click", function () {
        const piano_keyboards = document.querySelectorAll("piano-keyboard");
        for (const piano_keyboard of piano_keyboards) {
            piano_keyboard.toggleAttribute("two_row");
        }
        keyboardsContainer.toggleAttribute("two_row");
        this.toggleAttribute("two_row");
    });
}
function initKeyboardsContainer() {
    const keyboardsContainer = document.querySelector(".keyboards_container");
    const piano_keyboards = keyboardsContainer.querySelectorAll("piano-keyboard");
    //创建PianoKeyboardController所需依赖
    const musicService = new MusicService();
    for (const piano_keyboard of piano_keyboards) {
        new PianoKeyboardController(piano_keyboard, musicService);
        piano_keyboard.setInputContext(keyboardsContainer);
    }
}
function main() {
    initKeyboardsContainer();
    initControlbar();
}
;
main();

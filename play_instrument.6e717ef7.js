var e=globalThis,t={},o={},r=e.parcelRequire94c2;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){o[e]=t},e.parcelRequire94c2=r),r.register;var n=r("8wiHV"),l=r("80755");!function(){let e=document.querySelector(".keyboards_container"),t=e.querySelectorAll("piano-keyboard"),o=new n.MusicService;for(let r of t)new l.PianoKeyboardController(r,o),r.setInputContext(e)}(),function(){let e=document.querySelector(".keyboards_container"),t=document.querySelectorAll(".scroll_keyboard_component");document.querySelector("button[action='move_keyboard']").addEventListener("click",function(){for(let e of t)e.toggleAttribute("enable_scroll");for(let e of document.querySelectorAll(`
            .keyboards_container
            .scroll_keyboard_component
            piano-keyboard
        `))e.toggleAttribute("disabled")});let o=document.querySelector("button[action='zoom_in_keyboard']"),r=document.querySelector("button[action='zoom_out_keyboard']"),n=function(e){for(let o of t){let t=parseFloat(getComputedStyle(o).getPropertyValue("--keyboard-width").trim())*e;o.style.setProperty("--keyboard-width",t+"vw")}};o.addEventListener("click",()=>n(1.1)),r.addEventListener("click",()=>n(.9)),document.querySelector("button[action='switch_pitch_tag']").addEventListener("click",function(){for(let e of document.querySelectorAll("piano-keyboard"))e.toggleAttribute("hide_pitch_tag")}),document.querySelector("button[action='switch_keyboard_row']").addEventListener("click",function(){for(let e of document.querySelectorAll("piano-keyboard"))e.toggleAttribute("two_row");e.toggleAttribute("two_row"),this.toggleAttribute("two_row")})}();
//# sourceMappingURL=play_instrument.6e717ef7.js.map

import { createWhiteKeybuttonTemplate } from "./createKeybuttonTemplate.js"
import { createBlackKeybuttonTemplate } from "./createKeybuttonTemplate.js"


export function createWhiteKeybuttonsTemplate(octave:number){
    return /*html*/`
        <div class="white_keybuttons">
            ${createWhiteKeybuttonTemplate("C"+octave)}
            ${createWhiteKeybuttonTemplate("D"+octave)}
            ${createWhiteKeybuttonTemplate("E"+octave)}
            ${createWhiteKeybuttonTemplate("F"+octave)}
            ${createWhiteKeybuttonTemplate("G"+octave)}
            ${createWhiteKeybuttonTemplate("A"+octave)}
            ${createWhiteKeybuttonTemplate("B"+octave)}
        </div>
    `
}


export function createBlackKeybuttonsTemplate(octave:number){
    return /*html*/`
        <div class="black_keybuttons">
            ${createBlackKeybuttonTemplate("C#"+octave)}
            ${createBlackKeybuttonTemplate("D#"+octave)}
            ${createBlackKeybuttonTemplate("F#"+octave)}
            ${createBlackKeybuttonTemplate("G#"+octave)}
            ${createBlackKeybuttonTemplate("A#"+octave)}
        </div>
    `
}


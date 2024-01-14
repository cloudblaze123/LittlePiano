import { createWhiteKeybuttonsTemplate } from "./createKeybuttonsTemplate.js";
import { createBlackKeybuttonsTemplate } from "./createKeybuttonsTemplate.js";
export function createOctaveTemplate(pitch) {
    return /*html*/ `
    <div class="piano_keyboard-octave" octave="${pitch}">
        ${createWhiteKeybuttonsTemplate(pitch)}
        ${createBlackKeybuttonsTemplate(pitch)}
    </div>
    `;
}

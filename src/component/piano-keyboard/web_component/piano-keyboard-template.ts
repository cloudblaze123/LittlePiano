import { createOctaveTemplate } from "./createOctaveTemplate.js"



export const pianoKeyboardTemplate=/*html*/
`
<div class="piano_keyboard">
    ${createOctaveTemplate(2)}
    ${createOctaveTemplate(3)}
    ${createOctaveTemplate(4)}
    ${createOctaveTemplate(5)}
    ${createOctaveTemplate(6)}
</div>
`
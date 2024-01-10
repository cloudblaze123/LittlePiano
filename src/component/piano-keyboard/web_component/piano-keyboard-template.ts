import { createOctaveTemplate } from "./createOctaveTemplate.js"



export const pianoKeyboardTemplate=/*html*/
`


<div class="keyboards_container">
            <div class="scroll_keyboard_component" enable_scroll>
                <div class="scrollable_container">
                    <div class="keyboard_container">
                        <div class="piano_keyboard" hide_pitch_tag>
                            ${createOctaveTemplate(2)}
                            ${createOctaveTemplate(3)}
                            ${createOctaveTemplate(4)}
                            ${createOctaveTemplate(5)}
                            ${createOctaveTemplate(6)}
                        </div>
                    </div>
                </div>
            </div>
            <div class="scroll_keyboard_component" enable_scroll>
                <div class="scrollable_container">
                    <div class="keyboard_container">
                        <div class="piano_keyboard" hide_pitch_tag>
                            ${createOctaveTemplate(2)}
                            ${createOctaveTemplate(3)}
                            ${createOctaveTemplate(4)}
                            ${createOctaveTemplate(5)}
                            ${createOctaveTemplate(6)}
                        </div>
                    </div>
                </div>
            </div>
</div>

`
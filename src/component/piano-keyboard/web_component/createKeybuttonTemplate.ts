

export function createWhiteKeybuttonTemplate(pitch:string){
    return /*html*/`
        <div class="keybutton_container"><button class="keybutton white_keybutton" pitch="${pitch}"><div class="keybutton-pitch_tag">${pitch}</div></button></div>
    `
}


export function createBlackKeybuttonTemplate(pitch:string){
    return /*html*/`
        <div class="keybutton_container"><button class="keybutton black_keybutton" pitch="${pitch}"><div class="keybutton-pitch_tag">${pitch}</div></button></div>
    `
}



// import * as Tone from "../../node_modules/tone/build/Tone.js";
// import * as Tone from "tone";


export class MusicService {
    _sampler:Tone.Sampler


    constructor() {

        console.log(Tone);

        this._sampler = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();

    }


    attackTrigger(pitch:string){
        this._sampler.triggerAttack(pitch);
        console.log("attackTrigger"+pitch);
    }
    releaseTrigger(pitch:string){
        this._sampler.triggerRelease(pitch);
    }

}









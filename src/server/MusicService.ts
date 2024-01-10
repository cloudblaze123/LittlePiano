

// import * as Tone from "../../node_modules/tone/build/Tone.js";
// import * as Tone from "tone";



export class MusicService {
    _sampler:Tone.Sampler


    constructor() {

        // console.log(Tone);

        this._sampler = new Tone.Sampler({
            urls: {
                "C2": "C2v5.ogg",
                "C3": "C3v5.ogg",
                "C4": "C4v5.ogg",
                "C5": "C5v5.ogg",
                "C6": "C6v5.ogg",

                "D#2": "Ds2v5.ogg",
                "D#3": "Ds3v5.ogg",
                "D#4": "Ds4v5.ogg",
                "D#5": "Ds5v5.ogg",
                "D#6": "Ds6v5.ogg",

                "F#2": "Fs2v5.ogg",
                "F#3": "Fs3v5.ogg",
                "F#4": "Fs4v5.ogg",
                "F#5": "Fs5v5.ogg",
                "F#6": "Fs6v5.ogg",

                "A2": "A2v5.ogg",
                "A3": "A3v5.ogg",
                "A4": "A4v5.ogg",
                "A5": "A5v5.ogg",
                "A6": "A6v5.ogg",
            },
            release: 1,
            baseUrl: "../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/",
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









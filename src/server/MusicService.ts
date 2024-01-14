

// import * as Tone from "../../node_modules/tone/build/Tone.js";
// import * as Tone from "tone";




export class MusicService {
    _sampler:Tone.Sampler
    
    
    constructor() {
        const _samplerSounds={
            "C2":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/C2v5.ogg', import.meta.url)).href,
            "C3":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/C3v5.ogg', import.meta.url)).href,
            "C4":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/C4v5.ogg', import.meta.url)).href,
            "C5":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/C5v5.ogg', import.meta.url)).href,
            "C6":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/C6v5.ogg', import.meta.url)).href,
            
            "Ds2":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Ds2v5.ogg', import.meta.url)).href,
            "Ds3":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Ds3v5.ogg', import.meta.url)).href,
            "Ds4":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Ds4v5.ogg', import.meta.url)).href,
            "Ds5":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Ds5v5.ogg', import.meta.url)).href,
            "Ds6":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Ds6v5.ogg', import.meta.url)).href,
            
            "Fs2":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Fs2v5.ogg', import.meta.url)).href,
            "Fs3":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Fs3v5.ogg', import.meta.url)).href,
            "Fs4":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Fs4v5.ogg', import.meta.url)).href,
            "Fs5":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Fs5v5.ogg', import.meta.url)).href,
            "Fs6":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/Fs6v5.ogg', import.meta.url)).href,
            
            "A2":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/A2v5.ogg', import.meta.url)).href,
            "A3":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/A3v5.ogg', import.meta.url)).href,
            "A4":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/A4v5.ogg', import.meta.url)).href,
            "A5":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/A5v5.ogg', import.meta.url)).href,
            "A6":(new URL('../../assets/audio/piano_samples/SalamanderGrandPianoV3_OggVorbis/A6v5.ogg', import.meta.url)).href
        }
        
        // console.log(Tone);

        this._sampler = new Tone.Sampler({
            urls: {
                "C2": _samplerSounds["C2"],
                "C3": _samplerSounds["C3"],
                "C4": _samplerSounds["C4"],
                "C5": _samplerSounds["C5"],
                "C6": _samplerSounds["C6"],

                "D#2":_samplerSounds["Ds2"],
                "D#3":_samplerSounds["Ds3"],
                "D#4":_samplerSounds["Ds4"],
                "D#5":_samplerSounds["Ds5"],
                "D#6":_samplerSounds["Ds6"],

                "F#2":_samplerSounds["Fs2"],
                "F#3":_samplerSounds["Fs3"],
                "F#4":_samplerSounds["Fs4"],
                "F#5":_samplerSounds["Fs5"],
                "F#6":_samplerSounds["Fs6"],

                "A2": _samplerSounds["A2"],
                "A3": _samplerSounds["A3"],
                "A4": _samplerSounds["A4"],
                "A5": _samplerSounds["A5"],
                "A6": _samplerSounds["A6"],
            },
            release: 1,
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









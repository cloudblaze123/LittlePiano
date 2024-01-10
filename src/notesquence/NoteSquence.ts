import {BinaryTree} from './BinaryTree'

import {Note} from '../note/Note'


type Timestamp=number;



export class NoteSquence{
    notesAtTimestamp:BinaryTree<Timestamp, Set<Note>>;
    timestampOfNote:Map<Note, Timestamp>;

    constructor(){
        this.notesAtTimestamp=new BinaryTree();
        this.timestampOfNote=new Map();
    }

    /**
     * @description 将音符note插入时间戳timestamp所指时刻的音符集合中，
     * 如果音符不存在，则将音符添加至时间戳所指时刻的音符集合中
     * 如果音符已经存在，则将音符移至时间戳所指时刻的音符集合中
     * 
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    set(timestamp:Timestamp, note:Note):void{
        if(!this._hasNote(note)){
            this._insertNote(timestamp, note);
        }else{
            this._moveNote(timestamp, note);
        }
    }


    /**
     * @description 将音符note插入时间戳timestamp所指时刻的音符集合中，
     * 如果时间戳不存在，则新建时间戳后插入
     * 如果时间戳存在，则将音符移至时间戳所指时刻的音符集合中
     * 
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    _insertNote(timestamp:Timestamp, note:Note):void{
        if(!this._hasTimestamp(timestamp)){
            this._insertTimestamp(timestamp);
        }
        let notes=this._getNotesAtTimestamp(timestamp);
        notes.add(note);

        this._setTimestampOfNote(timestamp, note);
    }

    _moveNote(timestamp:Timestamp, note:Note):void{
        this._deleteNote(note);
        this._insertNote(timestamp, note);

        //如果不存在时间戳timestamp，则插入一个时间戳，并将音符note与该时间戳关联
        if(!this._hasTimestamp(timestamp)){
            
        
        //如果存在时间戳timestamp，且该时间戳中不存在音符note
        }else if(!this){
            this.notesAtTimestamp.put(timestamp, note);
        }else{
            let notes=this.notesAtTimestamp.get(timestamp);
            notes.add(note);
        }
    }

    _insertTimestamp(timestamp:Timestamp){
        this.notesAtTimestamp.put(timestamp, new Set());
    }

    _deleteTimestamp(timestamp:Timestamp){
        this.notesAtTimestamp.delete(timestamp);
    }

    _setTimestampOfNote(timestamp:Timestamp, note:Note){
        this.timestampOfNote.set(note, timestamp);
    }

    /**
     * @description 从音符时间轴中删去音符note，如果传入的音符note在音符时间轴中不存在，则抛出异常
     * @param {类型} 参数名 - 参数描述
     * @returns {类型} 返回值描述
     */
    deleteNote(note:Note){
        if(!this.timestampOfNote.has(note)){
            throw new ReferenceError(`${note} doesn't exit`);
        }
        this._deleteNote(note);
    }

    _deleteNote(note:Note){
        let timestamp=this.timestampOfNote.get(note) as Timestamp;
        let notes=this.notesAtTimestamp.get(timestamp);

        notes.delete(note);
        if(notes.size===0){
            this.notesAtTimestamp.delete(timestamp);
            this.timestampOfNote.delete(note);
        }
    }

    _getNotesAtTimestamp(timestamp:Timestamp){
        return this.notesAtTimestamp.get(timestamp);
    }

    _getTimestampOfNote(note:Note){
        return this.timestampOfNote.get(note);
    }

    hasTimestamp(timestamp:Timestamp){
        return this._hasTimestamp(timestamp);
    }

    _hasTimestamp(timestamp:Timestamp){
        return this.notesAtTimestamp.contain(timestamp);
    }

    hasNote(note:Note){
        return this._hasNote(note);
    }

    _hasNote(note:Note){
        return this.timestampOfNote.has(note);
    }
}





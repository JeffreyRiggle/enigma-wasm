import {rotors} from './config';

const CHAR_COUNT = 26;
const CODE_OFFSET = 65;

export class Rotor {
    constructor(settings) {
        this.position = settings.position;
        this.type = settings.type;
        this.rmap = rotors[settings.type].map;
    }

    shift(letter) {
        let poffset = this.position.charCodeAt(0) - CODE_OFFSET;
        let loffset = letter.charCodeAt(0) - CODE_OFFSET;

        let code = poffset + loffset;

        if (code >= CHAR_COUNT) {
            code = code - CHAR_COUNT;
        }

        return this.rmap[code];
    }

    unshift(letter) {
        let poffset = this.position.charCodeAt(0) - CODE_OFFSET;
        let offset = this.rmap.indexOf(letter);

        let code = offset - poffset;

        if (code < 0) {
            code = CHAR_COUNT + code;
        }

        return String.fromCharCode(code + CODE_OFFSET);
    }

    move() {
        if (this.position === 'Z') {
            this.position = 'A';
            return;
        }

        let pos = this.position.charCodeAt(0) - CODE_OFFSET;
        this.position = String.fromCharCode(CODE_OFFSET + ++pos);
    }
}
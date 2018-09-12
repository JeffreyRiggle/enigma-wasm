import {Rotor} from './rotor';
import {PlugBoard} from './plugboard';
import {rotors, reflectors} from './config';

export class Enigma {
    constructor() {
        this.rotors = [];
    }

    configure(config) {
        this.rotors = [];

        if (!config.reflector) {
            throw new Error('Invalid configuration. reflection must be choosen. Valid options are: B, C, B Dünn and C Dünn');
        }

        this.reflector = config.reflector;

        if (!config.rotors || config.rotors.length !== 3) {
            throw new Error('Invalid configuration. Enigma must have 3 rotors');
        }

        for (let rotor of config.rotors) {
            this.rotors.push(new Rotor(rotor));
        }

        let pmap = new Map();

        for (let plug of config.plugboard) {
            let first = plug.charAt(0);
            let second = plug.charAt(1);

            if (!this._validatePlug(pmap, first, second)) {
                throw new Error(`Invalid configuration ${plug} is already defined`);
            }

            pmap.set(first, second);
        }

        this.plugboard = new PlugBoard(config.plugboard);
        this.lastConfig = config;
    }

    reset() {
        if (this.lastConfig) {
            this.configure(this.lastConfig);
        }
    }

    _validatePlug(map, first, second) {
        let valid = true;

        map.forEach((value, key) => {
            if (value === first || value === second || key === first || key === second) {
                valid = false;
            }
        });

        return valid;
    }

    processMessage(message) {
        if (!this.plugboard || this.rotors.length !== 3) {
            throw new Error('Enigma must be configured.');
        }
        
        let smessage = this._sanitizeMessage(message);
        let retVal = '';

        let len = smessage.length;
        for (let i = 0; i < len; i++) {
            retVal += this._processLetter(smessage[i]);
        }

        return retVal;
    }

    _sanitizeMessage(message) {
        let retVal = message.toUpperCase();
        return retVal.replace(' ', '');
    }

    _processLetter(initialLetter) {
        let letter = initialLetter;

        letter = this.plugboard.shift(letter);

        this.rotors.forEach((rotor) => {
            letter = rotor.shift(letter);
        });

        letter = this._reflect(letter);

        this.rotors.reverse().forEach((rotor) => {
            letter = rotor.unshift(letter);
        });

        letter = this.plugboard.shift(letter);

        this._moveRotors();

        return letter;
    }

    _moveRotors() {
        let firstRotor = this.rotors[0];
        firstRotor.move();

        if (rotors[firstRotor.type].step.indexOf(firstRotor.position) <= -1) {
            return;
        }

        let secondRotor = this.rotors[1];
        secondRotor.move();

        if (rotors[secondRotor.type].step.indexOf(secondRotor.position) <= -1) {
            return;
        }

        this.rotors[2].move();
    }

    _reflect(letter) {
        let rmap = reflectors[this.reflector];
        let retVal;

        for (let i = 0; i < rmap.length; i++) {
            let val = rmap[i];
            if (val.charAt(0) == letter) {
                retVal = val.charAt(1);
                break;
            } else if (val.charAt(1) == letter) {
                retVal = val.charAt(0);
                break;
            }
        }

        return retVal;
    }
}
import { Enigma } from "./enigma";

const CODE_OFFSET = 65;

export class Bombe {
    constructor(expectation) {
        this._expectation = expectation;
    }

    set expectation(value) {
        this._expectation = value;
    }

    get expectation() {
        return _expectation;
    }

    crackCode(message) {
        let config = this._getNextConfig();
        let tasks = [];

        while (config) {
            tasks.push(this._testConfig(config, message));
            config = this._getNextConfig();
        }

        let retVal;

        //TODO fix this.
        Promise.all(tasks).then(results => {

        }).catch(err => {

        });

        return retVal;
    }

    _getNextConfig() {
        if (!this._lastAttemptedConfig) {
            this._lastAttemptedConfig = {
                reflector: 'B',
                rotors: [
                    {type: 'I', ring: 0, position: 'A'},
                    {type: 'II', ring: 1, position: 'A'},
                    {type: 'III', ring: 2, position: 'A'}
                ],
                plugboard: []
            };

            return this._lastAttemptedConfig;
        }

        let retVal = {};
        if (this._isLastRotorPosition(this._lastAttemptedConfig)) {
            if (!this._getNextPlug(retVal)) {
                return false;
            }
        }

        this._getNextRotorPosition(retVal);

        this._lastAttemptedConfig = retVal;

        return retVal;
    }

    _getNextPlug(config) {
        // TODO figure this out its a bit of a nightmare
        if (config.plugboard.length === 0) {
            config.plugboard = ['AB'];
            return;
        }
        
        if (config.plugboard.length === 13 && config.plugboard[12] === 'ZX') {
            return false;
        }

        for (let i = config.plugboard.length - 1; i > 0; i--) {
            let plug = config.plugboard[i][1];
            if (plug === 'Z') {
                continue;
            }

            let pos = plug.charCodeAt(0) - CODE_OFFSET;
            let nplug = String.fromCharCode(CODE_OFFSET + ++pos);

            if (nplug === config.plugboard[i][0]) {
                nplug = String.fromCharCode(CODE_OFFSET + ++pos);
            }


            config.plugboard[i] = config.plugboard[i][0] + nplug;
            break;
        }
    }

    _isLastRotorPosition(config) {
        return config.rotors[0].position === 'Z' && config.rotors[1].position === 'Z' && config.rotors[2].position === 'Z'
    }

    _getNextRotorPosition(config) {
        if (this._isLastRotorPosition(config)) {
            config.rotors[0].position === 'A';
            config.rotors[1].position === 'A';
            config.rotors[2].position === 'A';
            return;
        }

        if (config.rotors[0].position !== 'Z') {
            let pos = config.rotors[0].position.charCodeAt(0) - CODE_OFFSET;
            config.rotors[0].position = String.fromCharCode(CODE_OFFSET + ++pos);
            return;
        }

        config.rotors[0].position = 'A';

        if (config.rotors[1] !== 'Z') {
            let pos = config.rotors[1].position.charCodeAt(0) - CODE_OFFSET;
            config.rotors[1].position = String.fromCharCode(CODE_OFFSET + ++pos);
            return;
        }

        config.rotors[1].position = 'A';

        if (config.rotors[2] !== 'Z') {
            let pos = config.rotors[2].position.charCodeAt(0) - CODE_OFFSET;
            config.rotors[2].position = String.fromCharCode(CODE_OFFSET + ++pos);
            return;
        }
    }

    _testConfig(config, message) {
        return new Promise((resolve, reject) => {
            let machine = new Enigma();
            machine.configure(config);
    
            let result = machine.processMessage(message);
            if (this.expectation.test(result)) {
                reject('Invalid configuration');
                return;
            }

            resolve({config: config, result: result});
        });
    }
}
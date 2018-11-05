import { EventEmitter } from 'events';
import { setEnigma } from './rotormanager';
import * as _ from 'lodash';

const engimaLoader = import('../../../../enigmarust/enigmawasm/src/lib.rs');
let engine;

const CODE_OFFSET = 65;

class RustEngine extends EventEmitter {
    constructor() {
        super();
        this.config = {
            reflector: 'B',
            rotors: [
                {type: 'I', ring: 0, position: 'A'},
                {type: 'II', ring: 1, position: 'A'},
                {type: 'III', ring: 2, position: 'A'}
            ],
            plugboard: []
        };

        engimaLoader.then(m => {
            engine = m;
            setEnigma(this.config);
            this.emit(this.loadedEvent);
        });

        this.originalMessage = '';
        this.encryptedMessage = '';
    }

    get loaded() {
        return !!engine;
    }

    setRotor(ring, type, position) {
        this.config.rotors.forEach(rotor => {
            if (rotor.ring === ring) {
                rotor.type = type;
                rotor.position = position;
            }
        });

        this._configureImpl();
    }

    setReflector(type) {

    }

    setPlugboard(plugs) {
        if (!plugs) {
            return;
        }

        let transformedPlugs = [];

        plugs.forEach((value, key, map) => {
            transformedPlugs.push(value+key);
        });

        this.config.plugboard = transformedPlugs;
        this._configureImpl();
    }

    _configureImpl() {
        console.log('New config: ', this.config);

        this.originalMessage = '';
        this.encryptedMessage = '';
        this.emit(this.messageProcessedEvent, '');
    }

    sendMessage(message) {
        const config = this._transformConfig();

        return new Promise((resolve, reject) => {
            try {
                var start = performance.now()
                let retVal = engine.process_message(String(message), JSON.stringify(config));

                this.originalMessage += message;
                this.encryptedMessage += retVal;
                this._timeTaken = performance.now() - start;
                
                this._updateRotorPositions(message.length);

                this.emit(this.messageProcessedEvent, retVal);
                resolve(retVal);
            } catch(err) {
                reject(err);
            }
        });
    }

    _transformConfig() {
        let retVal = _.cloneDeep(this.config);

        for (let rotor of retVal.rotors) {
            let val = rotor.type;
            delete rotor.type;
            rotor.rtype = val;
        }

        return retVal;
    }

    _updateRotorPositions(offset) {
        for (let i = 0; i < offset; i++) {
            if (this.config.rotors[0].position !== 'Z') {
                let pos = this.config.rotors[0].position.charCodeAt(0) - CODE_OFFSET;
                this.config.rotors[0].position = String.fromCharCode(CODE_OFFSET + ++pos);
                continue;
            }

            this.config.rotors[0].position = 'A';

            if (this.config.rotors[1].position !== 'Z') {
                let pos = this.config.rotors[1].position.charCodeAt(0) - CODE_OFFSET;
                this.config.rotors[1].position = String.fromCharCode(CODE_OFFSET + ++pos);
                continue;
            }

            this.config.rotors[1].position = 'A';

            if (this.config.rotors[2].position !== 'Z') {
                let pos = this.config.rotors[2].position.charCodeAt(0) - CODE_OFFSET;
                this.config.rotors[2].position = String.fromCharCode(CODE_OFFSET + ++pos);
            }
        }
    }

    get messageProcessedEvent() {
        return 'messageProcessed';
    }

    get loadedEvent() {
        return 'loaded';
    }

    getRotor(ring) {
        return this.config.rotors[ring];
    }

    get timeTaken() {
        return this._timeTaken;
    }
}

export default new RustEngine();
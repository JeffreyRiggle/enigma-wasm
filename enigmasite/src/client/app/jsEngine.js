import { Enigma } from "../../../../enigmajs/src/enigma";
import { EventEmitter } from 'events';
import { setEnigma } from './rotormanager';

const engine = new Enigma();

class JSEngine extends EventEmitter {
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

        engine.configure(this.config);

        this.originalMessage = '';
        this.encryptedMessage = '';
        setEnigma(engine);
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
        this.config.reflector = type;

        this._configureImpl();
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
        engine.configure(this.config);
        this.originalMessage = '';
        this.encryptedMessage = '';
        this.emit(this.messageProcessedEvent, '');
    }

    sendMessage(message) {
        return new Promise((resolve, reject) => {
            try {
                var start = performance.now();
                let retVal = engine.processMessage(message);

                this.originalMessage += message;
                this.encryptedMessage += retVal;
                this._timeTaken = performance.now() - start;

                this.emit(this.messageProcessedEvent, retVal);
                resolve(retVal);
            } catch(err) {
                reject(err);
            }
        });
    }

    get messageProcessedEvent() {
        return 'messageProcessed';
    }

    get loadedEvent() {
        return 'loaded';
    }

    get loaded() {
        return true;
    }

    getRotor(ring) {
        return engine.rotors[ring];
    }

    get timeTaken() {
        return this._timeTaken;
    }
}

export default new JSEngine();
import { Enigma } from "../../../../enigmajs/src/enigma";
import { EventEmitter } from 'events';

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
        engine.configure(this.config);
        this.originalMessage = '';
        this.encryptedMessage = '';
        this.emit(this.messageProcessedEvent, '');
    }

    sendMessage(message) {
        return new Promise((resolve, reject) => {
            try {
                let retVal = engine.processMessage(message);

                this.originalMessage += message;
                this.encryptedMessage += retVal;

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

    getRotor(ring) {
        return engine.rotors[ring];
    }
}

export default new JSEngine();
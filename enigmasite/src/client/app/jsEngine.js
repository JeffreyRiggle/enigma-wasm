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

    }

    setReflector(type) {

    }

    setPlugboard(plugs) {

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
import { EventEmitter } from 'events';
const engimaLoader = import('../../../../enigmarust/enigmawasm/src/lib.rs');
let engine;

class RustEngine extends EventEmitter {
    constructor() {
        super();
        this.config = {
            reflector: 'B',
            rotors: [
                {rtype: 'I', ring: 0, position: 'A'},
                {rtype: 'II', ring: 1, position: 'A'},
                {rtype: 'III', ring: 2, position: 'A'}
            ],
            plugboard: []
        };

        engimaLoader.then(m => {
            engine = m;
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
                rotor.rtype = type;
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
        return new Promise((resolve, reject) => {
            try {
                let rmessage = this.originalMessage + message;
                let retVal = engine.process_message(String(rmessage), JSON.stringify(this.config));

                this.originalMessage += message;
                this.encryptedMessage = retVal;

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

    getRotor(ring) {
        return this.config.rotors[ring];
    }
}

export default new RustEngine();
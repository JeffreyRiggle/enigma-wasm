import { EventEmitter } from 'events';
import rustEngine from './rustEngine';
import jsEngine from './jsEngine';

class RacerEngine extends EventEmitter {
    constructor() {
        super();

        this.boundMessageProcessedJS = this._messageProcessedJS.bind(this);
        this.boundMessageProcessedRS = this._messageProcessedRS.bind(this);
        rustEngine.on(rustEngine.messageProcessedEvent, this.boundMessageProcessedRS);
        jsEngine.on(jsEngine.messageProcessedEvent, this.boundMessageProcessedJS);
    }

    _messageProcessedJS(message) {
        this.encryptedMessageJS = message;
        this.emit(this.messageProcessedEvent, this.encryptedMessageJS, this.encryptedMessageRS);
    }

    _messageProcessedRS(message) {
        this.encryptedMessageRS = message;
        this.emit(this.messageProcessedEvent, this.encryptedMessageJS, this.encryptedMessageRS);
    }

    get loaded() {
        return rustEngine.loaded && jsEngine.loaded;
    }

    setRotor(ring, type, position) {
        rustEngine.setRotor(ring, type, position);
        jsEngine.setRotor(ring, type, position);
    }

    setReflector(type) {

    }

    setPlugboard(plugs) {
        rustEngine.setPlugboard(plugs);
        jsEngine.setPlugboard(plugs);
    }

    sendMessage(message) {
        return new Promise((resolve, reject) => {
            var jsPromise = jsEngine.sendMessage(message);
            var rsPromise = rustEngine.sendMessage(message);

            Promise.all([jsPromise, rsPromise]).then(() => {
                this.emit(this.messageProcessedEvent, this.encryptedMessageJS, this.encryptedMessageRS);
                resolve(retVal);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    get messageProcessedEvent() {
        return 'messageProcessed';
    }

    get loadedEvent() {
        return 'loaded';
    }

    getRotor(ring) {
        return jsEngine.getRotor(ring);
    }

    get timeTakenJS() {
        return jsEngine.timeTaken;
    }

    get timeTakenRust() {
        return rustEngine.timeTaken;
    }
}

export default new RacerEngine();
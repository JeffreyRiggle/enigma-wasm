import { EventEmitter } from 'events';
import rustEngine from './rustEngine';
import jsEngine from './jsEngine';

class RacerEngine extends EventEmitter {
    constructor() {
        super();

        this.boundMessageProcessedJS = this._messageProcessedJS.bind(this);
        this.boundMessageProcessedRS = this._messageProcessedRS.bind(this);
        this.boundLoadedChanged = this._loadedChanged.bind(this);

        rustEngine.on(rustEngine.loadedEvent, this.boundLoadedChanged);
        rustEngine.on(rustEngine.messageProcessedEvent, this.boundMessageProcessedRS);

        jsEngine.on(jsEngine.loadedEvent, this.boundLoadedChanged);
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

    _loadedChanged(state) {
        this.emit(this.loadedEvent, this.loaded);
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
        let smessage = this._sanitizeMessage(message);

        return new Promise((resolve, reject) => {
            var jsPromise = jsEngine.sendMessage(smessage);
            var rsPromise = rustEngine.sendMessage(smessage);

            Promise.all([jsPromise, rsPromise]).then(() => {
                this.emit(this.messageProcessedEvent, this.encryptedMessageJS, this.encryptedMessageRS);
                resolve({js: this.encryptedMessageJS, rs: this.encryptedMessageRS});
            }).catch((err) => {
                this.emit(this.messageProcessedEvent, this.encryptedMessageJS, this.encryptedMessageRS);
                reject(err);
            });
        });
    }

    _sanitizeMessage(message) {
        return message.toUpperCase().replace(/ /g, '');
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
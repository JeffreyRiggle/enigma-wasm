import { EventEmitter } from 'events';
import { Bombe } from "../../../../enigmajs/src/bombe";

const bombe = new Bombe();

class BombeEngine extends EventEmitter {
    constructor() {
        super();
    }

    get loaded() {
        return true;
    }

    sendMessage(message, expectation) {
        setTimeout(() => {
            bombe.expectation = new RegExp(expectation);
            let start = performance.now();
            this._running = true;
            bombe.crackCode(message).then(result => {
                this._timeTaken = performance.now() - start;
                this._running = false;
                this.emit(this.codeFoundEvent, {
                    result: result.result,
                    config: JSON.stringify(result.config)
                });
            });
        });   
    }

    _sanitizeMessage(message) {
        return message.toUpperCase().replace(/ /g, '');
    }

    get codeFoundEvent() {
        return 'codeFound';
    }

    get loadedEvent() {
        return 'loaded';
    }

    get running() {
        return this._running;
    }

    getRotor(ring) {
        return jsEngine.getRotor(ring);
    }

    get timeTaken() {
        return this._timeTaken;
    }
}

export default new BombeEngine();
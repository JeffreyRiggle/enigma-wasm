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
        bombe.expectation = expectation;
        bombe.crackCode(message).then(result => {
            this.emit(this.codeFoundEvent, {
                result: result.result,
                config: JSON.stringify(result.config)
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

    getRotor(ring) {
        return jsEngine.getRotor(ring);
    }

    get timeTaken() {
        return 1;
    }
}

export default new BombeEngine();
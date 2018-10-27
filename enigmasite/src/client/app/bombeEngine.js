import { EventEmitter } from 'events';
import BombeWorker from 'worker-loader?name=hash.worker.js!./bombeWorker.js';
const bombeWorker = new BombeWorker;

class BombeEngine extends EventEmitter {
    constructor() {
        super();
    }

    get loaded() {
        return true;
    }

    sendMessage(message, expectation) {
        let start = performance.now();
        bombeWorker.postMessage({expectation: expectation, message: message});
        bombeWorker.onmessage = (event) => {
            if (event.data.config) {
                this._timeTaken = performance.now() - start;
                this._running = false;
                this.emit(this.codeFoundEvent, {
                    result: event.data.result,
                    config: JSON.stringify(event.data.config)
                });
            }
        } 
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
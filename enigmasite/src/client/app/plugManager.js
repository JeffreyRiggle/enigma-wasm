import { EventEmitter } from 'events';

const validInput = /[A-Z]/;

export class PlugManager extends EventEmitter {
    constructor() {
        super();
        this.plugs = new Map();
    }

    get plugsChanged() {
        return 'plugsChanged';
    }

    validatePlug(key, value) {
        if (key === value) {
            return false;
        }

        if (!value) {
            return true;
        }

        if (!validInput.test(value)) {
            return false;
        }
        
        let retVal = true;

        this.plugs.forEach((val, k, map) => {
            if (value === val || value === k) {
                retVal = false;
            }

            if (key === val || key === k) {
                retVal = false;
            }
        });

        return retVal;
    }

    setPlug(key, value) {
        if (!this.validatePlug(key, value)) {
            return;
        }

        if (value) {
            this.plugs.set(key, value);
            this.emit(this.plugsChanged, {key: key, value: value, map: this.plugs});
            return;
        }

        let foundValue = this.plugs.get(key);
        if (!foundValue) {
            return;
        }
        
        this.plugs.delete(key);
        this.emit(this.plugsChanged, {key: key, value: foundValue, map: this.plugs, removed: true});
    }
}
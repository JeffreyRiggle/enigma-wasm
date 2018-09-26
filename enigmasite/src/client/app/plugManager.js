import { EventEmitter } from 'events';

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
        if (!value) {
            this.plugs.delete(key);
            return;
        }

        if (!this.validatePlug(key, value)) {
            return;
        }

        this.plugs.set(key, value);
        this.emit(this.plugsChanged, {key: key, value: value, map: this.plugs});
    }
}
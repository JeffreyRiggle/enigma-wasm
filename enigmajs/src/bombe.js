import { Enigma } from "./enigma";

const CODE_OFFSET = 65;

export class Bombe {
    constructor(expectation) {
        this._expectation = expectation;
    }

    set expectation(value) {
        this._expectation = value;
    }

    get expectation() {
        return this._expectation;
    }

    crackCode(message) {
        return new Promise((resolve, reject) => {
            let config = this._getNextConfig();
            
            while (config) {
                try {
                    let result = this._testConfig(config, message);
                    if (result.config) {
                        resolve(result);
                        return;
                    }
                } catch (error) {

                }
                config = this._getNextConfig();
            }

            reject('No valid config found.');
        });
    }

    _getNextConfig() {
        if (!this._lastAttemptedConfig) {
            this._lastAttemptedConfig = {
                reflector: 'B',
                rotors: [
                    {type: 'I', ring: 0, position: 'A'},
                    {type: 'II', ring: 1, position: 'A'},
                    {type: 'III', ring: 2, position: 'A'}
                ],
                plugboard: []
            };

            return this._lastAttemptedConfig;
        }

        let retVal = this._lastAttemptedConfig;
        if (this._isLastRotorPosition(this._lastAttemptedConfig)) {
            if (!this._getNextPlug(retVal)) {
                return false;
            }
        }

        this._getNextRotorPosition(retVal);

        this._lastAttemptedConfig = retVal;

        return retVal;
    }

    _getNextPlug(config) {
        if (config.plugboard.length === 0) {
            config.plugboard = ['AB'];
            return;
        }
        
        if (config.plugboard.length === 13 && config.plugboard[12] === 'ZX') {
            return false;
        }

        if (config.plugboard.length === 1 && config.plugboard[0] === 'AZ') {
            config.plugboard = ['AC', 'BD'];
            return;
        }
        if (config.plugboard.length === 2 && config.plugboard[1] === 'BZ') {
            config.plugboard = ['AD', 'BE', 'CF'];
            return;
        }
        if (config.plugboard.length === 3 && config.plugboard[2] === 'CZ') {
            config.plugboard = ['AE', 'BF', 'CG', 'DH'];
            return;
        }
        if (config.plugboard.length === 4 && config.plugboard[3] === 'DZ') {
            config.plugboard = ['AF', 'BG', 'CH', 'DI', 'EJ'];
            return;
        }
        if (config.plugboard.length === 5 && config.plugboard[4] === 'EZ') {
            config.plugboard = ['AG', 'BH', 'CI', 'DJ', 'EK', 'FL'];
            return;
        }
        if (config.plugboard.length === 6 && config.plugboard[5] === 'FZ') {
            config.plugboard = ['AH', 'BI', 'CJ', 'DK', 'EL', 'FM', 'GN'];
            return;
        }
        if (config.plugboard.length === 7 && config.plugboard[6] === 'GZ') {
            config.plugboard = ['AI', 'BJ', 'CK', 'DL', 'EM', 'FN', 'GO', 'HP'];
            return;
        }
        if (config.plugboard.length === 8 && config.plugboard[7] === 'HZ') {
            config.plugboard = ['AJ', 'BK', 'CL', 'DM', 'EN', 'FO', 'GP', 'HQ', 'IR'];
            return;
        }
        if (config.plugboard.length === 9 && config.plugboard[8] === 'IZ') {
            config.plugboard = ['AK', 'BL', 'CM', 'DN', 'EO', 'FP', 'GQ', 'HR', 'IS', 'JT'];
            return;
        }
        if (config.plugboard.length === 10 && config.plugboard[9] === 'JZ') {
            config.plugboard = ['AL', 'BM', 'CN', 'DO', 'EP', 'FQ', 'GR', 'HS', 'IT', 'JU', 'KV'];
            return;
        }
        if (config.plugboard.length === 11 && config.plugboard[10] === 'KZ') {
            config.plugboard = ['AM', 'BN', 'CO', 'DP', 'EQ', 'FR', 'GS', 'HT', 'IU', 'JV', 'KW', 'LX'];
            return;
        }
        if (config.plugboard.length === 12 && config.plugboard[11] === 'LZ') {
            config.plugboard = ['AN', 'BO', 'CP', 'DQ', 'ER', 'FS', 'GT', 'HU', 'IV', 'JW', 'KX', 'LY', 'MZ'];
            return;
        }

        this._movePlugs(config); 
    }

    _movePlugs(config) {
        for (let i = config.plugboard.length - 1; i > 0; i--) {
            let plug = config.plugboard[i][1];
            if (plug === 'Z') {
                continue;
            }

            let pos = plug.charCodeAt(0) - CODE_OFFSET;
            let nplug = String.fromCharCode(CODE_OFFSET + ++pos);

            if (nplug === config.plugboard[i][0]) {
                nplug = String.fromCharCode(CODE_OFFSET + ++pos);
            }

            config.plugboard[i] = config.plugboard[i][0] + nplug;
            break;
        }
    }

    _isLastRotorPosition(config) {
        return config.rotors[0].position === 'Z' && config.rotors[1].position === 'Z' && config.rotors[2].position === 'Z';
    }

    _getNextRotorPosition(config) {
        if (this._isLastRotorPosition(config)) {
            config.rotors[0].position === 'A';
            config.rotors[1].position === 'A';
            config.rotors[2].position === 'A';
            return;
        }

        if (config.rotors[0].position !== 'Z') {
            let pos = config.rotors[0].position.charCodeAt(0) - CODE_OFFSET;
            config.rotors[0].position = String.fromCharCode(CODE_OFFSET + ++pos);
            return;
        }

        config.rotors[0].position = 'A';

        if (config.rotors[1].position !== 'Z') {
            let pos = config.rotors[1].position.charCodeAt(0) - CODE_OFFSET;
            config.rotors[1].position = String.fromCharCode(CODE_OFFSET + ++pos);
            return;
        }

        config.rotors[1].position = 'A';

        if (config.rotors[2].position !== 'Z') {
            let pos = config.rotors[2].position.charCodeAt(0) - CODE_OFFSET;
            config.rotors[2].position = String.fromCharCode(CODE_OFFSET + ++pos);
            return;
        }
    }

    _testConfig(config, message) {
        let machine = new Enigma();
        machine.configure(config);
    
        let result = machine.processMessage(message);
        if (!this.expectation.test(result)) {
            return;
        }

        return {config: config, result: result};
    }
}
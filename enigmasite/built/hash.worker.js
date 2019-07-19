/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rotors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reflectors; });
const rotors = {
    "I"     : { map: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", step: "R"},
    "II"    : { map: "AJDKSIRUXBLHWTMCQGZNPYFVOE", step: "F"},
    "III"   : { map: "BDFHJLCPRTXVZNYEIWGAKMUSQO", step: "W"},
    "IV"    : { map: "ESOVPZJAYQUIRHXLNFTGKDCMWB", step: "K"},
    "V"     : { map: "VZBRGITYUPSDNHLXAWMJQOFECK", step: "A"},
    "VI"    : { map: "JPGVOUMFYQBENHZRDKASXLICTW", step: "AN"},
    "VII"   : { map: "NZJHGRCXMYSWBOUFAIVLPEKQDT", step: "AN"},
    "VIII"  : { map: "FKQHTLXOCBJSPDZRAMEWNIUYGV", step: "AN"},
    "β"     : { map: "LEYJVCNIXWPBQMDRTAKZGFUHOS", step: ""},
    "γ"     : { map: "FSOKANUERHMBTIYCWLQPZXVGJD", step: ""}
};

const reflectors = {
    "B":	['AY', 'BR', 'CU', 'DH', 'EQ', 'FS', 'GL', 'IP', 'JX', 'KN', 'MO', 'TZ', 'VW'],
    "C":	['AF', 'BV', 'CP', 'DJ', 'EI', 'GO', 'HY', 'KR', 'LZ', 'MX', 'NW', 'TQ', 'SU'],
    "B Dünn":	['AE', 'BN', 'CK', 'DQ', 'FU', 'GY', 'HW', 'IJ', 'LO', 'MP', 'RX', 'SZ', 'TV'],
    "C Dünn":	['AR', 'BD', 'CO', 'EJ', 'FN', 'GT', 'HK', 'IV', 'LM', 'PW', 'QZ', 'SX', 'UY']
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enigmajs_src_bombe__ = __webpack_require__(2);


const bombe = new __WEBPACK_IMPORTED_MODULE_0__enigmajs_src_bombe__["a" /* Bombe */]();

onmessage = event => {
    bombe.expectation = new RegExp(event.data.expectation);
    bombe.crackCode(event.data.message).then(result => {
        postMessage(result);
    }).catch(error => {
        postMessage(error);
    });
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enigma__ = __webpack_require__(3);


const CODE_OFFSET = 65;

class Bombe {
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
            let retVal;
            
            while (config) {
                let result = this._testConfig(config, message);
                if (result && result.config) {
                    retVal = result;
                    break;
                }
                config = this._getNextConfig();
            }

            if (retVal) {
                resolve(retVal);
            }
            else {
                reject('No valid config found.');
            }
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
            return true;
        }
        
        if (config.plugboard.length === 13 && config.plugboard[12] === 'ZX') {
            return false;
        }

        if (config.plugboard.length === 1 && config.plugboard[0] === 'AZ') {
            config.plugboard = ['AC', 'BD'];
            return true;
        }
        if (config.plugboard.length === 2 && config.plugboard[1] === 'BZ') {
            config.plugboard = ['AD', 'BE', 'CF'];
            return true;
        }
        if (config.plugboard.length === 3 && config.plugboard[2] === 'CZ') {
            config.plugboard = ['AE', 'BF', 'CG', 'DH'];
            return true;
        }
        if (config.plugboard.length === 4 && config.plugboard[3] === 'DZ') {
            config.plugboard = ['AF', 'BG', 'CH', 'DI', 'EJ'];
            return true;
        }
        if (config.plugboard.length === 5 && config.plugboard[4] === 'EZ') {
            config.plugboard = ['AG', 'BH', 'CI', 'DJ', 'EK', 'FL'];
            return true;
        }
        if (config.plugboard.length === 6 && config.plugboard[5] === 'FZ') {
            config.plugboard = ['AH', 'BI', 'CJ', 'DK', 'EL', 'FM', 'GN'];
            return true;
        }
        if (config.plugboard.length === 7 && config.plugboard[6] === 'GZ') {
            config.plugboard = ['AI', 'BJ', 'CK', 'DL', 'EM', 'FN', 'GO', 'HP'];
            return true;
        }
        if (config.plugboard.length === 8 && config.plugboard[7] === 'HZ') {
            config.plugboard = ['AJ', 'BK', 'CL', 'DM', 'EN', 'FO', 'GP', 'HQ', 'IR'];
            return true;
        }
        if (config.plugboard.length === 9 && config.plugboard[8] === 'IZ') {
            config.plugboard = ['AK', 'BL', 'CM', 'DN', 'EO', 'FP', 'GQ', 'HR', 'IS', 'JT'];
            return true;
        }
        if (config.plugboard.length === 10 && config.plugboard[9] === 'JZ') {
            config.plugboard = ['AL', 'BM', 'CN', 'DO', 'EP', 'FQ', 'GR', 'HS', 'IT', 'JU', 'KV'];
            return true;
        }
        if (config.plugboard.length === 11 && config.plugboard[10] === 'KZ') {
            config.plugboard = ['AM', 'BN', 'CO', 'DP', 'EQ', 'FR', 'GS', 'HT', 'IU', 'JV', 'KW', 'LX'];
            return true;
        }
        if (config.plugboard.length === 12 && config.plugboard[11] === 'LZ') {
            config.plugboard = ['AN', 'BO', 'CP', 'DQ', 'ER', 'FS', 'GT', 'HU', 'IV', 'JW', 'KX', 'LY', 'MZ'];
            return true;
        }

        this._movePlugs(config);
        return true;
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
        let result;

        try {
            let machine = new __WEBPACK_IMPORTED_MODULE_0__enigma__["a" /* Enigma */]();
            machine.configure(config);
        
            result = machine.processMessage(message);
            if (!this.expectation.test(result)) {
                return;
            }
        } catch (error) {
            return;
        }

        return {
            config: config,
            result: result
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bombe;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rotor__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plugboard__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(0);




class Enigma {
    constructor() {
        this.rotors = [];
    }

    configure(config) {
        this.rotors = [];

        if (!config.reflector) {
            throw new Error('Invalid configuration. reflection must be choosen. Valid options are: B, C, B Dünn and C Dünn');
        }

        this.reflector = config.reflector;

        if (!config.rotors || config.rotors.length !== 3) {
            throw new Error('Invalid configuration. Enigma must have 3 rotors');
        }

        for (let rotor of config.rotors) {
            this.rotors.push(new __WEBPACK_IMPORTED_MODULE_0__rotor__["a" /* Rotor */](rotor));
        }

        let pmap = new Map();

        for (let plug of config.plugboard) {
            let first = plug.charAt(0);
            let second = plug.charAt(1);

            if (!this._validatePlug(pmap, first, second)) {
                throw new Error(`Invalid configuration ${plug} is already defined`);
            }

            pmap.set(first, second);
        }

        this.plugboard = new __WEBPACK_IMPORTED_MODULE_1__plugboard__["a" /* PlugBoard */](config.plugboard);
        this.lastConfig = config;
    }

    reset() {
        if (this.lastConfig) {
            this.configure(this.lastConfig);
        }
    }

    _validatePlug(map, first, second) {
        let valid = true;

        map.forEach((value, key) => {
            if (value === first || value === second || key === first || key === second) {
                valid = false;
            }
        });

        return valid;
    }

    processMessage(message) {
        if (!this.plugboard || this.rotors.length !== 3) {
            throw new Error('Enigma must be configured.');
        }
        
        let smessage = this._sanitizeMessage(message);
        let retVal = '';

        let len = smessage.length;
        for (let i = 0; i < len; i++) {
            retVal += this._processLetter(smessage[i]);
        }

        return retVal;
    }

    _sanitizeMessage(message) {
        let retVal = message.toUpperCase();
        return retVal.replace(' ', '');
    }

    _processLetter(initialLetter) {
        let letter = initialLetter;
        letter = this.plugboard.shift(letter);

        this.rotors.forEach((rotor) => {
            letter = rotor.shift(letter);
        });

        letter = this._reflect(letter);
        
        for (let i = this.rotors.length; i > 0; i--) {
            letter = this.rotors[i - 1].unshift(letter);
        }

        letter = this.plugboard.shift(letter);
        
        this._moveRotors();

        return letter;
    }

    _moveRotors() {
        let firstRotor = this.rotors[0];
        firstRotor.move();

        if (__WEBPACK_IMPORTED_MODULE_2__config__["b" /* rotors */][firstRotor.type].step.indexOf(firstRotor.position) <= -1) {
            return;
        }

        let secondRotor = this.rotors[1];
        secondRotor.move();

        if (__WEBPACK_IMPORTED_MODULE_2__config__["b" /* rotors */][secondRotor.type].step.indexOf(secondRotor.position) <= -1) {
            return;
        }

        this.rotors[2].move();
    }

    _reflect(letter) {
        let rmap = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* reflectors */][this.reflector];
        let retVal;

        for (let i = 0; i < rmap.length; i++) {
            let val = rmap[i];
            if (val.charAt(0) == letter) {
                retVal = val.charAt(1);
                break;
            } else if (val.charAt(1) == letter) {
                retVal = val.charAt(0);
                break;
            }
        }

        return retVal;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Enigma;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);


const CHAR_COUNT = 26;
const CODE_OFFSET = 65;

class Rotor {
    constructor(settings) {
        this.position = settings.position;
        this.type = settings.type;
        this.rmap = __WEBPACK_IMPORTED_MODULE_0__config__["b" /* rotors */][settings.type].map;
    }

    shift(letter) {
        let poffset = this.position.charCodeAt(0) - CODE_OFFSET;
        let loffset = letter.charCodeAt(0) - CODE_OFFSET;

        let code = poffset + loffset;

        if (code >= CHAR_COUNT) {
            code = code - CHAR_COUNT;
        }

        return this.rmap[code];
    }

    unshift(letter) {
        let poffset = this.position.charCodeAt(0) - CODE_OFFSET;
        let offset = this.rmap.indexOf(letter);

        let code = offset - poffset;

        if (code < 0) {
            code = CHAR_COUNT + code;
        }

        return String.fromCharCode(code + CODE_OFFSET);
    }

    move() {
        if (this.position === 'Z') {
            this.position = 'A';
            return;
        }

        let pos = this.position.charCodeAt(0) - CODE_OFFSET;
        this.position = String.fromCharCode(CODE_OFFSET + ++pos);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rotor;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PlugBoard {
    constructor(settings) {
        this.settings = settings;
    }

    shift(letter) {
        let retVal = letter;
        
        for (let setting of this.settings) {
            if (letter == setting.charAt(0)) {
                retVal = setting.charAt(1);
            } else if (letter == setting.charAt(1)) {
                retVal = setting.charAt(0);
            }
        }

        return retVal;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlugBoard;


/***/ })
/******/ ]);
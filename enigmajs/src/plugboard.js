export class PlugBoard {
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
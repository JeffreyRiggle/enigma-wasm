const alltypes = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "β", "γ"];
let enigma;

const setEnigma = (enig) => {
    enigma = enig;
}

const getNextType = (currentType) => {
    let index = alltypes.indexOf(currentType);

    if (index === -1) {
        return currentType;
    }

    let retVal;
    while (!retVal) {
        index++;
        if (index > alltypes.length) {
            index = 0;
        }

        let nextType = alltypes[index];

        for (let rotor in enigma.rotor) {
            if (rotor.type === nextType) {
                nextType = false;
                break;
            }
        }

        if (nextType) {
            retVal = nextType;
        }
    }

    return retVal;
}

const getLastLastType = (currentType) => {
    let index = alltypes.indexOf(currentType);

    if (index === -1) {
        return currentType;
    }

    let retVal;
    while (!retVal) {
        index--;
        if (index < 0) {
            index = alltypes.length;
        }

        let nextType = alltypes[index];

        for (let rotor in enigma.rotor) {
            if (rotor.type === nextType) {
                nextType = false;
                break;
            }
        }

        if (nextType) {
            retVal = nextType;
        }
    }

    return retVal;
}

export {
    setEnigma,
    getNextType,
    getLastLastType
};
import { Bombe } from "../../../../enigmajs/src/bombe";

const bombe = new Bombe();

onmessage = event => {
    bombe.expectation = new RegExp(event.data.expectation);
    bombe.crackCode(event.data.message).then(result => {
        postMessage(result);
    }).catch(error => {
        postMessage(error);
    });
}
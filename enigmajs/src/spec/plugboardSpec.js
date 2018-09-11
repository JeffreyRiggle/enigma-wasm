import {PlugBoard} from '../plugboard';

describe('Plugboard', () => {
    let plugboard;

    beforeEach(() => {
        plugboard = new PlugBoard(['AF', 'IZ']);
    });

    describe('When a letter is shifted by key', () => {
        let out;

        beforeEach(() => {
            out = plugboard.shift('A');
        });

        it('should move to its corresponding match', () => {
            expect(out).toBe('F');
        });
    });

    describe('When a letter is shifted by value', () => {
        let out;

        beforeEach(() => {
            out = plugboard.shift('Z');
        });

        it('should move to its corresponding match', () => {
            expect(out).toBe('I');
        });
    });
});
import {Rotor} from '../rotor';

describe('Rotor', () => {
    let rotor, configuration;

    beforeEach(() => {
        configuration = {
            position: 'A',
            type: 'I',
            ring: 0
        };

        rotor = new Rotor(configuration);
    });

    describe('When rotor shifts a character at the beginning of the alphabet', () => {
        let out;

        beforeEach(() => {
            out = rotor.shift('A');
        });

        it('Should update the value', () => {
            expect(out).toBe('E');
        });

        describe('When rotor unshifts a character', () => {
            let sout;

            beforeEach(() => {
                sout = rotor.unshift(out);
            });

            it('Should restore the letter to its original value', () => {
                expect(sout).toBe('A');
            });
        });
    });

    describe('When rotor shifts a character at the end of the alphabet', () => {
        let out;

        beforeEach(() => {
            out = rotor.shift('Z');
        });

        it('Should update the value', () => {
            expect(out).toBe('J');
        });

        describe('When rotor unshifts a character', () => {
            let sout;

            beforeEach(() => {
                sout = rotor.unshift(out);
            });

            it('Should restore the letter to its original value', () => {
                expect(sout).toBe('Z');
            });
        });
    });

    describe('When rotor is moved', () => {
        beforeEach(() => {
            rotor.move();
        });

        it('Should move the rotor position', () => {
            expect(rotor.position).toBe('B');
        });

        describe('When rotor shifts a character', () => {
            let out;
    
            beforeEach(() => {
                out = rotor.shift('Z');
            });
    
            it('Should update the value', () => {
                expect(out).toBe('E');
            });

            describe('When rotor unshifts a character', () => {
                let sout;
    
                beforeEach(() => {
                    sout = rotor.unshift(out);
                });
    
                it('Should restore the letter to its original value', () => {
                    expect(sout).toBe('Z');
                });
            });
        });
    });
});
import {Enigma} from '../enigma';

describe('Enigma', () => {
    let enigma;

    beforeEach(() => {
        enigma = new Enigma();
    });

    describe('When enigma is configured', () => {
        describe('When enigma configuration is invalid', () => {

            describe('When configuration does not have a reflector', () => {
                let failed;

                beforeEach(() => {
                    try {
                        enigma.configure({});
                    } catch(err) {
                        failed = true;
                    }
                });

                it('Should throw and error', () => {
                    expect(failed).toBe(true);
                });
            });

            describe('When configuration does not have enough rotors', () => {
                let failed;

                beforeEach(() => {
                    try {
                        enigma.configure({
                            reflector: 'B'
                        });
                    } catch(err) {
                        failed = true;
                    }
                });

                it('Should throw and error', () => {
                    expect(failed).toBe(true);
                });
            });

            describe('When configuration has duplicate plug mappings', () => {
                let failed, config;

                beforeEach(() => {
                    config = {
                        reflector: 'B',
                        rotors: [
                            {type: 'I', ring: 0, postion: 'A'},
                            {type: 'II', ring: 1, postion: 'F'},
                            {type: 'III', ring: 2, postion: 'Z'}
                        ],
                        plugboard: [
                            'AF',
                            'BE',
                            'EO',
                            'DP'
                        ]
                    };

                    try {
                        enigma.configure(config);
                    } catch(err) {
                        failed = true;
                    }
                });

                it('Should throw and error', () => {
                    expect(failed).toBe(true);
                });
            });

            describe('When message is sent', () => {
                let failed;

                beforeEach(() => {
                    try {
                        enigma.processMessage('This is a test');
                    } catch(err) {
                        failed = true;
                    }
                });

                it('Should throw an exception', () => {
                    expect(failed).toBe(true);
                });
            });
        });

        describe('When enigma is configured correctly', () => {
            let config;

            beforeEach(() => {
                config = {
                    reflector: 'B',
                    rotors: [
                        {type: 'I', ring: 0, position: 'A'},
                        {type: 'II', ring: 1, position: 'A'},
                        {type: 'III', ring: 2, position: 'A'}
                    ],
                    plugboard: [
                        'AF',
                        'BE',
                        'CO',
                        'DP',
                        'GX',
                        'HY',
                        'IZ',
                        'JW',
                        'KT',
                        'LN',
                        'MR',
                        'QS',
                        'UV'
                    ]
                };

                enigma.configure(config);
            });

            it('Should have 3 rotors', () => {
                expect(enigma.rotors.length).toBe(3);
            });

            it('Should have a plugboard', () => {
                expect(enigma.plugboard).toBeDefined();
            });

            describe('When message is sent', () => {
                let out;

                beforeEach(() => {
                    out = enigma.processMessage('HELLOWORLD');
                });

                it('Should encrypt the message', () => {
                    expect(out).toBe('IZVEBXPZOO');
                });

                describe('When attempting to decypt the message', () => {
                    let decrypt;

                    beforeEach(() => {
                        enigma.reset();
                        decrypt = enigma.processMessage(out);
                    });

                    it('Should get the right message', () => {
                        expect(decrypt).toBe('HELLOWORLD');
                    });
                });
            });
        });
    });
});
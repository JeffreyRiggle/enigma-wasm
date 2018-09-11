const rust = import('./engima_wasm');
const config = {
    reflector: 'B',
    rotors: [
        {rtype: 'I', ring: 0, position: 'A'},
        {rtype: 'II', ring: 1, position: 'A'},
        {rtype: 'III', ring: 2, position: 'A'}
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

rust.then(m => {
    console.log(m.process_message('HELLOWORLD', JSON.stringify(config)));
});
import numeral from 'numeral';

numeral.register('locale', 'us', {
    delimiters: {
        thousands: ',',
        decimal: '.',
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't',
    },
    ordinal(number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '€',
    },
});

numeral.defaultFormat('€0,0.00');

export default numeral;

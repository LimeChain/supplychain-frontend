import numeral from 'numeral';

numeral.register('locale', 'en-us', {
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
        const b = number % 10;
        return (~~(number % 100 / 10) === 1) ? 'th'
            : (b === 1) ? 'st'
                : (b === 2) ? 'nd'
                    : (b === 3) ? 'rd' : 'th';
    },
    currency: {
        symbol: '€',
    },
});

numeral.locale('en-us');
// numeral.defaultFormat('$0,0');

export default numeral;

export const formatNumber = (value): string => {
    return numeral(value).format('0,0');
}

export const formatPrice = (value): string => {
    return numeral(value).format('$ 0,0');
}

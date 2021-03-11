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

export const formatDashboardBigPrice = (value: number): string => {
    const thousand = 1000;
    const mil = thousand * thousand;
    const bil = thousand * mil;

    if (value < 10 * thousand) {
        return numeral(value).format('$ 0.00');
    }

    if (value < mil) {
        return numeral(value).format('$ 0,0');
    }

    if (value < bil) {
        return `${numeral(value / mil).format('$ 0.0')}M`;
    }

    return `${numeral(value / bil).format('$ 0.0')}B`;
}

export const formatPrice = (value): string => {
    return numeral(value).format('$ 0,0');
}

export const formatBytes = (value): string => {
    return numeral(value).format('0b');
}

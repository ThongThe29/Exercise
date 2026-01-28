export interface IBitcoinPrice {
    time: {
        updated: string;
        updatedISO: string;
        updateduk: string;
    };
    disclaimer: string;
    chartName: string;
    bpi: {
        USD: Currency;
        GBP: Currency;
        EUR: Currency;
    };
}

export interface Currency {
    code: string;
    symbol: string;
    rate: string;
    description: string;
    rate_float: number;
}

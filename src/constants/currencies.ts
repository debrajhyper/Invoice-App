export const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', mainUnit: 'Dollar', subUnit: 'Cent' },
    { code: 'EUR', symbol: '€', name: 'Euro', mainUnit: 'Euro', subUnit: 'Cent' },
    { code: 'GBP', symbol: '£', name: 'British Pound', mainUnit: 'Pound', subUnit: 'Pence' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', mainUnit: 'Yen', subUnit: '' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', mainUnit: 'Yuan', subUnit: 'Fen' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', mainUnit: 'Rupee', subUnit: 'Paise' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', mainUnit: 'Dollar', subUnit: 'Cent' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', mainUnit: 'Dollar', subUnit: 'Cent' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', mainUnit: 'Franc', subUnit: 'Rappen' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', mainUnit: 'Dollar', subUnit: 'Cent' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', mainUnit: 'Dollar', subUnit: 'Cent' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', mainUnit: 'Krona', subUnit: 'Öre' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won', mainUnit: 'Won', subUnit: '' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', mainUnit: 'Krone', subUnit: 'Øre' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', mainUnit: 'Dollar', subUnit: 'Cent' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso', mainUnit: 'Peso', subUnit: 'Centavo' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', mainUnit: 'Real', subUnit: 'Centavo' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble', mainUnit: 'Ruble', subUnit: 'Kopek' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', mainUnit: 'Rand', subUnit: 'Cent' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira', mainUnit: 'Lira', subUnit: 'Kuruş' },
    { code: 'AED', symbol: 'د.إ', name: 'United Arab Emirates Dirham', mainUnit: 'Dirham', subUnit: 'Fils' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', mainUnit: 'Riyal', subUnit: 'Halala' },
    { code: 'PLN', symbol: 'zł', name: 'Polish Złoty', mainUnit: 'Złoty', subUnit: 'Grosz' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht', mainUnit: 'Baht', subUnit: 'Satang' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', mainUnit: 'Rupiah', subUnit: 'Sen' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', mainUnit: 'Ringgit', subUnit: 'Sen' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso', mainUnit: 'Peso', subUnit: 'Centavo' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone', mainUnit: 'Krone', subUnit: 'Øre' },
    { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', mainUnit: 'Koruna', subUnit: 'Haléř' },
    { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', mainUnit: 'Forint', subUnit: 'Fillér' },
    { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel', mainUnit: 'Shekel', subUnit: 'Agora' },
    { code: 'CLP', symbol: '$', name: 'Chilean Peso', mainUnit: 'Peso', subUnit: 'Centavo' },
    { code: 'ARS', symbol: '$', name: 'Argentine Peso', mainUnit: 'Peso', subUnit: 'Centavo' },
    { code: 'COP', symbol: '$', name: 'Colombian Peso', mainUnit: 'Peso', subUnit: 'Centavo' },
    { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', mainUnit: 'Pound', subUnit: 'Piastre' },
    { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', mainUnit: 'Dong', subUnit: '' },
] as const;

export type Currency = typeof currencies[number];
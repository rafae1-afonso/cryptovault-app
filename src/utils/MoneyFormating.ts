interface IMoneyFormatingMethod {
    value: number | undefined,
    location?: string
    currency?: string,
}

const MoneyFormatingMethod = ({ value, location = 'en-US', currency = 'USD' }: IMoneyFormatingMethod) => {
    return new Intl.NumberFormat(location, {
        currency: currency,
        style: 'currency',
        maximumFractionDigits: value! > 1 ? 2 : 7
    }).format(value!);
}
export default MoneyFormatingMethod;
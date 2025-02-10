import ICurrency from "./ICurrency";

export default interface ICurrencyContext {
    currency: ICurrency;
    setCurrency: (currency: ICurrency) => void
}
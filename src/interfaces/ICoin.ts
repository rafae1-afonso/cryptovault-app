export default interface ICoin {
    id: string,
    name: string,
    symbol: string
    icon: string
    rank: number
    price: number
    marketCap: number
    volume: number
    priceChange1h: number
    priceChange1d: number
    priceChange1w: number
    fullyDilutedValuation: number
    totalSupply: number
    availableSupply: number
    websiteUrl: string
    twitterUrl: string
    redditUrl: string
}
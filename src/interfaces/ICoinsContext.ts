
export default interface ICoinsContext {
    coinsList: any[],
    setCoinsList: (coinsList: any[]) => void,
    selectedCoin: any,
    setSelectedCoin: (selectedCoin: any) => void,
    vaultedCoins: string[],
    setVaultedCoins: (vaultedCoins: string[]) => void
}
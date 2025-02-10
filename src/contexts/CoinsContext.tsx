import React, { useState } from 'react';
import ICoinsContext from '../interfaces/ICoinsContext';

export const CoinsContext = React.createContext({} as ICoinsContext);
CoinsContext.displayName = 'CoinsContext';

export const CoinsProvider = ({ children }: { children: React.ReactNode }) => {
    const [coinsList, setCoinsList] = useState<object[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<object>({});
    const [vaultedCoins, setVaultedCoins] = useState<string[]>(
        localStorage.getItem('vaultedCoins') 
            ? JSON.parse(localStorage.getItem('vaultedCoins') as string)
            : []
        )

    console.log(localStorage.getItem('vaultedCoins'))
    console.log(JSON.parse(localStorage.getItem('vaultedCoins') as string))

    // localStorage.getItem('vaultedCoins') && setVaultedCoins(JSON.parse(localStorage.getItem('vaultedCoins') as string));

    return (
        <CoinsContext.Provider value={
            {
                coinsList,
                setCoinsList,
                selectedCoin,
                setSelectedCoin,
                vaultedCoins,
                setVaultedCoins
            }
        }>
            {children}
        </CoinsContext.Provider>
    )
}
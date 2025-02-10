import React, { useState } from 'react';
import ICurrencyContext from '../interfaces/ICurrencyContext';
import ICurrency from '../interfaces/ICurrency';

export const CurrencyContext = React.createContext({} as ICurrencyContext);
CurrencyContext.displayName = 'CurrencyContext';

export const CurrencyProvider = ({children}: {children: React.ReactNode}) => {
    const [currency, setCurrency] = useState<ICurrency>({ location: 'en-US', currency: 'USD' });

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}
import styled from 'styled-components'
import getAPIMethod from '../../utils/GetAPI';
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import ICoin from '../../interfaces/ICoin';
import MoneyFormatingMethod from '../../utils/MoneyFormating';
import PriceChange from '../PriceChange';
import PriceChangeIntervals from '../../enums/PriceChangeIntervals';
import { useNavigate } from 'react-router';
import { CoinsContext } from '../../contexts/CoinsContext';

const VaultCardContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid var(--crypto-yellow);
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 2rem;
        font-weight: bold;
        border-bottom: 2px solid var(--crypto-yellow);
        padding-bottom: 20px;

        & > img {
            width: 45px
        }

        & > span {
            font-size: 1.5rem;
            color: var(--default-gray);
        }
    }

    .body {
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        font-weight: bold;

        & > h1 {
            font-size: 2.2rem;
            font-weight: bold;
        }

        & > p {
            font-size: 1.5rem;
            margin: 0;
        }
    }

    .ButtonsContainer {
        display: flex;
        align-items: center;
        margin-top: 20px;
        gap: 30px;

        & > button {
            padding: 5px 20px;
            border-radius: 5px;
            border: var(--default-gray) 2px solid;
            font-weight: bold;
            cursor: pointer;
        }

        .RemoveButton {
                border: var(--vault-blue) 2px solid;
                color: var(--vault-dark-blue)
        }
    }
`

const VaultCard = ({ coinId }: { coinId: string }) => {
    const { currency } = useContext(CurrencyContext);
    const [loading, setLoading] = useState(true)
    const [coin, setCoin] = useState<ICoin | undefined>(undefined)
    const { vaultedCoins, setVaultedCoins } = useContext(CoinsContext);
    const navigate = useNavigate();

    const fetchCoins = async (apiUrl: string) => {
        setLoading(true);
        const response = await getAPIMethod(apiUrl);
        setCoin(response?.data);
        setLoading(false);
    }


    useEffect(() => {
        fetchCoins(`https://openapiv1.coinstats.app/coins/${coinId}?currency=${currency.currency}`);
    }, [currency])

    return (
        <VaultCardContainer>
            {
                loading
                    ? <h1>Loading...</h1>
                    : <>
                        <h1 className='title'><img src={coin?.icon} alt={coin?.name} />{coin?.name} <span>{coin?.symbol}</span> </h1>
                        <div className='body'>
                            <h1>{MoneyFormatingMethod({ value: coin?.price, location: currency.location, currency: currency.currency })}</h1>
                            <p><PriceChange coin={coin} interval={PriceChangeIntervals.HOUR} showInterval={true} /></p>
                            <p><PriceChange coin={coin} interval={PriceChangeIntervals.DAY} showInterval={true} /></p>
                            <p><PriceChange coin={coin} interval={PriceChangeIntervals.WEEK} showInterval={true} /></p>
                        </div>
                        <div className='ButtonsContainer'>
                            <button onClick={() => {
                                navigate(`/info/${coin?.id}`);
                            }}>Details</button>
                            <button className='RemoveButton' onClick={() => {
                                const newVaultedCoins = vaultedCoins.filter((vaultedCoin: string) => vaultedCoin !== coin?.id)
                                setVaultedCoins(newVaultedCoins);
                                localStorage.setItem('vaultedCoins', JSON.stringify(newVaultedCoins));
                            }}>Remove</button>
                        </div>
                    </>
            }
        </VaultCardContainer>
    )
}

export default VaultCard
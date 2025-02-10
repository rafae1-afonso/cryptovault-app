import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaRedditSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import MoneyFormatingMethod from '../utils/MoneyFormating';
import PriceChange from '../components/PriceChange';
import PriceChangeIntervals from '../enums/PriceChangeIntervals';
import InfoCard from '../components/InfoCard';
import { CurrencyContext } from '../contexts/CurrencyContext';
import { useParams } from 'react-router';
import getAPIMethod from '../utils/GetAPI';
import ICoin from '../interfaces/ICoin';
import { CoinsContext } from '../contexts/CoinsContext';
import VaultButton from '../components/VaultButton';

const InfoContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    border: 2px solid var(--crypto-yellow);
`;

const StyledH1 = styled.h1`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 20px;
    
    .rank {
        margin-right: 20px;
        padding: 5px 20px;
        background-color: var(--rank-ultralight-blue);
        color: var(--vault-blue);
        border-radius: 20px;
        font-size: 1.5rem;
    }

    & > img {
        width: 50px;
        margin-right: 20px;
        border-radius: 100%;
    }

    .symbol {
        color: var(--default-gray);
        font-size: 1.25rem;
        margin-left: 10px;
    }

    .vaultButton {
        margin-left: 30px;
        cursor: pointer;
    }

    .socials {
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-self: flex-end;
        gap: 10px;

        & > a {
            display: flex;
        }
    }
`

const BodyContainer = styled.div`
    padding: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 50px;
`

const StyledH2 = styled.h2`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 2.5rem;

    padding: 30px;
    border-top: 2px solid var(--crypto-yellow);

    & > span {
        font-size: 1.5rem;
    }
`

const Info = () => {
    const { currency } = useContext(CurrencyContext);
    const [loading, setLoading] = useState(true)
    const [selectedCoin, setSelectedCoin] = useState<ICoin | undefined>(undefined)
    const [coinIncluded, setCoinIncluded] = useState(false);
    const { vaultedCoins } = useContext(CoinsContext);
    const id = useParams().id ?? '';

    document.title = `${selectedCoin?.name} (${selectedCoin?.symbol}) in ${currency.currency} | CryptoVault`;

    const fetchCoins = async (apiUrl: string) => {
        setLoading(true);
        const response = await getAPIMethod(apiUrl);
        setLoading(false);
        response && setSelectedCoin(response.data);
    }

    useEffect(() => {
        fetchCoins(`/api/coins/${id}?currency=${currency.currency}`);
    }, [currency])

    useEffect(() => {
        setCoinIncluded(vaultedCoins.includes(id));
        return
    }, [vaultedCoins])

    return (
        <InfoContainer>
            {
                loading
                    ? <h1>Loading...</h1>
                    : <>
                        <StyledH1>
                            <span className='rank'>#{selectedCoin?.rank}</span>
                            <img src={selectedCoin?.icon} alt={selectedCoin?.name} />
                            {selectedCoin?.name}
                            <span className='symbol'>{selectedCoin?.symbol}</span>
                            <span
                                className='vaultButton'
                            >
                                <VaultButton
                                    coinIncluded={coinIncluded}
                                    coin={selectedCoin!}
                                    size={40}
                                />
                            </span>
                        <div className='socials'>
                            {selectedCoin?.websiteUrl &&
                                <a href={selectedCoin?.websiteUrl} target='_blank'><TbWorld color='black' size={40} /></a>
                            }
                            {selectedCoin?.redditUrl !== 'https://www.reddit.com' &&
                                <a href={selectedCoin?.redditUrl} target='_blank'><FaRedditSquare fill='black' size={40} /></a>
                            }
                            {selectedCoin?.redditUrl !== 'https://twitter.com' &&
                                <a href={selectedCoin?.twitterUrl} target='_blank'><FaSquareXTwitter fill='black' size={40} /></a>
                            }
                        </div>
                    </StyledH1>
            <StyledH2>
                {MoneyFormatingMethod({ value: selectedCoin?.price, location: currency.location, currency: currency.currency })}
                <span><PriceChange coin={selectedCoin} interval={PriceChangeIntervals.HOUR} showInterval={true} /></span>
            </StyledH2>
            <BodyContainer>
                <InfoCard title="Change 24h"><PriceChange coin={selectedCoin} interval={PriceChangeIntervals.DAY} /></InfoCard>
                <InfoCard title="Change 7 days"><PriceChange coin={selectedCoin} interval={PriceChangeIntervals.WEEK} /></InfoCard>
                <InfoCard title="Market Capitalization">{MoneyFormatingMethod({ value: selectedCoin?.marketCap, location: currency.location, currency: currency.currency })}</InfoCard>
                <InfoCard title="Volume">{MoneyFormatingMethod({ value: selectedCoin?.volume, location: currency.location, currency: currency.currency })}</InfoCard>
                <InfoCard title="FDV">{MoneyFormatingMethod({ value: selectedCoin?.fullyDilutedValuation, location: currency.location, currency: currency.currency })}</InfoCard>
                <InfoCard title="Available Supply">{(selectedCoin?.availableSupply)} {selectedCoin?.symbol}</InfoCard>
                <InfoCard title="Total Supply">{(selectedCoin?.totalSupply)} {selectedCoin?.symbol}</InfoCard>
            </BodyContainer>
        </>

            }
        </InfoContainer >
    )
}

export default Info